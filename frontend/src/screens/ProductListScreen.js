import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from '../components/SearchBox'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import {
  listProducts, 
  deleteProduct
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {  
  const pageNumber = match.params.pageNumber || 1 
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages} = productList

 
 
                    
  const productDelete = useSelector((state) => state.productDelete)
  const { 
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
 
    dispatch({ type: PRODUCT_CREATE_RESET })
  
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts()) 
    }else{
      history.push('/login')
    }
    dispatch(listProducts(keyword, pageNumber))
    
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber, keyword])
 
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) { 
      dispatch(deleteProduct(id))
    }
  } 
 
  const createProductHandler = () => {
    history.push(`/admin/createproduct`) 
  } 
 
  return (
    <>
      
      <Row className='align-items-center'> 
        <Col>
          <h1>Produits</h1>
        </Col>
        <Col>
          <Route render={({ history }) => <SearchBox history={history} dir={'admin/search/productList'} noResult={'admin/productList'} className={'d-none d-md-block'}  />}  /> 
    
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> AJOUTER PRODUIT
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />} 
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                <th>PRIX</th>
                <th>CATEGORY</th>
                <th>SOUS-CATEGORY1</th>
                <th>SOUS-CATEGORY2</th>
                <th>MARQUE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toFixed(2)} €</td>
                  <td>{product.category}</td>
                  <td>{product.subCategoryId}</td>
                  <td>{product.subCategoryId2}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
              <Paginate pages={pages} page={page} isAdmin={true} slash= {'productlist'} />
        </>
      )}

     
    </>
  )
}

export default ProductListScreen