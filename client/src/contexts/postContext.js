import {createContext, useReducer} from 'react'
import {postReducer} from '../reducers/postReducer'
import { API_URL } from '../constants/commonContant'
import { POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS } from '../constants/postConstant'
import axios from 'axios'

export const postContext = createContext()

const PostContextProvider = ({children}) => {

    //State
    const [postState, dispath] = useReducer(postReducer, {
        posts: [],
        postsLoading: true
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


    //Post context data
    const postContextData = {postState, getPosts}


    return (
        <postContext.Provider value={postContextData}>
            {children}
        </postContext.Provider>
    )
}

export default PostContextProvider