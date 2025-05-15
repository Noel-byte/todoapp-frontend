// import { useContext } from 'react';
// import AuthContext from './AuthContext';
import { Button } from './Button';
import {NavLink} from 'react-router-dom'
import { FilterTasks } from './FilterTasks';

export const Header = () => {
  // const { message } = useContext(AuthContext);
  return (
<div className='fixed top-0 left-0 right-0 z-50 w-full h-16 flex  py-2 px-2 border-b-white'>
<FilterTasks/>
<span className=' self-center ml-auto font-buttons text-2xl text-stone-50 '>Logout</span>
</div>
  );
};
