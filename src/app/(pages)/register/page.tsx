import React from 'react'
import { RegisterForm } from './_Component/RegisterForm/RegisterForm'

export default function page() {
  return <>
    <div className='min-h-[60vh] flex flex-col justify-center items-center gap-8'>
      <h1 className='text-4xl font-bold'>Register Now</h1>
      <RegisterForm/>
  
    </div>
    </>
}
