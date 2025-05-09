import React from 'react'
import { useState } from 'react'
import { ListToDo } from './ListToDo'
import axios from 'axios'

export const AddToDo = ({todos,fetchData}) => {

    //component memory
    const [todo, setToDo] = useState('')
    // const [todos,setTodos] = useState([])


     const handleSubmit = (e)=>{
                  e.preventDefault()
                  if(todo.trim()==='')return;

                  const token = localStorage.getItem('token');

                  //add it to the database
                  axios.post('https://todoapp-backend-900w.onrender.com/api/todos', {text:todo},{
                    headers:{
                     Authorization:`Bearer ${token}`
                    }
                  })
                  .then(response=>console.log('Todo added',response))
                  .catch(error=>console.error('Error',error))

                  //refresh the ui
                  fetchData('all')
                  //add new todo to the array
                  // setTodos((prevTodos)=>[...prevTodos,todo])
                  setToDo('') //clear input after adding

     }
  return (
    <>
   
    <div className="p-4 sm:p-8 bg-stone-200 mt-2 w-full sm:w-1/2 mx-auto text-center">
        <form className="bg-stone-400 p-4 flex flex-col justify-center items-center space-y-4" onSubmit={handleSubmit}> 
            <h2 className="text-center text-xl sm:text-2xl text-stone-50">Add todos below</h2>

            <div className="w-full flex flex-col sm:flex-row items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
            <input type="text" name="todoname" id="todoname" placeholder='Enter todo here' className="bg-stone-50 p-2 rounded w-full" value={todo} onChange={(e)=>setToDo(e.target.value)}/>
            </div>
            
            <button className="bg-blue-900 py-2 px-4 rounded-lg w-full sm:w-auto text-white hover:cursor-pointer hover:bg-blue-600" type='submit'>AddToDo</button>
            </form>
           
            </div>
             <ListToDo todos={todos} fetchData={fetchData}/>
             </>
  )
}
