import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TaskForm from './TaskForm'

export const EditTask = () => {

  const taskList = JSON.parse(localStorage.getItem('todos')) || []
  const { id } = useParams()
  const [state, setState] = useState({
    taskName: taskList[id].name,
    taskDescription: taskList[id].description,
    taskPriority: taskList[id].priority,
    taskId: taskList[id].id
  })
  const navigate = useNavigate()

  const handleState = (e) => {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEdit = () => {
    if (state.taskName !== "") {
      const taskInfo = {
        name: state.taskName,
        description: state.taskDescription,
        priority: state.taskPriority,
        isChecked: false,
        id: state.taskId
      }
      taskList.splice(id, 1, taskInfo)
      localStorage.setItem('todos', JSON.stringify(taskList))
      navigate('/')
    }
  }

  return (
    <TaskForm state={state} handleState={handleState} onClick={handleEdit} feature={"Edit"} />
  )
}
