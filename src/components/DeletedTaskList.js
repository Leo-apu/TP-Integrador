import React, { Fragment } from "react";
import styled from "styled-components";
import {FaTrash, FaUndo } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const DeletedTaskItemContainer = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  background-color: White;
  text-decoration: none;
  font-weight: bold;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  margin-left: 10px;
  font-size: 20px;

  &:hover {
    background-color: darkgreen;
  }
`;

const DeleteButton = styled.button`
  padding: 12px 20px;
  background-color: #dc5648; 
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  margin-left: 10px;
  font-size: 20px;

  &:hover {
    background-color: #c0392b;
  }
`;

const DeletedTaskName = styled.span`
  font-size: 18px;
`;

const Description = styled.span`
  font-size: 14px;
  color: #d48d12;
`;

const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const DeletedTaskItem = ({ task, onRestore, onDeletePermanently }) => {
  const handleRestore = () => {
    onRestore(task.id);
    showNotificationRestore(
      <div>
        Tarea Restaurada
        <br />
        <br />
        Titulo : {task.name}
      </div>
    );
  };

  const showNotificationRestore = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "info",
    });
  };

  const handleDeletePermanently = () => {
    onDeletePermanently(task.id);
    showNotificationDelete(
      <div>
        Tarea Eliminada Permanentemente
        <br />
        <br />
        Titulo : {task.name}
      </div>
    );
  };
  const showNotificationDelete = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "info",
    });
  };

  return (
    <DeletedTaskItemContainer>
      <TaskContent>
        <DeletedTaskName>{task.name}</DeletedTaskName>
        {task.description && <Description>{task.description}</Description>}
      </TaskContent>
      <Button onClick={handleRestore}>
        <FaUndo />
      </Button>
      <DeleteButton onClick={handleDeletePermanently}>
        <FaTrash />
      </DeleteButton>
    </DeletedTaskItemContainer>
  );
};

const DeletedTaskList = ({ deletedTasks, onRestoreTask ,onDeletePermanently }) => {
  return (
    <Fragment>
      <List>
        {deletedTasks.map((task,index) => (
          <DeletedTaskItem key={index} task={task} onRestore={onRestoreTask} onDeletePermanently={onDeletePermanently}/>
        ))}
      </List>
      <ToastContainer />
    </Fragment>
  );
};

export default DeletedTaskList;
