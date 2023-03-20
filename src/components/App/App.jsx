//import {useState} from 'react';
import TodoList from '../List/List.jsx'
import AddTask from '../Add/Add.jsx';
import './App.css'

function App () {
  
  return (
    <div>
    
      <h1>TO DO APP</h1>
      <AddTask />
      <TodoList />
    </div>
  );

}

export default App
