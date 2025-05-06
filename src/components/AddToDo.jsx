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

                  //add it to the database
                  axios.post('https://todoapp-backend-900w.onrender.com/api/todos', {text:todo})
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
   
    <div className=' p-8 bg-stone-200 mt-2 w-1/2 m-auto  text-center'>
        <form className='bg-stone-400 p-3  flex-column justify-center items-center space-y-4' onSubmit={handleSubmit}> 
            <h2 className=' text-center text-2xl text-stone-50'>Add As many todo's as you wish</h2>

            <div className='mt-2'>
            <label htmlFor="todoname" className= ' font-bold'>what to do</label>
            <input type="text" name="todoname" id="todoname" placeholder='Enter todo here' className=' bg-stone-50 p-2 rounded ml-2' value={todo} onChange={(e)=>setToDo(e.target.value)}/>
            </div>
            
            <button className=' bg-blue-900  py-2 px-4 rounded-lg w-50   m-auto text-white hover:cursor-pointer hover:bg-blue-600' type='submit'>AddToDo</button>
            </form>
           
            </div>
             <ListToDo todos={todos} fetchData={fetchData}/>
             </>
  )
}
