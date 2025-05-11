import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('email:', email, 'password:', password);

    axios
      .post('https://todoapp-backend-900w.onrender.com/api/users', {
        email,
        password,
      })
      .then(() => {
        navigate('/todos'); // go to login aftger register
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="relative h-screen w-screen bg-gray-100 ">
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-lg py-2 px-3 w-3/4 space-y-3 text-center">
        <h1 className="text-left font-titles px-1 py-2 text-orangered text-base sm:text-2xl md:text-3xl lg:text-4xl">
          Todo - App
        </h1>
        <div className="bg-gray-200 h-px shadow-lg"></div>
        <h2 className=" text-base sm:text-xl md:text-2xl lg:text-3xl font-titles text-orangered">
          Register Here
        </h2>

        <form
          onSubmit={handleRegister}
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
