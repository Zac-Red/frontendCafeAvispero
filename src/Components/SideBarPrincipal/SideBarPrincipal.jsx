import { NavLink } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import useAuthStore from "../../store/AuthStore";
import './sidebarPrincipal.css';

export const SidebarPrincipal = ({urls=[], activebar}) => {
  const { logout } = useAuthStore();

  const singOut = ()=> {
    logout()
  }
  return (
    <nav className={activebar ? 'sidebarPrincipal active' : 'sidebarPrincipal'}>
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
          {urls.map(( value, key )=>
            <li className="sidebarPrincipal-text" key={key}>
              <NavLink className={ ({isActive}) => `Nav-item ${isActive ? 'active' : ''}`}  to={value.url} >{value.icon}{value.name}</NavLink>
            </li>
          )}
          <li className="sidebarPrincipal-text"><button onClick={()=>singOut()}><LogoutIcon/></button></li>
        </ul>
      </div>
    </nav>
  )
}
