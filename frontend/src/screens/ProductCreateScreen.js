/* eslint-disable react/jsx-no-duplicate-props */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory} from '../actions/categoryAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'



const ProductCreateScreen = (props) => {  


 
  
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [remise, setRemise] = useState(0)

  const [isRecommander, setRecommander] = useState(false)

  const [brand, setBrand] = useState('')
  const [image, setImage] = useState([])

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setsubCategoryId] = useState("");
  const [subCategoryId2, setsubCategoryId2] = useState("");
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState(" ")
  const [uploading, setUploading] = useState(false)
  
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.categoryList);
  const productCreate = useSelector((state) => state.productCreate)
  const { loading, error, product, success } = productCreate

  
  


 

  useEffect(() => {
    if (success) { 
      dispatch({ type: PRODUCT_CREATE_RESET })
      props.history.push('/admin/productlist')
    }
    dispatch(getAllCategory())
   

  }, [dispatch, product, success,props.history]) 




  const uploadFileHandler = async (e) => {
    const file = e.target.files

    const formData = new FormData()

    for ( let key of file) {
      formData.append('image', key)
    }
    
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload/', formData, config) 

      setImage(data.split(',')) 

      setUploading(false)
    } catch (error) {
      
      setUploading(false)
    }
  }
 

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      createProduct({
        name,
        remise,
        price,
        image,
        brand,
        category: categoryId,
        subCategoryId,
        subCategoryId2,
        description,
        countInStock,
        recommander: isRecommander
      })
    )
  }

  


    const ondescription = (defaultValue) => {
      setDescription(defaultValue);
      
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group> 

                

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)} 
              ></Form.Control>
            </Form.Group>

                <Form.Group controlId='name'>
                  <Form.Label>Remise</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter remise'
                    value={remise}
                    onChange={(e) => setRemise(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                

               

                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    multiple
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>






                <Form.Group controlId='category'> 
                  <Form.Label>Category</Form.Label> 
                  <select
                    className="form-control form-control-sm"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)} 
                  >
                    <option>select category</option>
                    {categoryList.categories.map((category) => (
                      <option key={category._id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>


                <Form.Group controlId='sub-category'>
                  <Form.Label>Sub Category</Form.Label>
                  <select
                    className="form-control form-control-sm"
                    value={subCategoryId}
                    onChange={(e) => setsubCategoryId(e.target.value)}
                  >
                    <option>select category</option>
                    {categoryList.categories.map(category => (
                      //console.log(category)
                      category.children.length > 0 && category.children.map((child) => 
                      (
                        <option key={child._id} value={child.slug}>
                          {child.name}
                        </option>
                      )
                    )))}
                  </select>
                </Form.Group>

                <Form.Group controlId='sub-category'>
                  <Form.Label>Sub Category 2</Form.Label>
                  <select
                    className="form-control form-control-sm"
                    value={subCategoryId2}
                    onChange={(e) => setsubCategoryId2(e.target.value)}
                  >
                    <option>select category</option>
                    {categoryList.categories.map(category => (
                      //console.log(category)
                      category.children.length > 0 && category.children.map((child) =>
                      (
                        child.children.length > 0 && child.children.map(ch => (
                          <option key={ch._id} value={ch.slug}>
                            {ch.name}
                        </option>
                        ))
                      )
                      )))}
                  </select>
                </Form.Group>






            {/*<Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>*/}

             {/*<Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor)=>{
                const data = editor.getData()
                setDescription(data)
              }}
              />
            </Form.Group>*/}

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
               <EditorToolbar toolbarId={'t1'}/>
            <ReactQuill 
              theme="snow"
              defaultValue={description}
              onChange={ondescription}
              placeholder={"Write something awesome..."} 
              modules={modules('t1')}
              formats={formats}
              
            />
            </Form.Group>

                

                <Form.Group controlId='Recommandation'>
                  <Form.Label>Recommandation</Form.Label>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check 
                      inline label="1" name="group1" type={type} id={`inline-${type}-1`}
                        type='radio'
                        label='OUI'
                        onChange={(e) => setRecommander(true)}
                      />

                      <Form.Check inline label="2" name="group1" type={type} id={`inline-${type}-2`}
                      
                        type='radio'
                        label='NON'
                       
                        onChange={(e) => setRecommander(false)}
                      />
                      
                    </div>
                  ))}
                </Form.Group>




            <Button type='submit' variant='primary'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>

      

    </>
  )
}


export default ProductCreateScreen
