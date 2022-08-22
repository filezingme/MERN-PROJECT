// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LoginForm = () => {
    return (<>
      <Form className='my-4'>
        <Form.Group>
          <Form.Control type='text' placeholder='Username' name='username' className='my-3' required />
        </Form.Group>
        
        <Form.Group>
          <Form.Control type='password' placeholder='Password' name='password' className='my-3' required />
        </Form.Group>
        
        <Button variant='success' type='submit' className='my-3'>Login</Button>
      </Form>
      <p>
        Don't have an account? 
        <Link to='/register'>
          <Button variant='info' size='sm' className='ms-2'>Register</Button>
        </Link>
      </p>
    </>
    )
}

export default LoginForm