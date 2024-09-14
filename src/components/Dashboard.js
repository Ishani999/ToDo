import React, { useState } from 'react';
import '../styles/Dashboard.css';
import { useAuth } from '../context/AuthContext';



// Helper functions to interact with localStorage
const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

function Dashboard() {
  const { user, logout } = useAuth();
  const [isFormVisible, setFormVisible] = useState(false);
  const [todos, setTodos] = useState(loadTodosFromLocalStorage());

  // Form input states
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [editIndex, setEditIndex] = useState(null); // Index for editing task

  // Open form modal
  const openForm = () => {
    setFormVisible(true);
  };

  // Close form modal
  const closeForm = () => {
    setFormVisible(false);
    resetForm();
    setEditIndex(null); // Reset edit index when closing
  };

  // Toggle task completion
  const toggleCompletion = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    saveTodosToLocalStorage(newTodos);
  };

  // Handle new task form submission
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTitle && newDueDate) {
      const newTask = {
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
        completed: false,
        priority: newPriority,
      };
      if (editIndex !== null) {
        // Update existing task
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTask;
        setTodos(updatedTodos);
      } else {
        // Add new task
        setTodos([...todos, newTask]);
      }
      saveTodosToLocalStorage(todos);
      closeForm();
      resetForm();
    } else {
      alert("Please fill in both title and due date!");
    }
  };

  // Reset form inputs
  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewDueDate('');
    setNewPriority('medium');
  };

  // Edit task
  const handleEditTask = (index) => {
    setNewTitle(todos[index].title);
    setNewDescription(todos[index].description);
    setNewDueDate(todos[index].dueDate);
    setNewPriority(todos[index].priority);
    setEditIndex(index);
    openForm();
  };

  // Delete task
  const handleDeleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  return (
    <div className="page-container">
      <header className="app-header">
        <h1>Todo App</h1>
      </header>

      <div className="main-content">
        <div className="task-controls">
          <button className="add-task-button" onClick={openForm}>
            Add Task
          </button>
        </div>

        <div className="task-list">
          {todos.map((todo, index) => (
            <div 
              className={`task-item ${todo.completed ? 'completed' : ''}`} 
              key={index}
            >
              <input 
                type="checkbox" 
                id={`checkbox-${index}`} 
                checked={todo.completed} 
                onChange={() => toggleCompletion(index)} 
              />
              <label htmlFor={`checkbox-${index}`} className="custom-checkbox"></label>
              <span className={`task-title ${todo.completed ? 'completed' : ''}`}>
                {todo.title}
              </span>
              <span className="task-date">{todo.dueDate}</span>
              <span className={`priority-dot ${todo.priority}`}></span>
              <div className="task-actions">
                <button onClick={() => handleEditTask(index)} className="task-action-btn edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(index)} className="task-action-btn delete-btn">
                 Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {isFormVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeForm}>&times;</span>
              <h3>{editIndex !== null ? 'Edit Task' : 'Add New Task'}</h3>
              <form onSubmit={handleAddTask}>
                <input 
                  type="text" 
                  placeholder="Title" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <div className="date-input-container">
                  <input 
                    type="text" 
                    placeholder="Description" 
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <input 
                  type="date" 
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
                <select 
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <button type="submit">{editIndex !== null ? 'Update Task' : 'Add Task'}</button>
              </form>
            </div>
          </div>
        )}
      </div>

      <footer className="app-footer">
       
      </footer>
    </div>
  );
}

export default Dashboard;
