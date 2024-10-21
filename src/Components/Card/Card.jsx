import Typography from '@mui/material/Typography';
import './Card.css';

export const Card = ({ title, details = [] }) => {
  return (
    <div className='containerCard'>
      <Typography variant="h4" component="h2">{title}</Typography>
      {details.map((item, index)=>(
        <div className='brutalist-card__section' key={index}>
          <div>
            <Typography variant="h5" component="p">{item.label}</Typography>
          </div>
          <div>
            <Typography variant="h6" component="p">{item.value}</Typography>
          </div>
        </div>
      ))}
    </div>
  )
}
