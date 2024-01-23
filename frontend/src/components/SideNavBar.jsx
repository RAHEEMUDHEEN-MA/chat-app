import React from 'react'
import '../assets/styles/SideNavBar.css'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const SideNavBar = ({userdata}) => {
 
  
  return (
    <div className='navbar_holder'>
       
       <div className='top_bar'>
            
      <div className='navbar_profile'> <NavLink  className="linkss" to="/profile">
         {/* {data.name.charAt(0)} */}
        </NavLink>
      </div>
        <NavLink  className="linkss" to="/home/chat">
        chats
        </NavLink>

        <NavLink className="linkss" to="/home/search">
        search
        </NavLink>

        <NavLink  className="linkss" to="/requests">
        reqs
        </NavLink>
        </div>
        <div className='bottom_bar'><a href="">logout</a></div>
       
    </div>
  )
}

export default SideNavBar
