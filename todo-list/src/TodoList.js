import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const sortTasks = (tasks) => {
    return tasks.slice().sort((a, b) => a.text.localeCompare(b.text));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <div>
        <label>
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="completed"
            checked={filter === 'completed'}
            onChange={() => setFilter('completed')}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="incomplete"
            checked={filter === 'incomplete'}
            onChange={() => setFilter('incomplete')}
          />
          Incomplete
        </label>
      </div>
      <ul>
        {sortTasks(filteredTasks).map((task, index) => (
          <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
            <button onClick={() => toggleTaskCompletion(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
