// import { useContext } from 'react';
// import AuthContext from './AuthContext';
import { Button } from './Button';
import {NavLink} from 'react-router-dom'
import { FilterTasks } from './FilterTasks';
// import axios from 'axios';
import { useContext} from 'react';
import AuthContext from './AuthContext';

export const Header = () => {
  const { user,isAuthenticated} = useContext(AuthContext);

  return (
<div className='fixed bg-button top-0 left-0 right-0 z-50 w-full h-16 flex  py-3 px-2 border-b-white/20 border-1'>
     {isAuthenticated?<FilterTasks/>:''}

<div className="flex items-center ml-auto space-x-3">
  <div className="w-10 h-10 rounded-full bg-stone-600 text-white flex items-center justify-center font-bold text-lg hover:cursor-pointer">
    {user?.charAt(0).toUpperCase()}
  </div>
  <span className="font-buttons text-lg text-stone-50">{user}</span>
</div>
 
</div>
  );
};
