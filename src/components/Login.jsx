import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('')
  const navigate = useNavigate();

  const handleLogin =  (e) => {
    e.preventDefault();
    axios
      .post('https://todoapp-backend-900w.onrender.com/api/users/login', {
        email,
        password,
      })
      .then((response) => {

    
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/todos'); // redirect to AddTodo page
      })
      .catch((err) => {
        if(err.response){
          if(err.response.status===400){
            setError("User not found. Redirecting to register...")
            setTimeout(() => {
              navigate("/register")
            }, 1500);
          }else{
            setError("Network error or server is down")
          }
        }
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={handleLogin}
        className="bg-stone-400 p-4 flex flex-col justify-center items-center space-y-4"
      >
        <input
          type="email"
          name=""
          id=""
          onChange={(e) => setEmail(e.target.value)}
          className="bg-stone-50 p-2 rounded w-full"
          value={email}
        />
        <input
          type="password"
          name=""
          id=""
          onChange={(e) => setPassword(e.target.value)}
          className="bg-stone-50 p-2 rounded w-full"
          value={password}
        />
        <button
          type="submit"
          className="bg-blue-900 py-2 px-4 rounded-lg w-full sm:w-auto text-white hover:cursor-pointer hover:bg-blue-600"
        >
          Login
        </button>
        {error&& <p className=' text-red-600'>{error}</p>}
      </form>
    </div>
  );
};
