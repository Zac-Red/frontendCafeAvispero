import './CardElement.css';

export const CardElement = ({imgUrl, Name, Price, Stock, UnitMeasure, data, actionBtn}) => {
  return (
    <div className="card">
      {imgUrl &&
        <div className="image_container">
          <img className="image" src={imgUrl} alt={Name}/>
        </div>}
      {Name &&
        <div className="title">
          <span>{Name}</span>
        </div>}
      <div className="size">
        {UnitMeasure &&
          <div>
            <span>Unidad</span>
            <ul className="list-size">
              <li className="item-list"><p className="item-list-button">{UnitMeasure}</p></li>
            </ul>
          </div>}
        
        {Stock !== undefined &&
          <div>
            <span>Stock</span>
            <ul className="list-size">
              <li className="item-list"><p className="item-list-button">{Stock}</p></li>
            </ul>
          </div>}
      </div>
      <div className="action">
        {Price &&
          <div className="price">
            <span>Q{Price}</span>
          </div>}
        <button className="cart-button" onClick={()=>actionBtn(data)}>
          <span>Agregar</span>
        </button>
      </div>
    </div>
  )
}