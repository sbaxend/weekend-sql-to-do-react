//import {useState} from 'react';
import TodoList from '../List/List.jsx'
import AddTask from '../List/Add.jsx';
import './App.css'

function App ({fetchTodoList}) {
  
  return (
    <div>
    
      <h1>TO DO APP</h1>
      <TodoList 
      fetchTodoList={fetchTodoList}/>
    </div>
  );

}

export default App
