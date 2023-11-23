import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { IoCheckmark, IoClose } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa'; 
import { TbProgressAlert } from "react-icons/tb";
import { GrInProgress } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskItemContainer = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  background-color: ${({ completed, progress }) => (completed ? '#4caf50' : progress ? 'yellow' : '#0c607bed')};
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  font-weight: bold;
  border-radius: 10px;

  .progress {
    background-color: yellow;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: orange;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px; 
  transition: background-color 0.3s ease; 
  margin-left: 10px;
  font-size: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const TaskButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const TaskName = styled.span`
  font-size: 18px;
`;

const Description = styled.span`
  font-size: 14px;
  color: #d48d12;
`;

const CompletionInfo = styled.span`
  font-size: 12px;
  color: white;
  text-decoration: none;
`;


const TaskItem = ({ task, onComplete,onProgress, onDelete ,index}) => {
  const [completed, setCompleted] = useState(task.completed);

  const [progress, setProgress] = useState(task.progress);

  const toggleComplete = () => {
    setCompleted(!completed);
    if (!completed) {
        setProgress(false);
      }
    onComplete();
    showNotificationComplete(
    <div>
      Tarea {completed ? 'incompleta' : 'completa'}<br /><br/>
      Titulo : {task.name}
    </div>,);
  };

  const toggleProgress = () => {
    setProgress(!progress);
    onProgress();
    showNotificationProgress(
    <div>
      Tarea {!progress ? 'en progreso' : 'no en progreso'}<br/><br/>
      Titulo : {task.name}
    </div>,);
  }

  const handleDelete = () => {
    onDelete();
    showNotificationDelete(
      <div>
      Tarea Eliminada<br/><br/>
      Titulo : {task.name}
    </div>,);
  };

  const showNotificationComplete = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: 'success',
    });
  };

  const showNotificationProgress = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: 'warning',
    });
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
      type: 'error',
    });
  };

  return (
    <Fragment>

      <TaskItemContainer completed={completed} progress={progress}>
        <TaskContent>
          <TaskName>{index}- {task.name}</TaskName>
          {task.description && <Description>{task.description}</Description>}          
        </TaskContent>
        {completed && (
            <CompletionInfo>Completado el: {new Date().toLocaleString()}</CompletionInfo>
          )}
        <TaskButtons>
          <Button onClick={toggleComplete}>
            {completed ? <IoClose /> : <IoCheckmark />}
          </Button>
          <Button onClick={toggleProgress}>
            {progress ? <GrInProgress /> : <TbProgressAlert />}
          </Button>
          <Button onClick={handleDelete}>
            <FaTrash />
          </Button>
        </TaskButtons>
      </TaskItemContainer>
      <ToastContainer />
    </Fragment>
  );
};

export default TaskItem;
