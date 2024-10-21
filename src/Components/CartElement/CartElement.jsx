import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import './CartElement.css';

export const CartElement = ({ data = [], increment, decrement, deleted }) => {
  return (
    <div className="master-container">
      {data.map((item, index) => (
        <div className="cardCart cart" key={index}>
          <div className="products">
            <div className="product">
              <Avatar alt={item.name} src={item.url} />
              <div>
                <label>{item.name}</label>
                <span>Cantidad</span>
              </div>
              <div className="quantity">
                <button onClick={() => decrement(item)}>
                  <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                  </svg>
                </button>
                <label>{item.amount}</label>
                <button onClick={() => increment(item)}>
                  <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                  </svg>
                </button>
                <button className='btnDeleteItemCart' onClick={() => deleted(item)}><DeleteIcon /></button>
              </div>
              {item.subtotal &&
                <label className="price small">Q{item.subtotal}</label>
              }
            </div>
            {item.unitmeasureId &&
              <div>
                <span>Unidad de medida</span>
                <p>{item.unitmeasureId.name}</p>
              </div>}
          </div>
        </div>
      ))}
    </div>
  )
}
