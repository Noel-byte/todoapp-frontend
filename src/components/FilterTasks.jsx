import React from 'react'
import { Button } from './Button'
import { useContext } from 'react'
import AuthContext from './AuthContext'

export const FilterTasks = () => {
  
const {fetchData} = useContext(AuthContext)

  const allTasks = ()=>{
     console.log("all tasks")
    //  load all tasks
    fetchData('all')

  }
  const completedTasks = ()=>{
        fetchData('complete')
  }
  const inCompleteTasks = ()=>{
       fetchData('incomplete')
  }
  return (
    <div className='flex justify-around gap-2'>
        <Button label='All Tasks' onClick={allTasks}/>
        <Button label='Completed Tasks' onClick={completedTasks}/>
        <Button label='Incomplete Tasks' onClick={inCompleteTasks}/>
    </div>
  )
}
