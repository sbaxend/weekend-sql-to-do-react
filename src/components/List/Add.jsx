import axios from 'axios';
import React, { useState } from 'react';
import List from './List.jsx'

const AddTask = ({fetchTodoList}) => {
    const [ newTask , setNewTask] = useState('');
    const [ taskDate , setNewTaskDate ] = useState('');
    const [ taskNotes, setNewTaskNotes] = useState('');
    // const [ taskStatus, setNewTaskStatus] = useState('');

    const submitForm = (event) => {
        event.preventDefault();
        console.log('In Post Request')
        axios.post('/todo', {
            task: newTask,
            due: taskDate,
            notes: taskNotes
            // status: taskStatus
        }).then((response) => {
            setNewTask('');
            setNewTaskDate('');
            setNewTaskNotes('');
            fetchTodoList();
            console.log('Testing post')
        }).catch((error) => {
            console.log(`Error in Post ${error}`)
            alert('Something Wrong In POST Request')
        })
    }

    return (
        <form onSubmit={submitForm}>
            Task: <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
            <br />
            Due: <input type="date" value={taskDate} onChange={(e) => setNewTaskDate(e.target.value)}/>
            <br />
            Notes: <input type="text" value={taskNotes} onChange={(e) => setNewTaskNotes(e.target.value)}/>
            <br />
            <input type="submit" />

        </form>

    )
}

export default AddTask;