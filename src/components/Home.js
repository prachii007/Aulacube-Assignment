import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import SingleTaskCard from './TaskCard'

export const TaskList = () => {
  const tasksFromLS = useMemo(() => {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    return tasks.map(task => ({
      ...task,
      date: new Date(task.date) // Convert date strings back to Date objects
    }));
  }, []);

  const [state, setState] = useState({
    taskList: tasksFromLS,
    showAll: true,
    showUnchecked: false,
    showChecked: false,
    unCheckedTasks: tasksFromLS.filter(x => !x.isChecked),
    checkedTasks: tasksFromLS.filter(x => x.isChecked),
    order: "desc",
    priority: "All"
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


  // console.log('stte', state)

  return (
    <>
      <h1 className='text-center mt-5 mb-0'>Task List</h1>
      <div className='row mx-0'>
        <div className='col-4 '>
          <div className='col-12'>
            <button onClick={goToAddTask} className='mt-5 mb-2 add-task-btn'>Add Task</button>
          </div>
          <div className='btn-group mb-2 col-12'>
            <button className='btn btn-success' onClick={handleShowAll}>Show All</button>
            <button className='btn btn-primary' onClick={handleShowUnchecked}>Show Unchecked</button>
            <button className='btn btn-warning' onClick={handleShowChecked}>Show Checked</button>
          </div>
          <div className='mb-2 d-flex col-12'>
            <div>Sort Order :</div>
            <select className='form-select' value={state.order} onChange={(e) => setState((prev) => ({ ...prev, order: e.target.value }))} >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className='mb-2 d-flex col-12'>
            <div>Priority Order :</div>
            <select className='form-select' value={state.priority} onChange={(e) => setState((prev) => ({ ...prev, priority: e.target.value }))} >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <div className='col-8 '>
          <h2 className='text-center'>{state.showAll ? `Show All (${state.taskList.length})` : state.showChecked ? `Show checked (${state.checkedTasks.length}) ` : `Show Unchecked (${state.unCheckedTasks.length})`}</h2>
          <div className="outer-box">
            {
              (state.showAll ? state.taskList : state.showChecked ? state.checkedTasks : state.unCheckedTasks)
                .sort((a, b) => state.order === "asc" ? a.date - b.date : b.date - a.date) // Dynamic sorting based on order
                .filter((a) => state.priority === "All" || a.priority === state.priority)
                .map((task, index) => (
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
      </div>
    </>

  )
}
