import { useEffect, useState } from "react";
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from "react-router-dom";
import { MainSection } from './MainSection';
import { InfoProduct } from './InfoProductos/InfoProduct';
import { About } from './About/About';
import { Element, Link } from 'react-scroll';
import AnimatedBackground from './AnimatedBackground/AnimatedBackground';
import '../LandingPage/LandingPage.css';


export const LandingPage = () => {
  const [activeSection, setActiveSection] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSetActive = (section) => {
    const sectionIndex = ["inicio", "productos", "nosotros"].indexOf(section);
    setActiveSection(sectionIndex);
  };

  const [expandSidebar, setExpandSidebar] = useState(false);

  const handleSidebar = () => {
    setExpandSidebar(!expandSidebar)
  }

  return (
    <div className="landingcontainer">
      <AnimatedBackground />
      {isMobile
        ?
        <>
          <div className="navbarlanding-movil">
            <NavLink className="logo" to={"/"} >
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
            <div className="sidebarlanding-top">
              <img src='/2024-08-10 094843.png'/>
              <NavLink className="logo__wrapper" to={"/"} >
                <span className="company-name">
                  Café el Avispero
                </span>
              </NavLink>
            </div>
            <div className="sidebarlandingLinks">
              <ul className="sidebarlanding-items">
                <li>
                  <Link
                    className={`Nav-item ${activeSection === 0 ? 'active' : ''}`}
                    to="inicio"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onSetActive={() => handleSetActive("inicio")}
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    className={`Nav-item ${activeSection === 1 ? 'active' : ''}`}
                    to="productos"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onSetActive={() => handleSetActive("productos")}
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    className={`Nav-item ${activeSection === 2 ? 'active' : ''}`}
                    to="nosotros"
                    spy={true}
                    smooth={true}
                    offset={-150}
                    duration={500}
                    onSetActive={() => handleSetActive("nosotros")}
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <NavLink className="Nav-item" to="/login">
                    Iniciar sesión
                  </NavLink>
                </li>
              </ul>
            </div>
          </Drawer>
        </>
        :
        <div className="navBarLanding">
          <ul className="landingMenu">
            <li>
              <Link
                className={`Nav-item ${activeSection === 0 ? 'active' : ''}`}
                to="inicio"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onSetActive={() => handleSetActive("inicio")}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                className={`Nav-item ${activeSection === 1 ? 'active' : ''}`}
                to="productos"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onSetActive={() => handleSetActive("productos")}
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                className={`Nav-item ${activeSection === 2 ? 'active' : ''}`}
                to="nosotros"
                spy={true}
                smooth={true}
                offset={-150}
                duration={500}
                onSetActive={() => handleSetActive("nosotros")}
              >
                Sobre nosotros
              </Link>
            </li>
            <li>
              <NavLink className="Nav-item" to="/login">
                Iniciar sesión
              </NavLink>
            </li>
          </ul>
        </div>
      }

      <Element name="inicio" className="sectContain" style={{ padding: '20px' }}>
        <MainSection />
      </Element>

      <Element name="productos" className="sectContain" style={{ padding: '20px' }}>
        <InfoProduct />
      </Element>

      <Element name="nosotros" className="sectAbout" style={{ padding: '20px' }}>
        <About />
      </Element>

      <div className="CardSocialMedia">
        <ul>
          <li className="iso-pro">
            <span></span>
            <span></span>
            <span></span>
            <a href="https://www.facebook.com/cafe.elavisperopalin">
              <svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" className="svg">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </a>
            <div className="text">Facebook</div>
          </li>
          <li className="iso-pro">
            <span></span>
            <span></span>
            <span></span>
            <a href="https://www.instagram.com/cafe.avispero_gt/">
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
            </a>
            <div className="text">Instagram</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

// export const LandingPage = () => {
//   const inicioRef = useRef(null);
//   const productosRef = useRef(null);
//   const nosotrosRef = useRef(null);

//   const [activeSection, setActiveSection] = useState(0);

//   const scrollToSection = (section) => {
//     section.current.scrollIntoView({ behavior: 'smooth' });
//     setActiveSection(section);
//   };

//   useEffect(() => {
//     const sections = [inicioRef.current, productosRef.current, nosotrosRef.current];
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = sections.indexOf(entry.target);
//             setActiveSection(index);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     sections.forEach((section) => {
//       if (section) observer.observe(section);
//     });

//     return () => {
//       sections.forEach((section) => {
//         if (section) observer.unobserve(section);
//       });
//     };
//   }, []);

//   return (
//     <div className="landingcontainer">
//       <AnimatedBackground />
//       <div className="navBarLanding" style={{ position: 'fixed', top: 0, background: 'white', zIndex: 1000, width: '100%' }}>
//         <ul className="landingMenu">
//           <li>
//             <a
//               className={`Nav-item ${activeSection === 0 ? 'active' : ''}`}
//               onClick={() => scrollToSection(inicioRef)}
//             >
//               Inicio
//             </a>
//           </li>
//           <li>
//             <a
//               className={`Nav-item ${activeSection === 1 ? 'active' : ''}`}
//               onClick={() => scrollToSection(productosRef)}
//             >
//               Productos
//             </a>
//           </li>
//           <li>
//             <a
//               className={`Nav-item ${activeSection === 2 ? 'active' : ''}`}
//               onClick={() => scrollToSection(nosotrosRef)}
//             >
//               Sobre nosotros
//             </a>
//           </li>
//           <li>
//             <NavLink className="Nav-item" to="/login">
//               Iniciar sesión
//             </NavLink>
//           </li>
//         </ul>
//       </div>

//       <div id="inicio" className="sectContain" ref={inicioRef} style={{ padding: '20px' }}>
//         <MainSection />
//       </div>

//       <div className="sectContain" ref={productosRef} style={{ padding: '20px' }}>
//         <InfoProduct />
//       </div>

//       <div className="sectAbout" ref={nosotrosRef} style={{ minHeight: '100%', height: 'auto', padding: '20px' }}>
//         <About />
//       </div>

//       <div className="CardSocialMedia">
//         <ul>
//           <li className="iso-pro">
//             <span></span>
//             <span></span>
//             <span></span>
//             <a href="https://www.facebook.com/cafe.elavisperopalin">
//               <svg
//                 viewBox="0 0 320 512"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="svg"
//               >
//                 <path
//                   d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
//                 ></path>
//               </svg>
//             </a>
//             <div className="text">Facebook</div>
//           </li>
//           <li className="iso-pro">
//             <span></span>
//             <span></span>
//             <span></span>
//             <a href="https://www.instagram.com/cafe.avispero_gt/">
//               <svg
//                 className="svg"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 448 512"
//               >
//                 <path
//                   d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
//                 ></path>
//               </svg>
//             </a>
//             <div className="text">Instagram</div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

