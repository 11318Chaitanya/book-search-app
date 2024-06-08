import React from 'react';
import loader from '../assets/loader.gif'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center my-2'>
        <img className='w-12' src={loader} alt="" />
    </div>
  )
}

export default Spinner