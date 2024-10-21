import './CardProduction.css';

export const CardProduction = ({Name, data, actionBtn}) => {
  return (
    <div className="cardproduction">
      <span className="cardproduction__title">{Name}</span>
      <button onClick={()=>actionBtn(data)} className="cardproduction__button">Seleccionar</button>
    </div>
  )
}
