/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from './Button';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from './Login';

import Swal from 'sweetalert2';

const urlremote = `https://todoapp-backend-900w.onrender.com`;
// const urllocal = `http://localhost:5000`;

export const FilterTasks = () => {
  const [selected, setSelected] = useState('all');
  const {
    fetchData,
    todos,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    setTodos,
  } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const allTasks = () => {
    // console.log('all tasks');
    setSelected('all')
    //  load all tasks
    fetchData('all');
    setMenuOpen((prev) => !prev);
  };
  const completedTasks = () => {
    setSelected('completed');
    fetchData('complete');
    setMenuOpen((prev) => !prev);
  };
  const inCompleteTasks = () => {
    setSelected('incomplete');
    fetchData('incomplete');
    setMenuOpen((prev) => !prev);
  };

  const clearAllTasks = (userid) => {
    setSelected('all')
    MySwal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Clear All Tasks!',
    }).then((result) => {
      setMenuOpen((prev) => !prev);
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

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
    setTodos([]);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="relative w-3/5 ">
      {/* Buttons for lg and up */}
      <div className="hidden lg:flex justify-between items-center gap-4  text-2xl text-heading">
        <div>
          {isAuthenticated ? (
            <span
              onClick={logoutUser}
              className=" font-buttons  px-4 py-1 rounded   hover:cursor-pointer hover:text-heading/80 "
            >
              Logout
            </span>
          ) : undefined}
        </div>
        {todos.length > 0 && (
          <div className="flex  justify-between gap-2">
            <>
              <span
                onClick={allTasks}
                // className=" font-buttons   px-4 py-1    hover:cursor-pointer hover:text-heading/80"
                className={`font-buttons block  px-4 py-1    hover:cursor-pointer hover:text-heading/80 ${
                  selected === 'all' && ' underline' 
                }`}
              >
                All Tasks
              </span>

              <span
                onClick={completedTasks}
                className={`font-buttons block  px-4 py-1    hover:cursor-pointer hover:text-heading/80 ${
                  selected === 'completed' && ' underline' 
                }`}
              >
                Completed
              </span>

              <span
                onClick={inCompleteTasks}
                className={`font-buttons block  px-4 py-1    hover:cursor-pointer hover:text-heading/80 ${
                  selected === 'incomplete' && ' underline' 
                }`}
              >
                Incomplete
              </span>

              <span
                // className="bg-blue-900 py-2 px-4 rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 w-full"
                onClick={() => clearAllTasks(todos[0]?.user)}
                className=" font-buttons  text-red-800 px-4 py-1    hover:cursor-pointer hover:text-red-700"
              >
                Clear
              </span>
            </>
          </div>
        )}
      </div>

      {/* Hamburger icon for small screens */}
      <div className="lg:hidden flex  justify-between items-center px-2 py-2">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="focus:outline-none"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-signup"></span>
            <span className="block w-6 h-0.5 bg-signup"></span>
            <span className="block w-6 h-0.5 bg-signup"></span>
          </div>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 shadow-md rounded-lg flex flex-col bg-button  justify-between items-start gap-1 px-2 py-2  mt-1 lg:hidden z-50 text-heading mb-2">
          {todos.length > 0 && (
            <>
              <span
                onClick={allTasks}
                className=" font-buttons  px-2 py-1 rounded "
              >
                All
              </span>
              <hr />
              <span
                onClick={completedTasks}
                className=" font-buttons   px-2 py-1 rounded "
              >
                Completed
              </span>
              <hr />
              <span
                onClick={inCompleteTasks}
                className=" font-buttons  px-2 py-1 rounded "
              >
                Incomplete
              </span>
              <hr />

              <span
                // className="bg-blue-900 py-2 px-4 rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 w-full"
                onClick={() => clearAllTasks(todos[0]?.user)}
                className=" font-buttons  text-red-600  px-2 py-1 rounded "
              >
                Clear
              </span>
            </>
          )}

          {isAuthenticated ? (
            <span
              onClick={logoutUser}
              className=" font-buttons  px-2 py-1 rounded "
            >
              Logout
            </span>
          ) : undefined}
        </div>
      )}
    </div>
  );
};
