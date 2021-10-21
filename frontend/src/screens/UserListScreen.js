import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
import SearchBox from '../components/SearchBox'
import Message from '../components/Message' 
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listUsers, deleteUser } from '../actions/userActions' 

const UserListScreen = ({ history, match }) => {   
 
  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users, page, pages } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
 
  const userDelete = useSelector((state) => state.userDelete) 
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
    dispatch(listUsers(keyword, pageNumber))
    
  }, [dispatch, history, successDelete, userInfo, pageNumber, keyword])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {  
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <Row className='align-items-center my-3' >
        <Col>
          <h1>Clients</h1>
        </Col>
        <Col>
          <Route render={({ history }) => <SearchBox history={history} dir={'admin/search/userList'} noResult={'admin/userList'} className={'d-none d-md-block'} />} />
          {console.log(history)}
        </Col>
       
      </Row>
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
                    <th>NOM</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <i className='fas fa-check' style={{ color: 'green' }}></i>
                        ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button> 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} isAdmin={true} slash = {`userlist`} /> 

        </>
        
      )}
    </>
  )
}

export default UserListScreen