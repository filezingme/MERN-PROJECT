import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
    return (<>
        <Form className='my-4'>
            <Form.Group>
            <Form.Control type='text' placeholder='Username' name='username' className='my-3' required />
            </Form.Group>
            
            <Form.Group>
            <Form.Control type='password' placeholder='Password' name='password' className='my-3' required />
            </Form.Group>
            
            <Form.Group>
            <Form.Control type='password' placeholder='Confirm Password' name='confirmPassword' className='my-3' required />
            </Form.Group>
            
            <Button variant='success' type='submit' className='my-3'>Register</Button>
        </Form>
        <p>
            Already have an account? 
            <Link to='/login'>
                <Button variant='info' size='sm' className='ms-2'>Login</Button>
            </Link>
        </p>
    </>
    )
}

export default RegisterForm