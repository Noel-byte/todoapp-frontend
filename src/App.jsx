import { Header } from "./components/Header"
import { AddToDo } from "./components/AddToDo"
import Footer from "./components/Footer"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [message,setMessage] = useState('')
  const [todos,setTodos] = useState([])

  const fetchData = async (status='')=>{

    try{
      const welcomeRes = await axios.get('https://todoapp-backend-900w.onrender.com')
      const todosRes = await axios.get(`https://todoapp-backend-900w.onrender.com/api/todos/${status}`)
      setMessage(welcomeRes.data)
      setTodos(todosRes.data)
    }catch(err){
      console.error('Error fetching data:',err)
    }
}

  useEffect(()=>{
    fetchData('all')
  },[])

  return (
    <>
     <Header message={message}/>
    <AddToDo todos={todos} fetchData={fetchData}/>
    <Footer/>
    </>
  )
}

export default App
