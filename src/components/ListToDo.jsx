
import axios from 'axios';
import { useState, useContext } from 'react';
import done from '../assets/done.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AuthContext from './AuthContext';

const urlremote = `https://todoapp-backend-900w.onrender.com`
// const urlremote = `http://localhost:5000`;

export const ListToDo = () => {
  const [editNoteId, setEditNoteId] = useState(null);
  const [editedItemsNote, setEditedItemsNote] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const token = localStorage.getItem('token');
  const MySwal = withReactContent(Swal);
  const { todos, fetchData } = useContext(AuthContext);

  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${urlremote}/api/todos/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            //refresh the ui
            fetchData('all');
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
          });
      }
    });
  };

  const handleEdit = (id) => {
    const todo = todos.find((t) => t._id === id);
    //toggle between Save and Edit
    if (editNoteId === id) {
      //handle save logic here
      MySwal.fire({
        title: 'Save changes?',
        text: 'Do you want to save the changes you made?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'Cancel',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            axios.put(
              `${urlremote}/api/todos/${id}`,
              {
                text: editedItemsNote[id],
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            fetchData('all');
          } catch (err) {
            Swal.showValidationMessage('Save failed. Try again.' + err);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
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
      .put(
        `${urlremote}/api/todos/${todoid}`,
        {
          completed: isChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchData('all');
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  return (
    <div className="pt-60 ">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center text-black font-text text-sm sm:text-base mb-1 px-3 py-2 border-b-white/10 sm:p-4 rounded-lg shadow ml-2 mr-2 sm:space-y-0 
            ${todo.completed ? 'bg-green-400' : 'bg-stone-50'}`}
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
              className="w-full rounded p-2 bg-stone-500 text-stone-50 outline-0"
            />
          ) : (
            <span className="break-words w-full sm:w-auto">{todo.text}</span>
          )}
          {!todo.completed ? (
            <div className="flex mt-2 gap-4 justify-around flex-wrap sm:flex-nowrap items-center">
              <button
                onClick={() => handleDelete(todo._id)}
                className=" bg-red-600 px-6 rounded py-1 hover:cursor-pointer font-buttons"
              >
                Delete
              </button>

              {editNoteId === todo._id ? (
                <button
                  onClick={() => handleEdit(todo._id)}
                  className=" bg-green-600 px-6 rounded py-1 hover:cursor-pointer  font-buttons"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo._id)}
                  className="  bg-yellow-600 px-6 rounded py-1 hover:cursor-pointer font-buttons"
                >
                  Edit
                </button>
              )}
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => handleCheckbox(e, todo._id)}
                checked={checkedItems[todo._id] || false}
                className="w-5 h-5 hover:cursor-pointer "
              />
            </div>
          ) : (
            <img src={done} className="w-3 h-3" alt="done icon" />
          )}
        </div>
      ))}
    </div>
  );
};
