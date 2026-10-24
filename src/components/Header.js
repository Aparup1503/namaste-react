import { LOGO_URL } from '../utils/constant.js'; // Importing LOGO_URL from constant.js
import { useEffect, useState } from 'react';

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState('Login');

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
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="logo" />
      </div>

      <nav className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button
            className="login"
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
