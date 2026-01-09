import SignupForm from '@/components/ui/signup-form'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const page = () => {
  return (
    <div>
      <SignupForm />
      <ToastContainer position="top-center" autoClose={2000} limit={1}/>
    </div>
  )
}

export default page
