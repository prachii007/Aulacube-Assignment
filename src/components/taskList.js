import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const TaskList = () => {

  const savedDataFromLocalStorage = JSON.parse(localStorage.getItem('todos')) || []

  const [taskList, setTasklist] = useState(savedDataFromLocalStorage || [])
  const [counter, SetCounter] = useState(0);
  const [isChecked, setIsChecked] = useState(false)

  const navigate = useNavigate()

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const goToAddTask = () => {
    navigate('/addtask')
  }

  const goToEditTask = (index) => {
    navigate(`/edittask/${index}`)
  }

  const deleteTask = (index) => {
    taskList.splice(index, 1);
    SetCounter((counter) => counter + 1)
    localStorage.setItem('todos', JSON.stringify(taskList));
    setTasklist(taskList)
  }

  return (
    <div className='text-center mt-5'>
      <h1>Task List</h1>
      <button onClick={goToAddTask}>Add Task</button>
      {
        taskList.map((task, index) => {
          return (
            <div key={index}>
              <input className='form-check-input' type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
              <div style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{task.name}</div>
              <div>{isChecked ? "Complete" : "Incomplete"}</div>
              <div>{task.priority}</div>
              <button onClick={deleteTask.bind(this, index)} disabled={isChecked}>Delete</button>
              <button onClick={goToEditTask.bind(this, index)} disabled={isChecked}>Edit</button>
            </div>
          )
        })
      }
    </div>
  )
}
