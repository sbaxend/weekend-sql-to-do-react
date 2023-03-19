import axios from "axios";
import { useState, useEffect } from "react";
function TodoList() {
    console.log('Testing TodoList')
    const [listOfTask, setListOfTask] = useState([])
    cosnt [stausOfTask, setStatusOfTask]
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
                            <td><input type="checkbox" name="task1" value="completed"></input></td>
                            <td>{task.status}</td>
                            <td>{task.task}</td>
                            <td>{task.notes}</td>
                            <td>{formatDate(task.due)}</td>
                            <td></td>             
                            <td><button>Remove</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>

    )
}

export default TodoList;