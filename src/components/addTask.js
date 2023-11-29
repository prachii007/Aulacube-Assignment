import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AddTask = () => {

  const taskList = JSON.parse(localStorage.getItem('todos')) || [];
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskPriority, setTaskPriority] = useState('low')

  const navigate = useNavigate()

  const goToTaskList = () => {
    if (taskName !== "") {
      const taskInfo = {
        name: taskName,
        description: taskDescription,
        priority: taskPriority
      }
      taskList.push(taskInfo);
      localStorage.setItem('todos', JSON.stringify(taskList));
      navigate('/')
    }
  }

  return (
    <div className='text-center mt-5'>
      <h1>Add Task</h1>
      <div>
        <label for='task-name'>Task Name <span>*</span></label>
        <input className='form-control' type='text' id='task-name' onChange={obj => setTaskName(obj.target.value)} />
        <label for='task-description'>Task Description</label>
        <textarea className='form-control' id='task-description' onChange={obj => setTaskDescription(obj.target.value)}></textarea>
        <label for='task-priority'>Priority Level</label>
        <select className='form-select' id='task-priority' onChange={obj => setTaskPriority(obj.target.value)} defaultValue='medium'>
          <option value='low' >Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
        <button onClick={goToTaskList}> Submit</button>
      </div>
    </div>
  )
}
