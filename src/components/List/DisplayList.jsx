import axios from "axios";
import Delete from "./Delete";
import Status from "./Status";

function DisplayList({listOfTask, fetchTodoList,formatDate}) {

    return (
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
    )
}
export default DisplayList;