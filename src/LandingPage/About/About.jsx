import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import './About.css';

export const About = () => {
  return (
    <div className="sectAbout">
      <div className='history'>
        <h2>Sobre nosotros</h2>
        <article>
          Café el Avispero es una empresa productora y distribuidora de café de altura, 
          cosechado en las imediaciones del municipio de San vicente Pacaya, ubicado en el
          departamento de Escuintla, en el hermosa pais de Guatemala. Con 9 años de experiencia
          desde 2015, mejorando el producto y el servicio. Si deseas probar la calidad de nuestro
          producto contactanos en nuestras redes sociales.      
        </article>
      </div>
      <div className='socials'>
        <Link to="https://www.facebook.com/cafe.elavisperopalin">
          <FacebookIcon/>
        </Link>
        <Link to="https://www.instagram.com/cafe.avispero_gt/">
          <InstagramIcon/>
        </Link>
      </div>
    </div>
  )
}
