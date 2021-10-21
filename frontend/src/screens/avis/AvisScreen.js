import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message.js";
import Loader from "../../components/Loader.js";
import { getAvis } from "../../actions/userActions";
import Rating from '../../components/Rating'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import './Avis.css'

const AvisScreen = () => {

    const [message, setmessage] = useState()

    const [value, setvalue] = useState(0)

    const dispatch = useDispatch()

    const userAvis = useSelector(state => state.userAvis)
    const { Avis, loading } = userAvis

    const createAvis = useSelector(state => state.createAvis)
    const { error } = createAvis

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const deleteHandaller = async (id) => {
        console.log(id);
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.delete(`/api/users/avis/${id}`, config)

        console.log(data);

        setmessage(data.message)

        dispatch(getAvis())
    }

    useEffect(() => {
        dispatch(getAvis())

        console.log(userAvis);

        setvalue(Avis.avis.reduce((acc, item) => item.rating + acc, 0) / userAvis.Avis.count || 1)
        
    }, [dispatch, userAvis.Avis.count, createAvis ])


    return (
        <div>
            {loading && (
                <Loader />)}
            {error && (
                <Message variant='danger'>{error}</Message>)}
            {message && (<Message variant='success'>{message}</Message>)}
            <div className='avis_header'>
                <h3>Les Avis De Nos Client</h3>
                <div className='avis_span'>

                <h5 >Avis: </h5>
                <span>{<Rating value={value} />}</span>
                </div>
            </div>
            
            {Avis.avis.map(el =>
                (<>
                    <div className='avis_body'>
                        <h6>{el.name}</h6>
                        <p>{el.comment}</p>
                    <span> {<Rating value={el.rating} />}</span>
                    </div>
                {userInfo && userInfo.isAdmin ? (
                    <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandaller(el._id)}
                    >
                        <i className='fas fa-trash'></i>
                    </Button>
                ) : null}
                    
                </>)  
            )}

            
        </div>
    )
}

export default AvisScreen
