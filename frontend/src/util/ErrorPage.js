import React from 'react'
import error from './error.svg'

const ErrorPage = (props) => {
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <img src={error} alt="Error" className='error-img m-5' />
      <h2>{props.error}</h2>
    </div>
  )
}

export default ErrorPage