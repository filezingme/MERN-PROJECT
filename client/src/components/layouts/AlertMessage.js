import React from 'react'
import { Alert } from 'react-bootstrap';

const AlertMessage = ({info}) => {
  return info && (
    <Alert variant={info.type}>{info.message}</Alert>
  )
}

export default AlertMessage