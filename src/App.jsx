import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { AddToDo } from './components/AddToDo';
import Footer from './components/Footer';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RouteLayout from './components/Route';
import AuthContext from './components/AuthContext';
import {jwt_decode} from 'jwt-decode';
const urlremote = `https://todoapp-backend-900w.onrender.com`
// const urllocal = `http://localhost:5000`;
const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'todos', element: <AddToDo /> },
    ],
  },
]);
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); //true if token exists
  }, []);

  const fetchData = async (status = '') => {

    try {
      const token = localStorage.getItem('token');
      // console.log('this token', token);
      const decoded = jwt_decode(token)
      const userId = decoded.id;
      if (!token) {
        console.warn('No token found, skipping fetchData');
        return; //skip if not logged in
      }
      const welcomeRes = await axios.get(`${urlremote}/`);
      const todosRes = await axios.get(`${urlremote}/api/todos/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('my id -  ', todosRes.data[0].user);
      axios
        .get(`${urlremote}/api/users/${userId}`)
        .then((res) => setUser(res.data.email))
        .catch((err) => console.log('Error fetching user name:', err));

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
    <AuthContext
      value={{
        isAuthenticated,
        setIsAuthenticated,
        todos,
        fetchData,
        message,
        user,
        setUser,
        setTodos
      }}
    >
      <RouterProvider router={router} />
    </AuthContext>
  );
}

export default App;
