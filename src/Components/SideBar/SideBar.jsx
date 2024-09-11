import { NavLink } from "react-router-dom";
import './sidebar.css';

export const SideBar = ({urls=[]}) => {

  return (
    <nav className="sidebar">
      <ul>
        {
          urls.map(( value, key )=>{
            return(
              <li className="Side-item" key={key} >
                <NavLink className={ ({isActive}) => `${isActive ? 'active' : ''}`} to={value.url} >{value.icon}{value.name}</NavLink>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}
