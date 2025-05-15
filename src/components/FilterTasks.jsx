/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from './Button';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';

import Swal from 'sweetalert2';

const urlremote = `https://todoapp-backend-900w.onrender.com`
// const urllocal = `http://localhost:5000`;

export const FilterTasks = () => {
  const { fetchData, todos } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const MySwal = withReactContent(Swal);

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
          .delete(`${urlremote}/api/todos/user/${userid}`, {
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

  return (
    <div className='relative w-screen'>
      {/* Buttons for md and up */}
   <div className='hidden md:flex justify-around gap-3'>
        <Button label='All Tasks' onClick={allTasks} />
        <Button label='Completed Tasks' onClick={completedTasks} />
        <Button label='Incomplete Tasks' onClick={inCompleteTasks} />

        {todos.length > 0 && (
          <button
            className="bg-white/10 py-2 px-4 rounded-lg w-full sm:w-auto text-stone-50 hover:cursor-pointer hover:bg-white/20"
            onClick={() => clearAllTasks(todos[0]?.user)}
          >
            Clear All Tasks
          </button>
        )}
      </div>

      {/* Hamburger icon for small screens */}
      <div className='md:hidden flex justify-between items-center px-2 py-2'>
        {/* <span className="font-bold text-lg">Tasks</span> */}
        <button onClick={() => setMenuOpen(prev => !prev)} className="focus:outline-none">
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </button>
      </div>

      {/* Mobile menu dropdown */}
        {menuOpen && (
        <div className='absolute top-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 shadow-md rounded-lg flex flex-col justify-center items-start gap-3 px-4 py-4 md:hidden z-50'>
          <span  onClick={allTasks} className=' font-buttons bg-white/10 text-white px-4 py-1 rounded  w-full' >All Tasks</span>
          <hr />
          <span onClick={completedTasks} className=' font-buttons bg-white/10 text-white px-4 py-1 rounded w-full '>Completed Tasks</span>
          <hr />
          <span onClick={inCompleteTasks} className=' font-buttons bg-white/10 text-white px-4 py-1 rounded  w-full'>Incomplete Tasks</span>
          <hr />
          {todos.length > 0 && (
            <span
              // className="bg-blue-900 py-2 px-4 rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 w-full"
              onClick={() => clearAllTasks(todos[0]?.user)}
              className=' font-buttons bg-white/10 text-white px-4 py-1 rounded  w-full'
            >
              Clear All Tasks
            </span>
          )}
        </div>
      )}
    </div>
  );
};
