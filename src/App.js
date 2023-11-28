import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Routes , Link} from 'react-router-dom';
import DeletedTaskList from './components/DeletedTaskList';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: black;
  padding: 20px;

  .pestaña {
    text-decoration: none;
    color: white;
    background-color: #4f0d53;
    padding: 5px;
    border-radius: 2px;
    text-align: center;
  }

  .active {
    text-decoration: none;
    color: white;
    background-color: #9351ca;
    padding: 5px;
    border-radius: 2px;
    text-align: center;
  }

`;

const Card = styled.div`
  width: 60%;
  background-color: #930366ed;
  padding: 20px;
  box-shadow: 0px 0px 15px 8px #7e7e7e;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  text-align: center;
  color: white;
  margin: 1rem 0 1rem 0;
`;

const App = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const storedDeletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];

  const [tasks, setTasks] = useState(storedTasks);
  const [deletedTasks, setDeletedTasks] = useState(storedDeletedTasks);

  const [active,setActive] = useState(true);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
  }, [deletedTasks]);

  useEffect(() => {
    setActive(window.location.pathname === '/' ? true : false);
  }, []);

  const handleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: !task.completed , progress: false };
          console.log('Tarea actualizada:', updatedTask);
          return updatedTask;
        } else {
          return task;
        }
      })
    );
  };
  
  const handleProgress = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, progress: !task.progress };
          console.log('Tarea Progresada:', updatedTask);
          return updatedTask;
        } else {
          return task;
        }
      })
    );
  }

  const handleDelete = (taskId) => {
    const deletedTask = tasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setDeletedTasks((prevDeletedTasks) => [...prevDeletedTasks, deletedTask]);
  };
  
  const handleDeletePerm = (taskId) => {
    setDeletedTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = (taskName, taskDescription) => {
    const newTask = {
      id: generateUniqueId(),
      name: taskName,
      description: taskDescription,
      completed: false,
      progress: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

    const generateUniqueId = () => {
      return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    };

  const handleRestoreTask = (taskId) => {
    const restoredTask = deletedTasks.find((task) => task.id === taskId);

    setDeletedTasks((prevDeletedTasks) =>
      prevDeletedTasks.filter((task) => task.id !== taskId)
    );

    setTasks((prevTasks) => [...prevTasks, restoredTask]);
  };


  return (
    <AppContainer>
      <Title>TAREAS</Title>
      <Card>
        <TaskForm onSubmit={handleAddTask} />
        <Router>
          <div style={{ display: 'flex', justifyContent: 'center' , marginTop: '20px' , gap: '1px' }}>
            <Link className={`pestaña ${active === true && 'active'}`} onClick={() => setActive(true)} to='/' >Tareas</Link>
            <Link className={`pestaña ${active === false && 'active'}`} onClick={() => setActive(false)} to='/deleted' >Tareas Eliminadas</Link>
          </div>
            <Routes>
              <Route path="/deleted" element={<DeletedTaskList deletedTasks={deletedTasks} onRestoreTask={handleRestoreTask} onDeletePermanently={handleDeletePerm}/>} />
              <Route path="/" element={<TaskList tasks={tasks} onComplete={handleComplete} onProgress={handleProgress} onDelete={handleDelete} />} />
          </Routes>
        </Router>        
      </Card>
    </AppContainer>
  );
};

export default App;
