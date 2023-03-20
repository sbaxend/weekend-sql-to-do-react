import axios from 'axios';
import React, { useState } from 'react';
import List from '../List/List.jsx'

const AddTask = () => {
    const [ task , setNewTask] = useState('');
    const [ taskDate , setNewTaskDate ] = useState('');
    const [ taskNotes, setNewTaskNotes] = useState('');
    const [ taskStatus, setNewTaskStatus] = useState('');

    const submitForm = (event) => {

        event.preventdefault();
        axios.post('/todo', {
            task: task,
            due: taskDate,
            notes: taskNotes
            // status: taskStatus
        }).then((response) => {
            setNewTask('');
            setNewTaskDate('');
            setNewTaskNotes('');
            setNewTaskStatus('');
            List;
            console.log('Testing post')
        }).catch((error) => {
            console.log(`Error in Post ${error}`)
            alert('Something Wrong In POST Request')
        })
    }

    return (
        <form onSubmit={submitForm}>
            Task: <input type="text" value={task} onChange={(e) => setNewTask(e.target.value)}/>
            <br />
            Due: <input type="date" value={taskDate} onChange={(e) => setNewTaskDate(e.target.value)}/>
            <br />
            Notes:<input type="text" value={taskNotes} onChange={(e) => setNewTaskStatus(e.target.value)}/>
            <br />
            <input type="submit" />

        </form>

    )
}

export default AddTask;