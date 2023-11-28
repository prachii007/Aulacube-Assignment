import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const TaskList = () => {
  const taskList = useSelector(state => state.AddTaskReducer)
  console.log("taskList", taskList)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToAddTask = () => {
    navigate('/addtask')
  }
  const goToEditTask = () => {
    navigate('/edittask')
  }

  const deleteTask = (index) => {
    const taskInfo = {
      type: "deletetask",
      taskindex: index
    }
    dispatch(taskInfo)
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
              <button onClick={deleteTask.bind(this, index)}>Delete</button>
              <button onClick={goToEditTask.bind(this, index)}>Edit</button>
            </div>
          )
        })
      }
    </div>
  )
}
