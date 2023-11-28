import React from 'react'

export const AddTaskReducer = (state = [], action) => {

  const alltasks = Object.assign([], state);

  if (action.type === "addtask") {
    alltasks.push(action.info)
  }
  else if (action.type === 'deletetask') {
    alltasks.splice(action.taskindex, 1)
  }
  else if (action.type === 'edittask') {
    alltasks.splice(action.taskindex, 1, action.info)
  }
  return alltasks;
}
