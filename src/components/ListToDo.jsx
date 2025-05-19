// import axios from 'axios';
import { useContext} from 'react';
// import done from '../assets/done.png';
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import AuthContext from './AuthContext';
import { TodoItem } from './TodoItem';

// const urlremote = `https://todoapp-backend-900w.onrender.com`;
// const urllocal = `http://localhost:5000`;

export const ListToDo = () => {
  const { todos} = useContext(AuthContext);

  return (
    <div className="pt-60 ">
      {todos.map((todo) => (
      <TodoItem todo={todo}/>
      ))}
    </div>
  );
};
