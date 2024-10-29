import { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { NavLink } from "react-router-dom";
import { MainSection } from './MainSection';
import { InfoProduct } from './InfoProductos/InfoProduct';
import { About } from './About/About';
import AnimatedBackground from './AnimatedBackground/AnimatedBackground';
import '../LandingPage/LandingPage.css';


export const LandingPage = () => {
  const ref = useRef();
  const inicioRef = useRef(null);
  const productosRef = useRef(null);
  const nosotrosRef = useRef(null);

  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = (section) => {
    ref.current.scrollTo(section);
    setActiveSection(section);
  };

  useEffect(() => {
    const sections = [inicioRef.current, productosRef.current, nosotrosRef.current];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target);
            setActiveSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div>
      <AnimatedBackground />
      <Parallax pages={3} ref={ref}>
        <ParallaxLayer className="navBarLanding" sticky={{ start: 0, end: 6 }}>
          <ul className="landingMenu">
            <li>
              <a
                className={`Nav-item ${activeSection === 0 ? "active" : ""}`}
                onClick={() => scrollToSection(0)}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                className={`Nav-item ${activeSection === 1 ? "active" : ""}`}
                onClick={() => scrollToSection(1)}
              >
                Productos
              </a>
            </li>
            <li>
              <a
                className={`Nav-item ${activeSection === 2 ? "active" : ""}`}
                onClick={() => scrollToSection(2)}
              >
                Sobre nosotros
              </a>
            </li>
            <li>
              <NavLink className="Nav-item" to="/login">
                Iniciar sesión
              </NavLink>
            </li>
          </ul>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5} factor={1}>
          <div ref={inicioRef}>
            <MainSection />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5} factor={1}>
          <div ref={productosRef}>
            <InfoProduct />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5} factor={1}>
          <div ref={nosotrosRef}>
            <About />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

