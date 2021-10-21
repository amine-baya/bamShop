import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
    getAllCategory,
    updateCategories,
    createCategory,
    deleteCategories
} from '../actions/categoryAction'
import AddCategoryModal from '../components/AddCategoryModal';
import UpdateCategoriesModal from '../components/UpdateCategoryModal';


 
 
const CategoryListScreen = () => {
    const [ categoriesUpdate, setcategoriesUpdate] = useState({})
    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const [name, setname] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState(null)
    const [createSelectCategories, setcreateSelectCategories] = useState([])

    const [parentId, setparentId] = useState('')
    const [selectCategories, setselectCategories] = useState([])

    const dispatch = useDispatch()

    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList

    const categoryDelete = useSelector((state) => state.categoryDelete);

    const categoryCreate = useSelector((state) => state.categoryCreate);
    
    useEffect(() => {
      
        dispatch(getAllCategory())

    }, [dispatch, categoryDelete.loading, categoryCreate.loading ])


    const edit = () => {
        dispatch(updateCategories(categoriesUpdate._id, {
            name: name ? name : categoriesUpdate.name,
            parentId: parentId ? parentId : categoriesUpdate.parentId
        }))
        setshow(false)
    }

  
    //console.log(categoriesUpdate);
    const changename = (name) => {
        setname(name)
    }
    const changeparentId = (parent) => {
        setparentId(parent)
    }
    
    
    const updatecat =  (child, arr) => {
        
       
            setcategoriesUpdate(child)
        
            if(arr) {
                setselectCategories(arr)
            } else {
                let tab2 = []
                categories.map((category) => (

                    category.children.length > 0 && category.children.map(child => (
                        tab2.push(child)
                    )
                    )))

                setselectCategories(tab2)

            }

        setshow(true) 

    }
    const createCategorys = (bool) => {
        if (bool === 'father') {
            setcreateSelectCategories(categories)
        }
        if (bool === 'child') {
            let tab2 = []
            categories.map((category) => (

                category.children.length > 0 && category.children.map(child => (
                    tab2.push(child)
                )
                )))

            setcreateSelectCategories(tab2)
        }
        if (!bool) {
            setcreateSelectCategories([]);

            setParentCategoryId(null)
        }
        setshow1(true)
    }

    const create = () => {

        console.log(categoryName, parentCategoryId);

        dispatch(
            createCategory({
            name: categoryName,
            parentId: parentCategoryId
        }))
        
        setshow1(false)
    }
     return(
         <>  
             <Row className='align-items-center'>
                 <Col>
                     <h1>Catégories</h1>
                 </Col>
                 <Col className='text-right'>
                     <Row>
                         <Col>
                             <Button className='my-3' onClick={() => createCategorys()}>
                                 <i className='fas fa-plus'></i> Create grand
                             </Button>
                         </Col>
                         <Col>
                             <Button className='my-3' onClick={() => createCategorys('father')}>
                                 <i className='fas fa-plus'></i> Create père
                             </Button>
                         </Col>
                         <Col>
                             <Button className='my-3' onClick={() => createCategorys('child')}>
                                 <i className='fas fa-plus'></i> Create enfant
                             </Button>
                         </Col>
                     </Row>
                    
                     
                     
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
                             <th>PARENTID</th> 
                             <th></th>
                             
                             
                         </tr>
                     </thead>
                     <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>
                                
                            <td>{category._id}</td> 
                            <td>{category.name}</td>
                            {category.parentId != null ? <td>{category.parentId}</td> : <td>I am the grandfather </td>}
                            <td>
                             
                                <Button variant='light' className='btn-sm'>
                                      <i className='fas fa-edit'></i>
                                    </Button>
                                  
                                    <Button onClick={() => dispatch(deleteCategories(category._id))}
                                    variant='danger'
                                    className='btn-sm'
                                   
                                  >
                                    <i className='fas fa-trash'></i>
                                  </Button>
                                </td>
                            
                            </tr>
                            ))}
                     </tbody>
                 </Table>
                             <h1>Sous Catégories 1 </h1>
            <Table striped bordered hover responsive className='table-sm'>
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>NOM</th>
                             <th>PARENTID</th>
                             <th></th>
                             
                         </tr>
                     </thead>
                     <tbody>
                                {categories.map((category) => (

                                    category.children.length > 0 && category.children.map(child => (
                                        <tr key={child._id}>
                                            <td>{child._id}</td>
                                            <td>{child.name}</td>
                                            {child.parentId != null ? <td>{child.parentId}</td> : <td>I am the father </td>}
                                            <td>

                                                <Button variant='light' className='btn-sm' onClick={() => updatecat(child, categories) }>
                                            <i className='fas fa-edit'></i>
                                        </Button>

                                        <Button
                                            onClick={() => dispatch(deleteCategories(child._id))}
                                            variant='danger'
                                            className='btn-sm'

                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                            </td>

                                        </tr>
                                    )
                                )
                             
                                    ))}
                     </tbody>
                 </Table>
                        
                             <h1>Sous Catégories 2 </h1>
                             <Table striped bordered hover responsive className='table-sm'>
                                 <thead>
                                     <tr>
                                         <th>ID</th>
                                         <th>NAME</th>
                                         <th>PARENTID</th>
                                         <th></th>


                                     </tr>
                                 </thead>
                                 <tbody>
                                     {categories.map((category) => (

                                         category.children.length > 0 && category.children.map(child => (
                                             child.children.length > 0 && child.children.map(ch =>(

                                                 <tr key={ch._id}>
                                                     <td>{ch._id}</td>
                                                     <td>{ch.name}</td>
                                                     {ch.parentId != null ? <td>{ch.parentId}</td> : <td>I am your father </td>}
                                                     <td>

                                                         <Button variant='light' className='btn-sm' onClick={() => updatecat(ch )} >
                                                             <i className='fas fa-edit'></i>
                                                         </Button>

                                                         <Button
                                                             onClick={() => dispatch(deleteCategories(ch._id))}
                                                             variant='danger'
                                                             className='btn-sm'

                                                         >
                                                             <i className='fas fa-trash'></i>
                                                         </Button>
                                                     </td>

                                                 </tr>
                                             ))
                                             
                                         )
                                         )

                                     ))}
                                 </tbody>
                             </Table>

    </>
 
             )}

             <AddCategoryModal
                 show={show1}
                 handleclose={() => setshow1(false)}
                 modaltitle="Create category"
                 categoryListt={createSelectCategories}
                 categoryName={categoryName}
                 setCategoryName={setCategoryName}
                 parentCategoryId={parentCategoryId}
                 setParentCategoryId={setParentCategoryId}
                 onSubmit={create}
             />

             <UpdateCategoriesModal
            show={show}
            handleclose={() => setshow(false)}
            modaltitle= "Update category"
            categorries={categoriesUpdate}
            handleCategoryInputName={changename}
            handleCategoryInputParentId={changeparentId}
            categoryListt={selectCategories}
            onSubmit={edit}
             />
             
         </>
     )

}

export default CategoryListScreen