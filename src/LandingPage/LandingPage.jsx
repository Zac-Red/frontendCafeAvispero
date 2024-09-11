import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MainSection } from './MainSection';
import { InfoProduct } from './InfoProductos/InfoProduct';
import { About } from './About/About';
import AnimatedBackground from './AnimatedBackground/AnimatedBackground';

import '../LandingPage/LandingPage.css';

export const LandingPage = () => {
  const ref = useRef();

  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = (section) => {
    ref.current.scrollTo(section);
    setActiveSection(section);
  };
  
  
  return (
    <div>
      <AnimatedBackground/>
      <Parallax pages={3} ref={ref}>
        <ParallaxLayer className='navBarLanding' sticky={{ start: 0, end: 6 }}>
          <ul className='landingMenu'>
            <li>
              <a className={`Nav-item ${(activeSection === 0) ? 'active' : ''}`} onClick={() => scrollToSection(0)}>Inicio</a>
            </li>
            <li>
              <a className={`Nav-item ${(activeSection === 1) ? 'active' : ''}`} onClick={() => scrollToSection(1)}>Productos</a>
            </li>
            <li>
              <a className={`Nav-item ${(activeSection === 2) ? 'active' : ''}`} onClick={() => scrollToSection(2)}>Sobre nosotros</a>
            </li>
            <li>
              <NavLink className="Nav-item" to="/login" >Iniciar sesion</NavLink>
            </li>
          </ul>
        </ParallaxLayer>

        <ParallaxLayer id='Inicio' offset={0} speed={0.5} factor={1}>
          <MainSection/>
        </ParallaxLayer>

        <ParallaxLayer id='Producto' offset={1} speed={0.5} factor={1}>
          <InfoProduct/>
        </ParallaxLayer>

        <ParallaxLayer id='nosotros' offset={2} speed={0.5} factor={1}>
          <About/>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}


