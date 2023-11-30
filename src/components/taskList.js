import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SingleTaskCard from './singleTaskCard'

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
      <div className='outer-box'>
          {
            taskList.map((task, index) => {
              return (
                <SingleTaskCard
                  key={index}
                  index={index}
                  handleCheckboxChange={handleCheckboxChange}
                  goToEditTask={goToEditTask}
                  deleteTask={deleteTask}
                  task={task} />
              )
            })
          }
      </div>
    </div>
  )
}
