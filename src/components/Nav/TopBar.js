import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useStateContext } from '../Context/ContextProvider';
import { MdOutlineKeyboardArrowDown, MdLogout } from 'react-icons/md';


const Navbar = () => {
  const { activeMenu, setActiveMenu, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  // logout
  const signOut = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  // // getting current user
  // const currentUser = window.localStorage.getItem('token');
  // const user = JSON.parse(currentUser).data;

  return (
    <main className='topnav'>
      <div className='flex justify-between items-center p-1 shadow-md'>
        <div className='text-xl p-2 hover:cursor-pointer'>
          <button className='text-[#0E6F1E]' onClick={handleActiveMenu}><AiOutlineMenu /></button>
        </div>
        <div className='flex space-x-5'>
          <h4><b>Logged In As: KIMATHI</b></h4>
          <button onClick={signOut} className=''>Logout</button>
        </div>
      </div>
    </main>
  );
};

export default Navbar;