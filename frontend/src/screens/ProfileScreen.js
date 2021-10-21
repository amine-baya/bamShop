import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import {getUserDetails, UpdateUserProfile} from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions' 

const RegisterScreen = ({location, history}) => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setmessage] = useState(null)

    const dispatch = useDispatch()

    
    const userLogin = useSelector(state => state.userLogin) 
    const {userInfo} = userLogin 


    const userDetail = useSelector(state => state.userDetail)
    const {loading, user, error} = userDetail

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (!user.name) {
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        } else {
            setname(user.name)
            setemail(user.email)
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setmessage('soory the password don\'t match')
        } else {
           dispatch(UpdateUserProfile({id: user._id, name, email, password}))
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>MON Profile</h2>
            {message && <Message variant='danger'>{message}</Message> }
            {error && <Message variant='danger'>{error}</Message> }
            {success && <Message variant='success'>BIEN</Message> }
            <Form onSubmit={submitHandler}>
                 <Form.Group controlId='name'>
                    <Form.Label>NOM</Form.Label>
                    <Form.Control type='text'
                    placeholder='enter name'
                    value={name}
                    onChange={(e) =>setname(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Adresse e-mail</Form.Label>
                    <Form.Control type='email'
                    placeholder='enter email'
                    value={email}
                    onChange={(e) =>setemail(e.target.value)}>  
                    </Form.Control>
                </Form.Group>

               {/*
    <Form.Group controlId='password'>
                    <Form.Label>password </Form.Label>
                    <Form.Control type='password'
                    placeholder='enter password'
                    value={password}
                    onChange={(e) =>setpassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm password </Form.Label>
                    <Form.Control type='password'
                    placeholder='confirm password'
                    value={confirmPassword}
                    onChange={(e) =>setconfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
               */} 
                <Button type='submit' variant='primary'>{ loading ?<Loader width='10px' height='10px'></Loader> : 'Modifier'  }</Button>
            </Form>
            </Col>
            <Col md={9}>
        <h2>COMMANDE</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                
                    <th>liVRé</th>
                <th>details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)} DT</td>
                 
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
        </Row>
    ) 
}

export default RegisterScreen
