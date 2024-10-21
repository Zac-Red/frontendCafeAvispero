import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { NavBarMain } from "../NavBarMain/NavBarMain";
import { SidebarPrincipal } from "../SideBarPrincipal/SideBarPrincipal";
import { Loader } from "../Loader/Loader";

export const Layout = ({MainURLs}) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ?
        <div className="viewPortLoader">
          <Loader/>
        </div>
        :
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
      }
    </>
  )
}
