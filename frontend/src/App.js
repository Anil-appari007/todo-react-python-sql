import React, { useState, useEffect } from "react";
import axios from "axios";

const API_HOST = process.env.BACKEND_API_HOST || "localhost";
const API_PORT = process.env.BACKEND_API_PORT || "8000";
const API_URL = `http://${API_HOST}:${API_PORT}`;

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const login = async () => {
    const res = await axios.post(`${API_URL}/token`, new URLSearchParams({
      username, password
    }));
    setToken(res.data.access_token);
  };

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post(`${API_URL}/tasks/`, null, {
      params: { title: newTask },
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const updateTask = async (task) => {
    await axios.put(`${API_URL}/tasks/${task.id}`, null, {
      params: { title: task.title, completed: !task.completed },
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>To-Do List</h2>
      <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
              {t.title}
            </span>
            <button onClick={() => updateTask(t)}>Toggle</button>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
