import React from 'react'
import "../assets/styles/ChatlistBanner.css";
import { GiMushroomHouse } from "react-icons/gi";

const RandomChatBanner = () => {
    return (
        <div className="ChatListBAnnerMain">
            <GiMushroomHouse size={120}/>
          <h1>Random chat</h1>
          <h5> Chat Room</h5>
          <p>
           Random chat allows you to create rooms to chat and make connections across this platform without adding users as friends
          </p>
        </div>
      );
}

export default RandomChatBanner
