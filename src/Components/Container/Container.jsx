import { Outlet } from "react-router-dom"
import { SideBar } from "../SideBar/SideBar";
import { NavBar } from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import './Container.css';

export const Container = ({urls=[]}) => {
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
        <div className="mainContent">
          <NavBar urls={urls}/>
          <Outlet/> 
        </div>
        :
        <div className="mainContent">
          <Outlet/> 
          <SideBar urls={urls}/>
        </div>
      }
    </>
  )
}
