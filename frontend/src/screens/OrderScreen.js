import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card,Button  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails,payOrder,deliverOrder} from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET, ORDER_CREATE_RESET} from '../constants/orderConstants'
import { CART_RESET_ITEM } from '../constants/cartConstants'
import './OrderScreenCss.css'
import {PDFExport} from '@progress/kendo-react-pdf'


const OrderScreen = ({ match , history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

 const userLogin = useSelector((state) => state.userLogin)
 const { userInfo } = userLogin


useEffect(() => {
   
  console.log(order)
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}` 
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {

      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
      dispatch({ type: CART_RESET_ITEM })
      dispatch(getOrderDetails(orderId))

    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver ,order, history, userInfo])

    const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }
  
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event ) =>{
    pdfExportComponent.current.save()
  }

  
  
  
  
  
  

 

 return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
    <PDFExport ref={pdfExportComponent} pageSize="A4" >
           <h2 className='orderScreen_h2'>Commande N°: {order._id}</h2>
           <Row>
             <Col md={8}>
               <ListGroup variant='flush' className>
                 <ListGroup.Item className='placeOrder-coord'>
                   <h2>Livraison</h2>
                   <p>
                     <strong>Nom et Prénom : </strong> {order.shippingAddress.address}
                   </p>

                   <p>
                     <strong>Adresse : </strong> {order.shippingAddress.country}
                   </p>

                   <p>
                     <strong>Ville : </strong> {order.shippingAddress.city}{' '}
                   </p>

                   <p>
                     <strong>Numéro de Téléphone : </strong>   {order.shippingAddress.postalCode},{' '}
                   </p>


                   {order.isDelivered ? (
                     <Message variant='success'>
                       Livré le {order.deliveredAt}
                     </Message>
                   ) : (
                     <Message variant='danger'>La Commande n'est pas encore livré </Message>
                   )}
                 </ListGroup.Item>

                 <ListGroup.Item>
                   <h2 className='orderScreen_product_h2'>Mes Produits</h2>
                   {console.log(order.orderItems)}
                   {order.orderItems.length === 0 ? (
                     <Message>Il n'ya pas de commande</Message>
                   ) : (
                     <ListGroup variant='flush'>
                       {order.orderItems.map((item, index) => (
                         <ListGroup.Item key={index}>
                           <Row>
                             <Col xs={4} md={2} className='orderScreen_product_img'>
                               <Image
                                 src={item.image}
                                 alt={item.name}
                                 fluid
                                 rounded
                               />
                             </Col>
                             <Col xs={8} md={6}>
                               <Link to={`/product/${item.product}`}>
                                 {item.name}
                               </Link>
                             </Col>

                             <Col md={4} className='orderScreen_product_price'>
                               {item.qty} x {item.remise ? item.remise.toFixed(2) : item.price.toFixed(2)} € = {item.remise ? item.qty * item.remise.toFixed(2) : item.qty * item.price.toFixed(2) } €
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
                       <Col>{order.itemsPrice.toFixed(2) } €</Col>
                     </Row>
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <Row>
                       <Col>Livraison:</Col>
                       <Col>7,00 €</Col>
                     </Row>
                   </ListGroup.Item>

                   <ListGroup.Item>
                     <Row>
                       <Col>Total:</Col>
                       <Col>{order.totalPrice.toFixed(2) } €</Col>
                     </Row>
                   </ListGroup.Item>
                   {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                      disabled
                    />
                  )}
                </ListGroup.Item>
              )}
                   <ListGroup.Item className="paiement-notice"> 

                     <h5 >Paiement à la réception</h5>

                   </ListGroup.Item>

                   {loadingDeliver && <Loader />}
                   {userInfo &&
                     userInfo.isAdmin &&
                     order.isPaid &&
                     !order.isDelivered && (
                       <ListGroup.Item>
                         <Button
                           type='button'
                           className='btn btn-block'
                           onClick={deliverHandler}
                         >
                           Mark As Delivered
                         </Button>
                       </ListGroup.Item>
                     )}
                 </ListGroup>
               </Card>
             </Col>
           </Row> 

    </PDFExport>
      
         {userInfo &&
           userInfo.isAdmin &&
           order.isPaid &&
           !order.isDelivered && (
             <ListGroup.Item>
              
               <Button onClick={handleExportWithComponent}>pdf </Button>
             </ListGroup.Item>
           )}
    </>
  )
}

export default OrderScreen