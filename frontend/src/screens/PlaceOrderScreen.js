import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import './PlaceOrderScreenCss.css'



const PlaceOrderScreen = ({ history }) => {
  
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const orderCreate = useSelector((state) => state.orderCreate) 
  const { order, success, error } = orderCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let cartItem
  if (userInfo) {
    cartItem = cart.cartItems.filter(cart => cart.user == userInfo._id);
  } else {
    cartItem = cart.cartItems.filter(cart => cart.user == "");
  }

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  
  //   Calculate prices 
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cartItem.reduce((acc, item) => acc + (item.remise ? item.remise * item.qty : item.price * item.qty  ), 0)
  )
  cart.shippingPrice = addDecimals( 7)
  
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) 
    
  ).toFixed(2)

  

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`) 
     
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => { 
    dispatch(
      createOrder({
        orderItems: cartItem,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice, 
      })
    )

  } 
  
 
              
  
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='placeOrder-coord'>
              <h2>Livraison</h2>

              <p >
                <strong >Nom Et Prénom : </strong>
                  {cart.shippingAddress.address}
              </p>
              <p>
                <strong>Adresse : </strong>
                {cart.shippingAddress.city}{' '}
              </p>
              <p>
                <strong>Ville : </strong>
                {cart.shippingAddress.country}{' '}
              </p>
              <p>
                <strong>Numéro de Téléphone : </strong>
                {cart.shippingAddress.postalCode}{' '}
              </p>

             <p>
                <strong>Payment Method : </strong>
                 {cart.paymentMethod}{' '}
              </p>


              
              
              
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className='orderScreen_product_h2'>Mes Produits</h2>
              {cartItem.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                    {cartItem.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                          <Col xs={4} md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            className="placeOrderImageProducts"
                          />
                        </Col>
                          <Col xs={8} md={6}>
                          <Link to={`/product/${item.product}`}> 
                            {item.name}
                          </Link>
                        </Col>
                          <Col md={4} className='orderScreen_product_price'>
                            {item.qty} x {item.remise ? item.remise.toFixed(2) : item.price.toFixed(2)} € = {item.qty * (item.remise ? item.remise.toFixed(2) : item.price.toFixed(2) )} €
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4 className='orderScreen_product_h4'>Récapitulatif De La Commande</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Produits:</Col>
                  <Col>{cart.itemsPrice} €</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Livraison:</Col>
                  <Col>{cart.shippingPrice} €</Col>
                </Row>
              </ListGroup.Item>
            
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{cart.totalPrice} €</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="paiement-notice">

                <h5 >Paiement à la réception</h5>

              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItem.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Passer La Commande
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen