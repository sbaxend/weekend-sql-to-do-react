import axios from "axios";
import { useState, useEffect } from "react";
import AddTask from "./Add";
import Status from "./Status";
import Delete from "./Delete";
import DisplayList from "./DisplayList";
function TodoList({changeStatus}) {
    console.log('Testing TodoList')
    const [listOfTask, setListOfTask] = useState([])
    const [statusOfTask, setStatusOfTask] = useState('')
    const fetchTodoList = () => {
        axios.get("/todo").then((response) => {
            setListOfTask(response.data);
        }).catch((error) => {
            console.log(`Error in GET ${error}`)
            alert('Something went wrong.')
        });
    };
    
    useEffect(() => {
        fetchTodoList();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };

      

    return (
        <div>
        
        <AddTask 
    fetchTodoList={fetchTodoList} />
        <h2>Your Task</h2>
        <DisplayList 
        fetchTodoList={fetchTodoList}
        formatDate={formatDate}
        listOfTask={listOfTask}/>
    </div>

    )
}

export default TodoList;