import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskForm from './TaskForm'

export const AddTask = () => {

  const taskList = JSON.parse(localStorage.getItem('todos')) || []
  const [state, setState] = useState({
    taskName: "",
    taskDescription: "",
    taskPriority: "Medium",
    taskId: ""
  })
  const navigate = useNavigate()

  const handleState = (e) => {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAdd = () => {
    if (state.taskName !== "") {
      const taskInfo = {
        name: state.taskName,
        description: state.taskDescription,
        priority: state.taskPriority,
        isChecked: false,
        id: new Date().toLocaleTimeString(),
        date: new Date()
      }
      taskList.push(taskInfo)
      localStorage.setItem('todos', JSON.stringify(taskList))
      navigate('/')
    }
  }

  return (
    <TaskForm state={state} handleState={handleState} onClick={handleAdd} feature={"Add"} />
  )
}
