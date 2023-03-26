import axios from "axios"

function Status({fetchTodoList, task}) {

    
    const changeStatus = (id) => {
        let newStatus = {status: 'Complete'}
        console.log('in changeStatus')
        axios.put(`/todo/${id}/status`, newStatus).then((response) => {
            console.log(response.data)
            fetchTodoList();
        }).catch((error) => {
            console.log(`Error in PUT request ${error}`)
            alert('Something went wrong');
        })
    }

    return (
        <input onClick={() => changeStatus(task.id)} type="checkbox" />
    )
}

export default Status