import React from 'react'
import { useNavigate } from 'react-router-dom'

export const TaskList = () => {
  const navigate = useNavigate()
  const goToAddTask = () => {
    navigate('/addtask')
  }
  return (
    <div className='text-center mt-5'>
      <h1>Task List</h1>
      <button onClick={goToAddTask}>Add Task</button>
    </div>
  )
}
