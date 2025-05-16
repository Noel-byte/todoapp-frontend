import React from 'react';
import { useState } from 'react';
import { ListToDo } from './ListToDo';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AuthContext from './AuthContext';
import { useContext } from 'react';
const urlremote = `https://todoapp-backend-900w.onrender.com`;
// const urlremote = `http://localhost:5000`
export const AddToDo = () => {
  const { isAuthenticated, fetchData } = useContext(AuthContext);
  //component memory
  const [todo, setToDo] = useState('');
  // const [todos,setTodos] = useState([])
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchData('all');
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === '') {
      toast.error('todo cannot be empty');
      return;
    }

    //add it to the database
    axios
      .post(
        `${urlremote}/api/todos`,
        { text: todo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success('Success: To do added');
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => toast.error());

    //refresh the ui
    fetchData('all');

    setToDo(''); //clear input after adding
  };
  return (
    <>
      <div className="p-4 sm:p-8  mt-2 w-full  mx-auto text-center fixed top-24 left-0 right-0 z-40">
        <form
          className="p-4 flex gap-2 justify-center items-baseline  text-white "
          onSubmit={handleSubmit}
        >
          <div className="w-full flex  sm:flex-row items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              name="todoname"
              id="todoname"
              placeholder="Enter todo here"
              className="bg-white/10 px-2 py-2 rounded w-full outline-0 font-text"
              value={todo}
              onChange={(e) => setToDo(e.target.value)}
            />
          </div>

          <button
            className="bg-white/10 py-2 px-4 rounded-lg sm:w-auto text-white hover:cursor-pointer hover:bg-white/20"
            type="submit"
          >
            AddToDo
          </button>
          <Toaster />
        </form>
      </div>
      <ListToDo />
    </>
  );
};
