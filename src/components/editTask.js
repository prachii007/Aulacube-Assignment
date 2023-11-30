import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const EditTask = () => {

  const taskList = JSON.parse(localStorage.getItem('todos')) || []
  const { id } = useParams()

  const [taskName, setTaskName] = useState(taskList[id].name)
  const [taskDescription, setTaskDescription] = useState(taskList[id].description)
  const [taskPriority, setTaskPriority] = useState(taskList[id].priority)

  const navigate = useNavigate()

  const goToTaskList = () => {
    if (taskName !== "") {
      const taskInfo = {
        name: taskName,
        description: taskDescription,
        priority: taskPriority,
      }
      taskList.splice(id, 1, taskInfo)
      localStorage.setItem('todos', JSON.stringify(taskList))
      navigate('/')
    }
  }

  return (
    <div className='text-center mt-5'>
      <h1 className='my-5'>Edit Task</h1>
      <div className='task-div'>
        <div className='mb-5 row'>
          <label htmlFor='task-name' className='mb-2'>Task Name <span className='text-danger'>*</span></label>
          <input className='form-control' type='text' id='task-name' onChange={obj => setTaskName(obj.target.value)} value={taskName} />
        </div>
        <div className='mb-5 row'>
          <label htmlFor='task-description' className='mb-2'>Task Description</label>
          <textarea className='form-control' id='task-description' onChange={obj => setTaskDescription(obj.target.value)} value={taskDescription} rows={5} placeholder='Write description of your task in detail here..'></textarea>
        </div>
        <div className='mb-5 row'>
          <label htmlFor='task-priority' className='mb-2'>Priority Level</label>
          <select className='form-select' id='task-priority' onChange={obj => setTaskPriority(obj.target.value)} value={taskPriority}>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </div>
        <button onClick={goToTaskList} className='submit-button'> Submit</button>
      </div>
    </div>)
}
