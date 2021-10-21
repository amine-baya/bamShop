import React from 'react';
import Input from './Input';
import Modal from './Modal';
import Message from './Message'
import {useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';



const AddCategoryModal = (props) => {
    
    const {
        show,
        handleclose,
        modaltitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryListt,
        onSubmit
    } = props;
    const categoryCreate = useSelector(state => state.categoryCreate); 

    return (
        
        <Modal
        show={show}
        handleclose={handleclose}  
        onSubmit={onSubmit}
        modaltitle={modaltitle} 
        >
            {categoryCreate.error && <Message variant='danger'>{categoryCreate.error}</Message>  }

            {categoryListt.length != 0 ? (<Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                   
                </Col>
                <Col>
                    <select
                        className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            categoryListt.map(option =><>
                                <option key={option._id} value={option._id}>{option.name}</option>
                                </>
                                )
                                
                        }
                    </select>
                </Col>
            </Row>) : (<Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>
            </Row>)}
           


        </Modal>
    );
}

export default AddCategoryModal;