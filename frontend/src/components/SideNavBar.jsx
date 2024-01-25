
import '../assets/styles/SideNavBar.css';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const SideNavBar = ({ userdata }) => {
  const USERDP = userdata?.name ? userdata.name.charAt(0) : '';

  return (
    <div className='navbar_holder'>
      <div className='top_bar'>
        <div className='navbar_profile'>
          <NavLink className="linkss" to="/profile">
            {USERDP}
          </NavLink>
        </div>

        <NavLink className="linkss" to="/home/chat">
          Chats
        </NavLink>

        <NavLink className="linkss" to="/home/search">
          Search
        </NavLink>

        <NavLink className="linkss" to="/home/requests">
          Requests
        </NavLink>
      </div>

      <NavLink className="linkss" to="/">
        <Button variant="outline-secondary">Logout</Button>
      </NavLink>
    </div>
  );
};

export default SideNavBar;
