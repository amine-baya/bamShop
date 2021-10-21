import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message.js";
import { addToCart, removeFromCart } from "../actions/cartAction";
import './CartScreenCss.css'

const CartScreen = ({match, location, history}) => { 
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1 

    
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)  
    const {cartItems} = cart

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (productId) {
            
            dispatch(addToCart(productId, qty)) 
        }

        
    }, [dispatch, productId, qty])
        let cartItem
    if (userInfo) {
        cartItem = cartItems.filter(cart => cart.user == userInfo._id);
    } else {
        cartItem = cartItems.filter(cart => cart.user == "");
    }

    const removeFromCartHandler = (id) => { 
        dispatch(removeFromCart(id))
        history.replace('/cart') 
    }
    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    
    return (
        <Row>
            <Col lg={8}>
                <h1 className='cartScreen_title'>Mon Panier</h1> 
                {cartItem.length === 0 ? <Message> Votre Panier est vide <Link to='/'>Retour</Link></Message> :

                
                <ListGroup variant='flush' className='cartScreen_body'>
                        
                        {cartItem.map(item =>
                        <ListGroup.Item key={item.product} >
                                <Row className='cartScreen_body_content'>
                                    
                                <Col xs={2} lg={2}>
                                    <Link to={`/product/${item.product}`}>
                                    <Image className="monPanierImage" src={item.image[0]} alt={item.name} fluid rounded></Image>
                                        </Link>
                                </Col>
                                <Col xs={8} lg={8} className='cartScreen_body_text'>
                                        <Row>
                                            <Col lg={6} >
                                                <Link to={`/product/${item.product}`} className='cart_product_name'>{item.name}</Link>
                                            </Col>
                                            <Col lg={3} className='cartScreen_body_price'>{item.remise ? (item.remise.toFixed(2)) : (item.price.toFixed(2))} €</Col>
                                            <Col lg={3}>
                                                <Form.Control className='cartScreen_select' as='select' value={item.qty}
                                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                        </Col>
                                <Col xs={1} lg={2}>
                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                </ListGroup>
                } 
            </Col>
            <Col lg={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item> 
                            <h5>
                                nombre de produits ({cartItem.reduce((acc, item) => acc + item.qty, 0)}) 
                            </h5> 
                            <span className="cart-price-total" > prix total : {cartItem.reduce((acc, item) => acc + (item.remise ? item.qty * item.remise : item.price * item.qty), 0).toFixed(2)} €</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block cart-button' disabled={cartItem.length === 0} 
                            onClick={checkOutHandler}>commander</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
