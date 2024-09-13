import React, { useState } from 'react';
import '../styles/Dashboard.css';


function Dashboard() {
  const [isFormVisible, setFormVisible] = useState(false);  // To control form visibility
  const [todos, setTodos] = useState([
    { title: 'Draft Project Proposal', dueDate: 'Tue Oct 17 2023', completed: false, priority: 'high' },
    { title: 'Take Trash Out', dueDate: 'Wed Oct 18 2023', completed: false, priority: 'medium' },
    { title: 'Get Groceries', dueDate: 'Wed Oct 18 2023', completed: false, priority: 'medium' },
    { title: 'Send Mail', dueDate: 'Wed Oct 18 2023', completed: false, priority: 'low' },
  ]);

  // Form input states
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

  // Open form modal
  const openForm = () => {
    setFormVisible(true);
  };

  // Close form modal
  const closeForm = () => {
    setFormVisible(false);
    resetForm();  // Reset form when closed
  };

  // Toggle task completion
  const toggleCompletion = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // Handle new task form submission
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTitle && newDueDate) { // Basic validation: Ensure title and due date are provided
      const newTask = {
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
        completed: false,
        priority: newPriority,
      };
      setTodos([...todos, newTask]);  // Add the new task to the list
      closeForm();  // Close the form modal after adding
      resetForm();  // Reset the form inputs
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

  return (
    <div className="dashboard">
      
      {/* Header with background color */}
      <header className="app-header">
        <h1>Todo App</h1>
      </header>

      {/* Button to show Add Task form */}
      <div className="task-controls">
        <button className="add-task-button" onClick={openForm}>
          Add Task
        </button>
      </div>

      {/* Task List */}
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
          </div>
        ))}
      </div>
      {/* Modal form popup */}
      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeForm}>&times;</span>
            <h3>Add New Task</h3>
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
              <button type="submit">Add Task</button>
            </form>
          </div>
        </div>
      )}
      <body>
    <div class="main-content">
    </div>
    <footer class="app-footer">
       
    </footer>
</body>
    </div>
    
  );
}

export default Dashboard;
