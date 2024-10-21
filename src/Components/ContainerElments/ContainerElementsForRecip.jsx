import { CardProduction } from '../CardProduction/CardProduction';
import './ContainerElements.css';

export const ContainerElementsForRecip = ({data=[], propertys, actionBtn}) => {
  return (
    <div className="ElementsForProcess">
      {data.map((item, index)=>{
        const dynamicProps = {};
        propertys.forEach(config => {
          const value = config.value.split('.').reduce((acc, key) => acc[key], item);
          dynamicProps[config.propName] = value;
        });
        return <CardProduction key={index} {...dynamicProps} actionBtn={()=>actionBtn(item)}/>
      })}
    </div>
  )
}
