import { CardElement } from '../CardElement/CardElement';
import './ContainerElements.css';

export const ContainerElements = ({ data=[], propertys, actionBtn }) => {
  return (
    <div className="ElementsForProcess">
      {data.map((item, index)=>{
        const dynamicProps = {};
        propertys.forEach(config => {
          const value = config.value.split('.').reduce((acc, key) => acc[key], item);
          dynamicProps[config.propName] = value;
        });
        return <CardElement key={index} {...dynamicProps} actionBtn={()=>actionBtn(item)}/>
      })}
    </div>
  )
}