import React from 'react';
import Input from './Input';
import Modal from './Modal';
import { Row, Col } from 'react-bootstrap';


const UpdateCategoriesModal = (props) => {

    const { 
        show,
        handleclose,
        modaltitle,  
        categorries,
        handleCategoryInputName,
        handleCategoryInputParentId,
        categoryListt,
        onSubmit
    } = props;

  

    return (
        <Modal
            show={show}
            handleclose={handleclose}
            onSubmit={onSubmit}
            modaltitle={modaltitle}  
        >
            {
                
                
                    <Row >
                        <Col>
                            <Input
                                placeholder={categorries.name}
                                onChange={(e) => handleCategoryInputName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"  
                                
                            onChange={(e) => handleCategoryInputParentId(e.target.value)}>
                            
                            <option >select category</option>
                                {
                                    categoryListt.map(option => (<>
                                        

                                        <option key={option._id} value={option._id}>{option.name}</option>
                                        </>
                                    )
                                        
                                    )
                                }
                            </select>
                        </Col>
                        
                    </Row>
                
            }
        </Modal>
    );
}

export default UpdateCategoriesModal;