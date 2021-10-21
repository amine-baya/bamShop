import React from 'react';
import Input from './Input';
import Modal from './Modal';
import Message from './Message'
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';



const AddCategoryModal = (props) => {

    const {
        show,
        handleclose,
        modaltitle,
        categoryName,
        uploadFileHandler,
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
            <Row>
                <Col>
                    <input
                        type='file'
                        multiple
                        placeholder={`select Image`}
                        onChange={(e) => uploadFileHandler(e.target.files)}
                        className="form-control-sm"
                    />

                </Col>
                
            </Row>



        </Modal>
    );
}

export default AddCategoryModal; 