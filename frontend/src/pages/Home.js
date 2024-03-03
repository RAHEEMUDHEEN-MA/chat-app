import "../assets/styles/Home.css";

import SideNavBar from "../components/SideNavBar";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Home = ({ userdata, socket }) => {
  var userData = userdata;

  return (
    <div>
      <div className="TopBar">
        <div
          className=" d-flex flex-column"
          style={{ textAlign: "left", color: "gray" }}
        >
          <p>hello</p>
          <h2 className="">{userdata != null ? userdata.name : "unknown"}</h2>
        </div>
        <button>
          <HiOutlineDotsVertical size={25} />
        </button>
      </div>
      <SideNavBar userdata={userData} socket={socket} />
    </div>
  );
};

export default Home;
