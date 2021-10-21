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





  

export const categoryListReducer = (state = { categories: []} , action)=>{

    switch (action.type) {
        case GET_ALL_CATEGORIES_REQUEST: return { loading: true,  categories: [] }

        case GET_ALL_CATEGORIES_SUCCESS: return { loading: false ,  categories: action.payload.categorys }

        case GET_ALL_CATEGORIES_FAILURE: return { loading: false , error: action.payload }
  
        default: return state 

    }
}
 

export const categoryCreateReducer = (state = { categories: [] }, action) => {

    switch (action.type) {
        case ADD_NEW_CATEGORY_REQUEST: return { loading: true, categories: [] }  

        case ADD_NEW_CATEGORY_SUCCESS: return { loading: false, 
                                                success: true, 
           //categories: buildNewCategories(action.payload.parentId, state.categories, action.payload) 
            categories: action.payload
        }


        case ADD_NEW_CATEGORY_FAILURE: return { loading: false, error: action.payload }

        default: return state

    }
}
 


export const categoryUpdateReducer = (state = { }, action) => {

    switch (action.type) {
        case UPDATE_CATEGORIES_REQUEST: return { loading: true }

        case UPDATE_CATEGORIES_SUCCESS: return { loading: false, success: true, categories: action.payload }

        case UPDATE_CATEGORIES_FAILURE: return { loading: false, error: action.payload }

        default: return state

    }
}



export const categoryDeleteReducer = (state = { }, action) => {

    switch (action.type) {
        case DELETE_CATEGORIES_REQUEST: return { loading: true, categories: [] }

        case DELETE_CATEGORIES_SUCCESS: return { loading: false, success: true, }

        case DELETE_CATEGORIES_FAILURE: return { loading: false, error: action.payload }

        default: return state

    }
}