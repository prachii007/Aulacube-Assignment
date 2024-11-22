import './App.css';
import { TaskList } from './components/Home';
import { AddTask } from './components/AddTask';
import { EditTask } from './components/EditTask';
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
