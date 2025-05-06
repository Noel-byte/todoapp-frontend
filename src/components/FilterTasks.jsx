import React from 'react'
import { Button } from './Button'

export const FilterTasks = ({fetchData}) => {
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
