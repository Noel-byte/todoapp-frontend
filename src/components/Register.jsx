import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export const Register = () => {

    const [email,setEmail] =  useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()


    const handleRegister = (e)=>{
         e.preventDefault();
         axios.post('https://todoapp-backend-900w.onrender.com/api/users',{email,password})
         .then(()=>{
            navigate('/login') // go to login aftger register
         })
         .catch(err=>console.error(err))
    }
  return (
    <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister} className='bg-stone-400 p-4 flex flex-col justify-center items-center space-y-4'>
              <input type="email" name="" id="" onChange={(e)=>setEmail(e.target.value)}  value={email}/> 
              <input type="password" name="" id="" onChange={(e)=>setPassword(e.target.value)} value={password} />
              <button>Register</button>
        </form>
    </div>
  )
}
