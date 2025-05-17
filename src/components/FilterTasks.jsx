/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from './Button';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

// const urlremote = `https://todoapp-backend-900w.onrender.com`
const urllocal = `http://localhost:5000`;



export const FilterTasks = () => {
  const { fetchData, todos } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate()

  const allTasks = () => {
    console.log('all tasks');
    //  load all tasks
    fetchData('all');
  };
  const completedTasks = () => {
    fetchData('complete');
  };
  const inCompleteTasks = () => {
    fetchData('incomplete');
  };

  const clearAllTasks = (userid) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Clear All Tasks!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${urllocal}/api/todos/user/${userid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            fetchData('all'); // refresh your list
          })
          .catch((_error) => {
            Swal.showValidationMessage('Clearing All the tasks failed');
          });
      }
    });
  };

  const logoutUser = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className='relative w-1/2'>
      {/* Buttons for lg and up */}
   <div className='hidden lg:flex justify-around gap-3 text-center text-2xl text-heading'>
        <span  onClick={allTasks} className=' font-buttons bg-white/10  px-4 py-1 rounded  w-full hover:cursor-pointer' >All Tasks</span>
       
          <span onClick={completedTasks} className=' font-buttons bg-white/10  px-4 py-1 rounded w-full hover:cursor-pointer '>Completed</span>
        
          <span onClick={inCompleteTasks} className=' font-buttons bg-white/10  px-4 py-1 rounded  w-full hover:cursor-pointer '>Incomplete</span>

        {todos.length > 0 && (
             <span
              // className="bg-blue-900 py-2 px-4 rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 w-full"
              onClick={() => clearAllTasks(todos[0]?.user)}
              className=' font-buttons bg-white/10 text-red-600 px-4 py-1 rounded  w-full hover:cursor-pointer'
            >
              Clear
            </span>
        )}
          <span onClick={logoutUser} className=' font-buttons bg-white/10  px-4 py-1 rounded  w-full hover:cursor-pointer '>Logout</span>

      </div>

      {/* Hamburger icon for small screens */}
      <div className='lg:hidden flex justify-between items-center px-2 py-2'>
        {/* <span className="font-bold text-lg">Tasks</span> */}
        <button onClick={() => setMenuOpen(prev => !prev)} className="focus:outline-none">
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-signup"></span>
            <span className="block w-6 h-0.5 bg-signup"></span>
            <span className="block w-6 h-0.5 bg-signup"></span>
          </div>
        </button>
      </div>

      {/* Mobile menu dropdown */}
        {menuOpen && (
        <div className='absolute top-full left-0 shadow-md rounded-lg flex  justify-between items-start gap-2  py-2  mt-1 lg:hidden z-50 text-heading mb-2'>
          <span  onClick={allTasks} className=' font-buttons  px-2 py-1 rounded ' >All</span>
          <hr />
          <span onClick={completedTasks} className=' font-buttons   px-2 py-1 rounded '>Completed</span>
          <hr />
          <span onClick={inCompleteTasks} className=' font-buttons  px-2 py-1 rounded '>Incomplete</span>
          <hr />
          {todos.length > 0 && (
            <span
              // className="bg-blue-900 py-2 px-4 rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 w-full"
              onClick={() => clearAllTasks(todos[0]?.user)}
              className=' font-buttons  text-red-600  px-2 py-1 rounded '
            >
              Clear
            </span>  
          )}
          <span onClick={logoutUser} className=' font-buttons  px-2 py-1 rounded '>Logout</span>

        </div>
      )}
    </div>
  );
};
