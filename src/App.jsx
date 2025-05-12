import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { AddToDo } from './components/AddToDo';
import Footer from './components/Footer';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); //true if token exists
  }, []);

  const fetchData = async (status = '') => {
    try {
      const token = localStorage.getItem('token');
      console.log('this token', token);
      if (!token) {
        console.warn('No token found, skipping fetchData');
        return; //skip if not logged in
      }
      const welcomeRes = await axios.get(
        'https://todoapp-backend-900w.onrender.com/'
      );
      const todosRes = await axios.get(
        `https://todoapp-backend-900w.onrender.com/api/todos/${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(welcomeRes.data);
      setTodos(todosRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData('all');
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              fetchData={fetchData}
            />
          }
        />
        <Route
          path="/todos"
          element={
            isAuthenticated ? (
              <>
                <Header message={message} />
                <AddToDo todos={todos} fetchData={fetchData} />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? '/todos' : '/login'} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
