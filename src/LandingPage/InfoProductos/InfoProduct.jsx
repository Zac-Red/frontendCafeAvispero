import Products from '/Products2.jpg';

import './InfoProduct.css';

export const InfoProduct = () => {
  return (
    <>
      <div className='ContainerSectionArt'>
        <article className='SectionContentArt ProductInfo'>
          <h2>Nuestros productos</h2>
          <ul>
            <li>
              Libra de Café con Cacao: Disfruta de la perfecta combinación de café de alta calidad
              y cacao puro. Nuestro café con cacao ofrece un sabor rico y suave, ideal para aquellos 
              que buscan una experiencia única y deliciosa. Perfecto para cualquier momento del día. 
              🌟☕🍫
            </li>
            <li>
              Libra de Café Expresso: Experimenta la intensidad y el aroma inigualable de nuestro café 
              expresso. Hecho con los mejores granos, este café es perfecto para los amantes del expresso 
              que buscan un sabor fuerte y auténtico. Ideal para comenzar tu día con energía. ☕🔥
            </li>
            <li>
              Libra de Café con Cardamomo: Descubre la exótica fusión de café y cardamomo en cada 
              taza. Nuestro café con cardamomo ofrece un sabor único y aromático que te transportará a 
              nuevas experiencias sensoriales. Perfecto para quienes buscan algo diferente y especial. 
              ☕🌿✨
            </li>
          </ul>
        </article>
      </div>
      <div className='SectionContentImg'>
        <img src={Products} alt="Productos de Café el Avispero" />
      </div>
    </>
    // <div className='sectContain'>
    //   <div className='ContainerSectionArt'>
    //     <article className='SectionContentArt ProductInfo'>
    //       <h2>Nuestros productos</h2>
    //       <ul>
    //         <li>
    //           Libra de Café con Cacao: Disfruta de la perfecta combinación de café de alta calidad
    //           y cacao puro. Nuestro café con cacao ofrece un sabor rico y suave, ideal para aquellos 
    //           que buscan una experiencia única y deliciosa. Perfecto para cualquier momento del día. 
    //           🌟☕🍫
    //         </li>
    //         <li>
    //           Libra de Café Expresso: Experimenta la intensidad y el aroma inigualable de nuestro café 
    //           expresso. Hecho con los mejores granos, este café es perfecto para los amantes del expresso 
    //           que buscan un sabor fuerte y auténtico. Ideal para comenzar tu día con energía. ☕🔥
    //         </li>
    //         <li>
    //           Libra de Café con Cardamomo: Descubre la exótica fusión de café y cardamomo en cada 
    //           taza. Nuestro café con cardamomo ofrece un sabor único y aromático que te transportará a 
    //           nuevas experiencias sensoriales. Perfecto para quienes buscan algo diferente y especial. 
    //           ☕🌿✨
    //         </li>
    //       </ul>
    //     </article>
    //   </div>
    //   <div className='SectionContentImg'>
    //     <img src={Products} alt="Productos de Café el Avispero" />
    //   </div>
    // </div>
  )
}
