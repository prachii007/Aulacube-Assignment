import React from 'react'

export const AddTaskReducer = (state = [], action) => {

  const alltasks = Object.assign([], state);

  if (action.type === "addtask") {
    alltasks.push(action.info)
  }
  if (action.type === 'deletetask') {
    alltasks.splice(action.taskindex, 1)
  }
  
  return alltasks;
}
