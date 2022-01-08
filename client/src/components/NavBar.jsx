import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/auth.context';

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <Link to="/" className="brand-logo">
          Link Shorter
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
