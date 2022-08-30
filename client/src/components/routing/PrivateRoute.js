import {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../../contexts/authContext'
import { Spinner } from 'react-bootstrap'
import NavbarMenu from '../layouts/NavbarMenu'

const PrivateRoute = ({element: Element}) => {

    const {authState: {authLoading, isAuthenticated}} = useContext(authContext)

    if(authLoading)
    {
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }

    return isAuthenticated ? 
        (<>
            <NavbarMenu/>
            <Element />
        </>) 
        : 
        <Navigate to="/login" />
}

export default PrivateRoute