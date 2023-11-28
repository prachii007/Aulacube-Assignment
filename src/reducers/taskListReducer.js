import React from 'react'

export const TaskListReducer = (state = [], action) => {

  const alltasks = Object.assign([], state);

  // if (action.type === 'deletetask') {
  //   alltasks.splice(action.taskindex, 1)
  // }
  
  return alltasks;

}
