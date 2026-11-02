import { LOGO_URL } from '../utils/constant.js'; // Importing LOGO_URL from constant.js
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import useOnlineStatus from '../utils/useOnlineStatus.js';
import UserContext from '../utils/UserContext.js';

const Header = ({ isDarkMode, onToggleDarkMode }) => {
  const [btnNameReact, setBtnNameReact] = useState('Login');
  const onlineStatus = useOnlineStatus();

  const data = useContext(UserContext);

  console.log('Default User :', data.loggedInUser);

  console.log('Header Render');

  //*called everytime my component renders
  //*everytime my Header component will render my useEffect will be called
  //* but this dependency array changes the behaviour of this render
  //@ if no dependency array => useEffect is called on every render
  //@ if dependency array is empty = [] => useEffect is called on intial render(just once)
  //@ if dependency array is [btnNameReact] => useEffect called everytime btnNameReact in updated
  useEffect(() => {
    console.log('useEffect called');
  }, []);

  return (
    <div className="mb-2 flex justify-between bg-white text-gray-900 shadow-lg dark:bg-gray-900 dark:text-gray-100">
      <div className="logo-container">
        <img className="w-56" src={LOGO_URL} alt="logo" />
      </div>

      <nav className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status :{onlineStatus ? '✅' : '🔴'}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">{data.loggedInUser}</li>
          <li>
            <button
              type="button"
              className="rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={onToggleDarkMode}
              aria-pressed={isDarkMode}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
          <button
            className="login dark:text-gray-100"
            onClick={() => {
              btnNameReact === 'Login'
                ? setBtnNameReact('Logout')
                : setBtnNameReact('Login');
              //console.log(btnNameReact);
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
