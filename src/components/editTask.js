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
      <h1>Edit Task</h1>
      <div>
        <label for='task-name'>Task Name <span>*</span></label>
        <input className='form-control' type='text' id='task-name' onChange={obj => setTaskName(obj.target.value)} value={taskName} />
        <label for='task-description'>Task Description</label>
        <textarea className='form-control' id='task-description' onChange={obj => setTaskDescription(obj.target.value)} value={taskDescription}></textarea>
        <label for='task-priority'>Priority Level</label>
        <select className='form-select' id='task-priority' onChange={obj => setTaskPriority(obj.target.value)} value={taskPriority}>
          <option value='low' >Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
        <button onClick={goToTaskList}> Submit</button>
      </div>
    </div>)
}
