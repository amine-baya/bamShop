import axios from 'axios' 
import {  
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAILURE,
    ADD_NEW_CATEGORY_REQUEST,
    ADD_NEW_CATEGORY_SUCCESS, 
    ADD_NEW_CATEGORY_FAILURE,
    UPDATE_CATEGORIES_REQUEST,
    UPDATE_CATEGORIES_SUCCESS,
    UPDATE_CATEGORIES_FAILURE,
    DELETE_CATEGORIES_REQUEST,
    DELETE_CATEGORIES_SUCCESS,  
    DELETE_CATEGORIES_FAILURE  

 } from '../constants/categoryConstants';

export const getAllCategory = () => async (dispatch) => {  
    try{
        
        dispatch({type: GET_ALL_CATEGORIES_REQUEST}) 

        const {data} = await axios.get('/api/categories/')

        dispatch({
            type: GET_ALL_CATEGORIES_SUCCESS,
            payload: data ,
        })

    }catch (error){

        dispatch({
            type: GET_ALL_CATEGORIES_FAILURE,

            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
    
}

export const createCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_NEW_CATEGORY_REQUEST, 
        })

        const {
            userLogin: { userInfo },
        } = getState()

 
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, 
            },
        }

        const { data } = await axios.post(`/api/categories/create`, category, config)

        dispatch({
            type: ADD_NEW_CATEGORY_SUCCESS,
            payload:  data,  
        })
        

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            //dispatch(logout())
            console.log('aa');
        }
        dispatch({
            type: ADD_NEW_CATEGORY_FAILURE,
            payload: message,
        })
    }
}

export const updateCategories = (id, category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_CATEGORIES_REQUEST,
        })

        const { 
            userLogin: { userInfo },
        } = getState()

        const config = { 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, 
            }, 
        }

        const { data } = await axios.put(`/api/categories/modifie/${id}`, category , config)

        dispatch({
            type: UPDATE_CATEGORIES_SUCCESS,
            payload: data,
        })
        dispatch(getAllCategory());
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        //dispatch(logout())
        
        dispatch({
            type: UPDATE_CATEGORIES_FAILURE,
            payload: message,
        })
    }
}



export const deleteCategories = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_CATEGORIES_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`/api/categories/modifie/${id}`, config)

        dispatch({
            type: DELETE_CATEGORIES_SUCCESS,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            //dispatch(logout())
            console.log('aa');
        }
        dispatch({
            type: DELETE_CATEGORIES_FAILURE,
            payload: message,
        })
    }
}

