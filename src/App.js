import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: black;
  padding: 20px;
`;

const Card = styled.div`
  width: 60%;
  background-color: #0c607bed;
  padding: 20px;
  box-shadow: 0px 0px 20px 12px #ea770b;
  margin-top: 20px;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: white;
`;

const App = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(storedTasks);

  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = (taskName, taskDescription) => {
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      name: taskName,
      description: taskDescription,
      completed: false,
      progress: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <AppContainer>
      <Card>
        <Title>TAREAS</Title>
        <TaskForm onSubmit={handleAddTask} />
        <TaskList tasks={tasks} onComplete={handleComplete} onProgress={handleProgress} onDelete={handleDelete} />
      </Card>
    </AppContainer>
  );
};

export default App;
