import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Login = ({ setIsAuthenticated, fetchData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('https://todoapp-backend-900w.onrender.com/api/users/login', {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        fetchData('all');
        navigate('/todos'); // redirect to AddTodo page
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            setError('User not found. Redirecting to register...');
            setTimeout(() => {
              navigate('/register');
            }, 1500);
          } else {
            setError('Network error or server is down');
          }
        }
      });
  };

  return (
    <div className="relative h-screen w-screen bg-gray-100 ">
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-lg py-2 px-3 w-3/4 space-y-3 text-center">
        <h1 className="text-left font-titles px-1 py-2 text-orangered text-base sm:text-2xl md:text-3xl lg:text-4xl">
          Todo - App
        </h1>
        <div className="bg-gray-200 h-px shadow-lg"></div>
        <h2 className=" text-base sm:text-xl md:text-2xl lg:text-3xl font-titles text-orangered">
          Login to your account
        </h2>
        <div className=" flex  gap-2 items-center justify-center ">
          <h3 className="font-text text-base sm:text-lg md:text-xl lg:text-2xl ">
            Don't have an account
          </h3>
          <span>
            <Link
              to="/register"
              className=" text-base sm:text-lg md:text-xl lg:text-3xl font-semibold text-blue-700 font-buttons hover:text-blue-500"
            >
              SignUp
            </Link>
          </span>
        </div>
        <div className=" flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="font-text text-gray-400">Login</span>
          <div className=" flex-1 h-px bg-gray-300"></div>
        </div>

        <form
          onSubmit={handleLogin}
          className="p-4 flex flex-col justify-center items-center space-y-4"
        >
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 px-2 py-1 rounded w-full outline-0 font-text"
            value={email}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 px-2 py-1 rounded w-full outline-0 font-text"
            value={password}
          />
          <button
            type="submit"
            className="bg-blue-900 py-2 px-12 font-buttons text-base sm:text-lg md:text-xl lg:text-2xl rounded-lg w-full sm:w-auto text-white hover:cursor-pointer hover:bg-blue-600"
          >
            Login
          </button>
          {error && <p className=" text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};
