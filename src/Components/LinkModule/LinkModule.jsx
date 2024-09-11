import { NavLink } from "react-router-dom";
import './LinkModule.css'

export const LinkModule = ({moduleURL}) => {
  return (
    <div className="module">
      <div className="module-header">{moduleURL.label}</div>
      <NavLink to={moduleURL.url} className="linkModule">
        <span>{moduleURL.name}</span>
        {moduleURL.icon}
      </NavLink>
    </div>
  )
}
