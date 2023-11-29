import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const TaskList = () => {

  const savedDataFromLocalStorage = JSON.parse(localStorage.getItem('todos')) || []

  const [taskList, setTasklist] = useState(savedDataFromLocalStorage || [])
  const [counter, SetCounter] = useState(0);

  const navigate = useNavigate()

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...taskList]
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked
    localStorage.setItem('todos', JSON.stringify(updatedTasks));
    setTasklist(updatedTasks);
    // setIsChecked(!isChecked)
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
      <button onClick={goToAddTask} className='my-5 add-task-btn'>Add Task</button>
      <table className='task-div'>
        <thead>
          <tr>
            <td colSpan={2}>Tasks To Do</td>
            <td>Status</td>
            <td>Priority</td>
            <td colSpan={2}>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            taskList.map((task, index) => {
              return (
                <tr key={index} className=''>
                  <td>
                    <input className='form-check-input' type='checkbox' checked={task.isChecked || false} onChange={() => handleCheckboxChange(index)} />
                  </td>
                  <td style={{ textDecoration: task.isChecked ? 'line-through' : 'none' }}>{task.name}</td>
                  <td className={task.isChecked ? 'text-success' : 'text-danger'}>
                    {task.isChecked ? "Complete" : "Incomplete"}
                  </td>
                  <td className={task.priority==='Low'?'bg-success':task.priority==='Medium'? 'bg-warning':'bg-danger'}>
                    {task.priority}
                  </td>
                  <td>
                    <button onClick={goToEditTask.bind(this, index)} disabled={task.isChecked} className='btn btn-info'>Edit</button>
                  </td>
                  <td>
                    <button onClick={deleteTask.bind(this, index)} disabled={task.isChecked} className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
