import axios from 'axios';
import React, { useState } from 'react';
import done from '../assets/done.png';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
import save from '../assets/save.png';
import clear from '../assets/clear.png';
import { FilterTasks } from './FilterTasks';

export const ListToDo = ({ todos, fetchData }) => {
  const [editNoteId, setEditNoteId] = useState(null);
  const [editedItemsNote, setEditedItemsNote] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
 const token = localStorage.getItem('token')
  const handleDelete = (id) => {
    
    //delete an item with a specific id from the database
    axios
      .delete(`https://todoapp-backend-900w.onrender.com/api/todos/${id}`,{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
      .then((response) => {
        alert('Deleted:' + JSON.stringify(response.data.message));
        //refresh the ui
        fetchData('all');
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  const handleEdit = (id) => {
    const todo = todos.find((t) => t._id === id);
    //toggle between Save and Edit
    if (editNoteId === id) {
      //handle save logic here
      axios
        .put(`https://todoapp-backend-900w.onrender.com/api/todos/${id}`, {
          text: editedItemsNote[id],
        },{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
        .then((response) => {
          alert('Saved' + JSON.stringify(response.data.message));
          fetchData('all');
        })
        .catch((error) => {
          console.error('error', error);
        });
      setEditNoteId(null);
    } else {
      setEditNoteId(id);
      setEditedItemsNote((prev) => ({ ...prev, [id]: todo.text }));
    }
  };

  const handleCheckbox = (e, todoid) => {
    const isChecked = e.target.checked;
    setCheckedItems((prev) => ({ ...prev, [todoid]: isChecked }));

    //handle update logic
    axios
      .put(`https://todoapp-backend-900w.onrender.com/api/todos/${todoid}`, {
        completed: isChecked,
      },{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
      .then(() => {
        fetchData('all');
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  const clearAllTasks = (id) => {
    axios
      .delete(`https://todoapp-backend-900w.onrender.com/api/todos/${id}`,{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
      .then((response) => {
        console.log(response.data);
        fetchData('all'); // refresh your list
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className=" mt-3  px-8 py-3 bg-blue-400">
      <h2 className="text-xl sm:text-2xl font-semibold text-center flex flex-col sm:flex-row justify-between items-center gap-2 pb-2">
        <FilterTasks fetchData={fetchData} />{' '}
        <span className="ml-0 sm:ml-2.5 rounded bg-red-400">
          <img
            src={clear}
            alt="clear icon"
            className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded hover:cursor-pointer"
            onClick={()=>clearAllTasks(todos.user)}
          />
        </span>
      </h2>

      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center text-white text-sm sm:text-base mb-2 p-3 sm:p-4 rounded shadow space-y-2 sm:space-y-0
            ${todo.completed ? 'bg-green-600' : 'bg-stone-600'}`}
        >
          {editNoteId === todo._id ? (
            <input
              type="text"
              value={editedItemsNote[todo._id]}
              onChange={(e) =>
                setEditedItemsNote((prev) => ({
                  ...prev,
                  [todo._id]: e.target.value,
                }))
              }
              className="w-full rounded p-2 bg-black text-white"
            />
          ) : (
            <span className="break-words w-full sm:w-auto">{todo.text}</span>
          )}
          {!todo.completed ? (
            <div className="flex mt-2 gap-4 justify-around flex-wrap sm:flex-nowrap items-center">
              <img
                onClick={() => handleDelete(todo._id)}
                src={del}
                alt="delete icon"
               className="w-8 h-8 object-cover rounded hover:cursor-pointer"
              />

              {editNoteId === todo._id ? (
                <img
                  onClick={() => handleEdit(todo._id)}
                  src={save}
                  alt="save icon"
                 className="w-8 h-8 object-cover rounded hover:cursor-pointer"
                />
              ) : (
                <img
                  onClick={() => handleEdit(todo._id)}
                  src={edit}
                  alt="edit icon"
                  className=" w-8 h-8 object-cover rounded hover:cursor-pointer"
                />
              )}
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => handleCheckbox(e, todo._id)}
                checked={checkedItems[todo._id] || false}
               className="w-5 h-5 hover:cursor-pointer"
              />
            </div>
          ) : (
            <img src={done} className="w-6 h-6" alt="done icon" />
          )}
        </div>
      ))}
    </div>
  );
};
