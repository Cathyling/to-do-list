import React from "react";

import { useState } from "react";
import classes from "./NewTask.module.css";

const NewTask = (props) => {
  const [newTask, setNewTask] = useState("");
  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTodo(newTask);
    setNewTask("");
  };
  return (
    <form className={classes["task-form"]} onSubmit={handleSubmit}>
      <input
        type="text"
        id="new-todo"
        name="new-todo"
        value={newTask}
        placeholder="Add new task..."
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewTask;
