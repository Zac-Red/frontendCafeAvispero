import ProductMain from '/productoMain2.jpg';
import './MainSection.css';

export const MainSection = () => {
  return (
    <div className="sectContain MainSection">
      <div className='SectionContentImg'>
        <img src={ProductMain} alt="Café de Altura" />
      </div>
      <div className='ContainerSectionArt'>
        <article className='SectionContentArt princilInfo'>
          <h2>Café el Avispero</h2>
          ¡Bienvenidos a Café el Avispero!, nos especializamos en la producción y venta de café de alta calidad. 
          Desde nuestras plantaciones hasta tu taza, garantizamos frescura y sabor auténtico. 
          Nuestro café es cultivado con pasión y dedicación, asegurando una experiencia única 
          en cada sorbo. Descubre el aroma inigualable y el sabor excepcional que solo nuestro café 
          puede ofrecer. Únete a nuestra comunidad de amantes del café y disfruta de lo mejor que 
          la naturaleza tiene para ofrecer.
        </article>
      </div>
    </div>
  )
}
