import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import classes from "./Task.module.css";

const Task = (props) => {
  const [updatedName, setUpdatedName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.editTask(props.id, updatedName);
    setUpdatedName("");
    setIsEditing(false);
  };

  const editingForm = (
    <form className={classes["editting-form"]} onSubmit={handleSubmit}>
      <input
        type="text"
        id={props.id}
        name="new-todo"
        value={updatedName || props.name}
        placeholder="Update task..."
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
  // conditional rendering
  return isEditing ? (
    editingForm
  ) : (
    <div className={classes.task}>
      <div className={classes["task-content"]}>
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.isCompleted}
          onChange={() => props.toggleCompleted(props.id)}
        />
        <label htmlFor={props.id}>
          <p>{props.name}</p>
        </label>
      </div>
      <div className={classes.btns}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          size="xl"
          className={classes.btn}
          onClick={handleClick}
        />
        <FontAwesomeIcon
          className={classes.btn}
          icon={faTrashCan}
          size="xl"
          onClick={() => props.deleteTask(props.id)}
        />
      </div>
    </div>
  );
};

export default Task;
