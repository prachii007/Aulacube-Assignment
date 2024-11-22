import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import SingleTaskCard from './TaskCard'

export const TaskList = () => {
  const tasksFromLS = useMemo(() => {
    return JSON.parse(localStorage.getItem('todos')) || []
  }, [])
  const [state, setState] = useState({
    taskList: tasksFromLS,
    showAll: true,
    showUnchecked: false,
    showChecked: false,
    unCheckedTasks: tasksFromLS.filter(x => !x.isChecked),
    checkedTasks: tasksFromLS.filter(x => x.isChecked)
  })

  const navigate = useNavigate()

  const handleCheckboxChange = (id) => {
    const updatedTasks = [...state.taskList] // Create a copy of the task list
    const taskIndex = updatedTasks.findIndex(task => task.id === id) // Find the index of the task with the matching id
    if (taskIndex !== -1) { // Ensure the task is found
      updatedTasks[taskIndex].isChecked = !updatedTasks[taskIndex].isChecked // Toggle isChecked
      setState((prev) => ({
        ...prev,
        taskList: updatedTasks,
        unCheckedTasks: updatedTasks.filter(x => !x.isChecked),
        checkedTasks: updatedTasks.filter(x => x.isChecked)
      }))
      localStorage.setItem('todos', JSON.stringify(updatedTasks)) // Update localStorage
    } 
  }

  const goToAddTask = () => {
    navigate('/addtask')
  }

  const goToEditTask = (index) => {
    navigate(`/edittask/${index}`)
  }

  const deleteTask = (id) => {
    const updatedTasks = state.taskList.filter(x => x.id !== id)
    setState((prev) => ({
      ...prev,
      taskList: updatedTasks,
      unCheckedTasks: updatedTasks.filter(x => !x.isChecked) || [],
      checkedTasks: updatedTasks.filter(x => x.isChecked) || []
    }))
    localStorage.setItem('todos', JSON.stringify(updatedTasks))
  }

  const handleShowAll = () => {
    setState((prev) => ({
      ...prev,
      showAll: true,
      showChecked: false,
      showUnchecked: false
    }))
  }
  const handleShowChecked = () => {
    setState((prev) => ({
      ...prev,
      checkedTasks: state.taskList.filter(x => x.isChecked) || [],
      showChecked: true,
      showAll: false,
      showUnchecked: false
    }))
  }
  const handleShowUnchecked = () => {
    setState((prev) => ({
      ...prev,
      unCheckedTasks: state.taskList.filter(x => !x.isChecked) || [],
      showUnchecked: true,
      showChecked: false,
      showAll: false,
    }))
  }

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      taskList: tasksFromLS || [],
      unCheckedTasks: tasksFromLS.filter(x => !x.isChecked) || [],
      checkedTasks: tasksFromLS.filter(x => x.isChecked) || []
    }))
  }, [tasksFromLS])

  return (
    <div className='text-center mt-5'>
      <h1>Task List</h1>
      <button onClick={goToAddTask} className='my-5 add-task-btn'>Add Task</button>
      <br />
      <div className='btn-group mb-5'>
        <button className='btn btn-success' onClick={handleShowAll}>Show All</button>
        <button className='btn btn-primary' onClick={handleShowUnchecked}>Show Unchecked</button>
        <button className='btn btn-warning' onClick={handleShowChecked}>Show Checked</button>
      </div>
      <h2>{state.showAll ? "Show All" : state.showChecked ? "Show checked" : "Show Unchecked"}</h2>
      <div className="outer-box">
        {
          (state.showAll ? state.taskList : state.showChecked ? state.checkedTasks : state.unCheckedTasks).map((task, index) => (
            <SingleTaskCard
              key={index}
              index={index}
              handleCheckboxChange={handleCheckboxChange}
              goToEditTask={goToEditTask}
              deleteTask={deleteTask}
              task={task}
            />
          ))
        }
      </div>
    </div>
  )
}
