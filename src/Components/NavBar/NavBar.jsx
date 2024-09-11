import { NavLink } from 'react-router-dom';
import './NavBar.css';

export const NavBar = ({urls=[]}) => {
  return (
    <div className="navbar">
      <ul>
        {
          urls.map(( value, key )=>{
            return(
              <li className='Nav-item' key={key}>
                <NavLink className={ ({isActive}) => `${isActive ? 'active' : ''}`}  to={value.url} >{value.icon}{value.name}</NavLink>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
