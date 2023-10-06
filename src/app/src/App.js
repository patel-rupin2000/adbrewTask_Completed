import './App.css';
import React, {useState, useEffect} from "react";

export function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/todos/')  
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
    // console.log(todos);
  }, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodo }), 
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error adding todo:', error));
      window.location.reload(true);
      // console.log(JSON.stringify({ text: newTodo }));
  };

  return (
    <div className="App">
      <div style={{textAlign:"center"}}>
        <h1>List of TODOs</h1>
         <ul style={{display:"inline-block", textAlign:"left"}}>
          {todos.map((todo) => (
            <li key={todo.id}><span style={{position: 'relative', left: -10}}>{todo.text}</span></li>
          ))}
        </ul>
        {/* <li>Learn Docker</li>
        <li>Learn React</li> */}
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={handleAddTodo}>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input
              type="text"
              id="todo"
              value={newTodo}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginTop: '5px' }}>
            <button type="submit">Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
