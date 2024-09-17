import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { NavBarMain } from "../NavBarMain/NavBarMain";
import { SidebarPrincipal } from "../SideBarPrincipal/SideBarPrincipal";

export const Layout = ({MainURLs}) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    window.addEventListener('resize', handleResize);
    // Llamada inicial para configurar el estado
    handleResize();
    // Limpiar el evento de escucha cuando el componente se desmonta
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile
        ? 
        <div className="layout">
          <NavBarMain urls={MainURLs}/>
          <Outlet/>
        </div>
        :
        <div className="layout">
          <SidebarPrincipal urls={MainURLs} activebar={true}/>
          <Outlet/> 
        </div>
      }
    </>
  )
}
