import { LinkModule } from '../../Components/LinkModule/LinkModule';
import { MainURLs } from '../../router';
import './Inicio.css';

export const Inicio = () => {
  return (
    <div className="HomeModule">
      {
        MainURLs.map((moduleURL, index)=>(
          <LinkModule key={index} moduleURL={moduleURL}/>
        ))
      }
    </div>
  )
}
