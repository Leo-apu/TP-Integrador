import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 20px;

  display: flex;
    align-items: center;
    justify-content: center;

  input {
    padding: 8px;
    margin-right: 10px;
    border-radius: 10px;
  }

`;
const Button = styled.button`
  padding: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: ##217b0b;
    color: black;
  }
`;

const TaskForm = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (taskName.trim() !== '') {
      onSubmit(taskName, taskDescription);
      setTaskName('');
      setTaskDescription('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        placeholder="Agregar Titulo"
      />
      <input
        type="text"
        value={taskDescription}
        onChange={e => setTaskDescription(e.target.value)}
        placeholder="Agregar Descripcion"
      />
      <Button className='btnForm' type="submit">Agregar Tarea</Button>
    </Form>
  );
};

export default TaskForm;