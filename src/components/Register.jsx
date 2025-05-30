/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { Heading } from './Heading';
import AuthContext from './AuthContext';
const urlremote = `https://todoapp-backend-900w.onrender.com`;
// const urllocal = `http://localhost:5000`;
export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await axios
      .post(`${urlremote}/api/users`, {
        email,
        password,
      })
      .then((response) => {
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);

        toast.success('Registration successful');
        toast.loading('You will be automatically Loggedin Please wait...');
        setTimeout(() => {
          toast.dismiss();
          navigate('/todos'); // go to todos after registration
        }, 3500);
      })
      .catch((err) => {
        setError('Username already taken, use a different username');
        setLoading(false);
      });
  };
  return (
    <div className="relative h-screen w-screen">
      <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow  p-6 w-9/10 max-w-md space-y-3 text-center text-white">
        <Heading title="Todo-App" />
        <div className="bg-gray-200 h-px shadow-lg"></div>
        <h2 className=" text-base sm:text-2xl md:text-3xl lg:text-4xl font-titles text-stone-50">
          Create new account
        </h2>

        <div className=" flex  gap-2 items-center justify-center ">
          <h3 className="font-text text-base sm:text-lg md:text-xl lg:text-2xl ">
            Already have an account
          </h3>
          <span>
            <NavLink
              to="/login"
              className=" text-base sm:text-lg md:text-xl lg:text-3xl  text-signup font-bold hover:no-underline transition underline px-1 hover:text-signup/70"
            >
              Sign In
            </NavLink>
          </span>
        </div>
        <div className=" flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="font-text text-gray-400">Register</span>
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
            disabled={loading}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 px-2 py-1 rounded w-full outline-0 font-text"
            value={password}
            disabled={loading}
          />
          {error && <p className=" text-red-600">{error}</p>}

          <Toaster />
          <button
            type="submit"
            className="bg-button py-2 px-12 font-buttons text-base sm:text-lg md:text-xl lg:text-2xl rounded-lg w-full sm:w-auto text-heading hover:cursor-pointer  hover:bg-button/80"
          >
            {loading ? 'Please wait..' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};
