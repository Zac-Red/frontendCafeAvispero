import { CardElement } from '../CardElement/CardElement';
import './ContainerElements.css';

export const ContainerElements = ({ data=[], propertys, actionBtn,formatData }) => {
  return (
    <div className="ElementsForProcess">
      {data.map((item, index)=>{
        const dynamicProps = {};
        propertys.forEach(config => {
          const newFormat = formatData(item)
          const value = config.value.split('.').reduce((acc, key) => acc[key], newFormat);
          dynamicProps[config.propName] = value;
        });
        return <CardElement key={index} {...dynamicProps} actionBtn={()=>actionBtn(item)}/>
      })}
    </div>
  )
}