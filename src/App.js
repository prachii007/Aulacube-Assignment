import './App.css';
import { TaskList } from './components/taskList';
import { AddTask } from './components/addTask';
import { EditTask } from './components/editTask';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<TaskList />} />
        <Route exact path='/addtask' element={<AddTask />} />
        <Route exact path='/edittask/:id' element={<EditTask />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
