import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = ({setIsAuthenticated}) => {
     
    const [email,setEmail] = useState('')
    const [password,setPassword]= useState('')
            const navigate = useNavigate();

    const handleLogin = (e) =>{
              e.preventDefault();    
              axios.post('https://todoapp-backend-900w.onrender.com/api/users/login',{email,password})  
              .then(response=>{
                localStorage.setItem('token',response.data.token)
                setIsAuthenticated(true);
                navigate('/todos') // redirect to AddTodo page
              })
              .catch(err=>console.error(err))
    }

  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin} className='bg-stone-400 p-4 flex flex-col justify-center items-center space-y-4'>
              <input type="email" name="" id="" onChange={(e)=>setEmail(e.target.value)}  value={email}/> 
              <input type="password" name="" id="" onChange={(e)=>setPassword(e.target.value)} value={password} />
              <button>Login</button>
        </form>
    </div>
  )
}
