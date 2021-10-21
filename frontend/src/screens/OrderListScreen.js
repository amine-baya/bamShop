import React, { useEffect, } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from '../components/SearchBox'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listOrders, deleteOrder } from '../actions/orderActions'





const OrderListScreen = ({ history, match }  ) => {

 

  const pageNumber = match.params.pageNumber || 1 
  const keyword = match.params.keyword 
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders, page, pages  } = orderList

  const orderDelete = useSelector((state) => state.orderDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login') 
    }
    dispatch(listOrders(keyword, pageNumber))

  }, [dispatch, history, userInfo, pageNumber, keyword, successDelete])
  console.log(Date());

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {

      dispatch(deleteOrder(id))  
    }
  }

  

  return (
    <>
      <Row className='align-items-center my-3' >
        <Col>
          <h1>Commandes</h1>
        </Col>
        <Col>
          <Route render={({ history }) => <SearchBox history={history} dir={'admin/search/orderList'} noResult={'admin/orderList'} className={'d-none d-md-block'} />} />
        </Col>

      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message> 
      ) : (
        <>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>client</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    {/*<th>PAID</th>*/}
                    <th>LIVRé</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt}</td>
                      <td>{order.totalPrice.toFixed(2)} €</td>
                      {/*
                       <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      */}
                     
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td> 
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='light' className='btn-sm'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                      <td> 
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(order._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} isAdmin={true} slash={`orderlist`} />

             
        </>
        
      )}
    </>
  )
}

export default OrderListScreen