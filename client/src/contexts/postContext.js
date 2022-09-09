import {createContext, useReducer, useState} from 'react'
import {postReducer} from '../reducers/postReducer'
import { API_URL } from '../constants/commonContant'
import { POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS, ADD_POST, DELETE_POST } from '../constants/postConstant'
import axios from 'axios'

export const postContext = createContext()

const PostContextProvider = ({children}) => {

    //State
    const [postState, dispath] = useReducer(postReducer, {
        posts: [],
        postsLoading: true
    })


    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: true,
        message: '',
        type: null
    })


    //Get all posts
    const getPosts = async() => {
        try {
            const response = await axios.get(`${API_URL}/posts`)
            if (response.data.success) {
                dispath({
                    type: POSTS_LOADED_SUCCESS, 
                    payload: response.data.posts
                })
            }
        } catch (error) {
            // Nếu error.response.data là Null || underfine thì nó sẽ return {...}
            //return error.response.data ?? { success: false, message: 'Server error' }
            dispath({
                type: POSTS_LOADED_FAIL
            })
        }
    }


    //Add post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${API_URL}/posts`, newPost)
            
            if(response.data.success) {
                dispath({type: ADD_POST, payload: response.data.post})
                return response.data
            }

        } catch (error) {
            if (error.response.data)
                return error.response.data
            else
                return { success: false, message: 'Server error' }
        }
    }


    //Delete post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${API_URL}/posts/${postId}`)

            if (response.data.success) {
                dispath({type: DELETE_POST, payload: postId})
            }

        } catch (error) {
            console.log(error)
        }
    }


    //Post context data
    const postContextData = {
        postState, 
        getPosts, 
        showAddPostModal, 
        setShowAddPostModal, 
        addPost, 
        showToast, 
        setShowToast, 
        deletePost
    }


    return (
        <postContext.Provider value={postContextData}>
            {children}
        </postContext.Provider>
    )
}

export default PostContextProvider