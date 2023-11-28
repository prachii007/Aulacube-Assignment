import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const TaskList = () => {
  const taskList = useSelector(state => state.AddTaskReducer)

  const navigate = useNavigate()

  const goToAddTask = () => {
    navigate('/addtask')
  }
  const goToEditTask = () => {
    navigate('/edittask')
  }
  
  return (
    <div className='text-center mt-5'>
      <h1>Task List</h1>
      <button onClick={goToAddTask}>Add Task</button>
      {
        taskList.map((task, index) => {
          return (
            <div key={index}>
              <input className='form-check-input' type='checkbox' />
              <div>{task.name}</div>
              <div>Incomplete</div>
              <div>{task.priority}</div>
              <button>Delete</button>
              <button onClick={goToEditTask}>Edit</button>
            </div>
          )
        })
      }
    </div>
  )
}
