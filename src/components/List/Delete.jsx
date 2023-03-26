import axios from "axios";

function Delete({task, fetchTodoList}) {
  const deleteTask = (id) => {
    console.log("in deleteTask");
    axios
      .delete(`/todo/${id}`)
      .then((response) => {
        console.log(response);
        fetchTodoList();
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong.");
      });
  };

  return <button onClick={() => deleteTask(task.id)}>Remove</button>;
}

export default Delete;
