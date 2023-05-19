import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faCheck, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './TodoApp.css';

const TodoApp = () => {
  // State variables
  const [tasks, setTasks] = useState([]); // Array to store tasks
  const [newTask, setNewTask] = useState(''); // Input value for adding new tasks
  const [editingTaskIndex, setEditingTaskIndex] = useState(-1); // Index of the task being edited (-1 when not in editing mode)
  const [editedTaskName, setEditedTaskName] = useState(''); // Input value for edited task name
  const [filter, setFilter] = useState('all'); // Filter value for displaying tasks

  // Event handlers
  const handleInputChange = (e) => {
    setNewTask(e.target.value); // Update input value for adding new tasks
  };

  const handleAddTask = () => {
    // Add a new task to the tasks array
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { name: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask(''); // Clear the input value after adding a task
    }
  };

  const handleEditTask = (index) => {
    // Start editing a task by setting the editingTaskIndex and setting the editedTaskName
    setEditingTaskIndex(index);
    setEditedTaskName(tasks[index].name);
  };

  const handleSaveTask = () => {
    // Save the edited task by updating the tasks array
    if (editedTaskName.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex].name = editedTaskName;
      setTasks(updatedTasks);
      setEditingTaskIndex(-1); // Exit editing mode
      setEditedTaskName(''); // Clear the editedTaskName value
    }
  };

  const handleCancelEdit = () => {
    // Cancel editing a task by resetting the editingTaskIndex and editedTaskName
    setEditingTaskIndex(-1);
    setEditedTaskName('');
  };

  const handleDeleteTask = (index) => {
    // Delete a task from the tasks array
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (index) => {
    // Toggle the completion status of a task
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleFilterChange = (e) => {
    // Update the filter value for displaying tasks
    setFilter(e.target.value);
  };

  // Filter tasks based on the selected filter value
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.completed;
    } else {
      return !task.completed;
    }
  });

  const clearCompletedTasks = () => {
    // Clear completed tasks from the tasks array
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      {/* Header */}
      <header className="todo-app__header">
        <h1 className="todo-app__title">Todo App</h1>
      </header>

      {/* Content */}
      <div className="todo-app__content">
        {/* Input container */}
        <div className="todo-app__input-container">
          <input
            className="todo-app__input"
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Enter a new task"
          />
          <button className="todo-app__button" onClick={handleAddTask}>
            <FontAwesomeIcon icon={faPlus} /> Add Task
          </button>
        </div>

        {/* Filter container */}
        <div className="todo-app__filter-container">
          <label className="todo-app__filter-label">Filter by:</label>
          <select
            className="todo-app__filter-select"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        {/* Task list */}
        <ul className="todo-app__task-list">
          {filteredTasks.map((task, index) => (
            <li className={`todo-app__task ${task.completed ? 'completed' : ''}`} key={index}>
              {/* Checkbox and task name */}
              <input
                className="todo-app__task-checkbox"
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
              />
              {editingTaskIndex === index ? (
                // When in editing mode
                <>
                  <input
                    className="todo-app__task-input"
                    type="text"
                    value={editedTaskName}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                  />
                  <div className="todo-app__task-buttons">
                    <button className="todo-app__task-button" onClick={handleSaveTask}>
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button className="todo-app__task-button" onClick={handleCancelEdit}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </>
              ) : (
                // When not in editing mode
                <>
                  <span className="todo-app__task-name">{task.name}</span>
                  <div className="todo-app__task-buttons">
                    <button className="todo-app__task-button" onClick={() => handleEditTask(index)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="todo-app__task-button" onClick={() => handleDeleteTask(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Clear completed tasks button */}
        <button className="todo-app__clear-button" onClick={clearCompletedTasks}>
          <FontAwesomeIcon icon={faCheck} /> Clear Completed Tasks
        </button>
      </div>

      {/* Footer */}
      <footer className="todo-app__footer">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default TodoApp;
