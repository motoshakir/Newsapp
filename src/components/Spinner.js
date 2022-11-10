import React from 'react'
import loading from './loading.gif'

const Spinner = () =>  {
 
    return (
      <div className='container text-centre'>
         <img className="img-fluid mx-auto my-auto d-block" src={loading} alt="loading"/>
      </div>
    )
}
export default Spinner 