import { useState } from "react";
import { SidebarPrincipal } from "../SideBarPrincipal/SideBarPrincipal"
import Drawer from '@mui/material/Drawer';
import { NavLink } from "react-router-dom";
import useAuthStore from "../../store/AuthStore";
import LogoutIcon from '@mui/icons-material/Logout';
import './NavbarMain.css'

export const NavBarMain = ({ urls }) => {
  const { logout } = useAuthStore();

  const singOut = () => {
    logout()
  }

  const [expandSidebar, setExpandSidebar] = useState(false);

  const handleSidebar = () => {
    setExpandSidebar(!expandSidebar)
  }
  return (
    <>
      <div className="navbarmain">
        <NavLink className="logo" to={"/admin"} >
          <img src='/brown-coffe.png' />
          <span>Café El Avispero</span>
        </NavLink>
        <button className="btnNavbarmain" onClick={() => { handleSidebar() }}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3_h"></div>
          <div className="bar4"></div>
        </button>
      </div>
      <Drawer PaperProps={{
        sx: {
          backgroundColor: "#E3D7BF",
          borderRadius: "15px",
          width: "200px"
        }
      }} open={expandSidebar} onClose={() => handleSidebar()}>
        <div className="sidebarPrincipal-top-wrapper">
          <div className="sidebarPrincipal-top">
            <NavLink className="logo__wrapper" to={"/admin"} >
              <span className="company-name">
                Café el Avispero
              </span>
            </NavLink>
          </div>
        </div>
        <div className="sidebarPrincipalLinks">
          <ul className="sidebarPrincipal-items">
            {urls.map((value, key) =>
              <li className={"sidebarPrincipal-text"} key={key}>
                <NavLink to={value.url}>{value.icon} {value.name}</NavLink>
              </li>
            )}
            <li className="sidebarPrincipal-text"><button onClick={() => singOut()}><LogoutIcon /></button></li>
          </ul>
        </div>
      </Drawer>
    </>
  )
}
