import React, { useEffect } from "react";
import { useState } from "react";
import NewTask from "./components/NewTask";
import Task from "./components/Task";
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(() => {
    // get stored tasks
    const savedTasks = localStorage.getItem("tasks");
    const initialValue = JSON.parse(savedTasks);
    return initialValue || [];
  });
  const addTodo = (name) => {
    const task = { id: nanoid(), name: name, completed: false };
    setTasks([...tasks, task]);
  };
  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const editTask = (id, name) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, name: name } : task))
    );
  };
  // store todo items in localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const tasksList = tasks.map((task, index) => (
    <Task
      key={index}
      id={task.id}
      name={task.name}
      isCompleted={props.completed}
      toggleCompleted={toggleCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  return (
    <div className="to-do-list">
      <header className="title">To Do List</header>
      <NewTask addTodo={addTodo} />
      {tasks.length > 0 && <div className="items">{tasksList}</div>}
    </div>
  );
}

export default App;
