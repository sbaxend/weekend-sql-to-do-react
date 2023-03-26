import axios from "axios";
import { useState, useEffect } from "react";
import AddTask from "./Add";
import Status from "./Status";
import Delete from "./Delete";
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
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Status</th>
                    <th>Task</th>
                    <th>Notes</th>
                    <th>Due</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    listOfTask.map((task) => (
                        <tr key={task.id}>
                            <td><Status 
                            fetchTodoList={fetchTodoList}
                            task={task}/></td> 
                            <td>{task.status}</td>
                            <td>{task.task}</td>
                            <td>{task.notes}</td>
                            <td>{formatDate(task.due)}</td>
                            <td><Delete 
                            task={task}
                            fetchTodoList={fetchTodoList}/></td>   
                            <td></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>

    )
}

export default TodoList;