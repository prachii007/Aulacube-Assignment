import { combineReducers } from "redux";
import { AddTaskReducer } from "./addTaskReducer";
import { EditTaskReducer } from "./editTaskReducer";
import { TaskListReducer } from "./taskListReducer";

const MainReducer = combineReducers({
    AddTaskReducer, EditTaskReducer, TaskListReducer
})

export default MainReducer;