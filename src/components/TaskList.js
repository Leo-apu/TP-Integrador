import React  from 'react';
import TaskItem from './TaskItem';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskList = ({ tasks, onComplete,onProgress, onDelete }) => {
  return (
    <List>
      {tasks.map((task , index) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={() => onComplete(task.id)}
          onProgress={() => onProgress(task.id)}
          onDelete={() => onDelete(task.id)}
          index={index + 1}
          />
      ))}
    </List>
  );
};

export default TaskList;
