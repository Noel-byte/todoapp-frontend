/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
const urlremote = `https://todoapp-backend-900w.onrender.com`
// const urlremote = `http://localhost:5000`;
export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('')
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${urlremote}/api/users`, {
        email,
        password,
      })
      .then(() => {
        toast.success('Registration successful');
        toast.loading('Redirecting to Login Page Please wait...');
        setTimeout(() => {
          toast.dismiss();
          navigate('/login'); // go to login after registration
        }, 3500);
      })
      .catch((err) => setError('Username already taken, use a different username'));
  };
  return (
    <div className="relative h-screen w-screen">
      <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow  p-6 w-9/10 max-w-md space-y-3 text-center text-white">
        <h1 className="text-left font-titles px-1 py-2 text-heading text-base sm:text-2xl md:text-3xl lg:text-4xl">
          Todo - App
        </h1>
        <div className="bg-gray-200 h-px shadow-lg"></div>
        <h2 className="  text-4xl font-titles text-heading">
          Register Here
        </h2>

        <div className=" flex  gap-2 items-center justify-center ">
          <h3 className="font-text text-base sm:text-lg md:text-xl lg:text-2xl ">
            You have an account
          </h3>
          <span>
            <NavLink
              to="/login"
              className=" text-base sm:text-lg md:text-xl lg:text-3xl font-semibold text-signup font-buttons hover:text-signup/60"
            >
              SignIn
            </NavLink>
          </span>
        </div>
 <div className=" flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="font-text text-gray-400">Provide email and password to Register</span>
          <div className=" flex-1 h-px bg-gray-300"></div>
        </div>
        <form
          onSubmit={handleRegister}
          className="p-4 flex flex-col justify-center items-center space-y-4"
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 px-2 py-1 rounded w-full outline-0 font-text"
            value={email}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 px-2 py-1 rounded w-full outline-0 font-text"
            value={password}
          />
          {error && <p className=" text-red-600">{error}</p>}

          <Toaster />
          <button
            type="submit"
            className="bg-button py-2 px-12 font-buttons text-base sm:text-lg md:text-xl lg:text-2xl rounded-lg w-full sm:w-auto text-heading hover:cursor-pointer  hover:bg-button/10"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
