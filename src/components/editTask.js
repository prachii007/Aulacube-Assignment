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
          <label for='task-name' className='mb-2'>Task Name <span className='text-danger'>*</span></label>
          <input className='form-control' type='text' id='task-name' onChange={obj => setTaskName(obj.target.value)} value={taskName} />
        </div>
        <div className='mb-5 row'>
          <label for='task-description' className='mb-2'>Task Description</label>
          <textarea className='form-control' id='task-description' onChange={obj => setTaskDescription(obj.target.value)} value={taskDescription}></textarea>
        </div>
        <div className='mb-5 row'>
          <label for='task-priority' className='mb-2'>Priority Level</label>
          <select className='form-select' id='task-priority' onChange={obj => setTaskPriority(obj.target.value)} value={taskPriority}>
            <option value='low' >Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <button onClick={goToTaskList} className='btn btn-primary'> Submit</button>
      </div>
    </div>)
}
