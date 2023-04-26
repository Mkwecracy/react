import './App.css';

import React, { useState } from 'react';

function CompletedTasks({ completedTasks, handleDeleteCompleted }) {
  return (
    <div>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task, index) => (
          <li key={index}>
            {task.task}
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteCompleted}>Delete Completed</button>
    </div>
  );
}

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  

  const handleAddTask = () => {
    if (newTask === '') {
      alert('Task is required');
    } else {
      setTasks([...tasks, { task: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleCheckboxChange = (index) => {
    const task = tasks[index];
    if (task.completed) {
      // If the task is already completed, do nothing
      return;
    }
    if (handleShowCompleted) {
       //If the "Completed" tab is currently active, add the completed task to the completedTasks state
      setCompletedTasks(completedTasks.concat(task));
    }
    // Remove the task from the tasks state
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  
  
  const handleDeleteCompleted = () => {
    setCompletedTasks([]);
  };

  const handleShowCompleted = () => {
    setShowCompletedTasks(true);
  };

  const handleShowNew = () => {
    setShowCompletedTasks(false);
  };

  const filteredTasks = showCompletedTasks ? completedTasks : tasks;

  return (
    <div className='app'>
      <div className='container'>
      <h1>Todo List</h1>
      <div className='tbox'> 
      <input type="text" id='textbox' value={newTask} onChange={e => setNewTask(e.target.value)} />
      <button onClick={handleAddTask}>Add</button>
      </div>
      <div className='btn'>
      <button className='new' onClick={handleShowNew}>New</button>
      <button className='completed' onClick={handleShowCompleted}>Completed</button>
      </div>
      {filteredTasks.length > 0 ? (
        <ul>
          {filteredTasks.map((task, index) => (
           <li key={index}>
              <input type="checkbox" checked={task.completed} onChange={() => handleCheckboxChange(index)} />
              {task.task}
            </li>
          ))}
       </ul>
      ) : (
       <p>{showCompletedTasks ? 'Nothing completed' : 'Nothing planned'}</p>
      )}
      
      {showCompletedTasks && <CompletedTasks completedTasks={completedTasks} handleDeleteCompleted={handleDeleteCompleted} />}
    </div>
    </div>
  );
}

export default App;
