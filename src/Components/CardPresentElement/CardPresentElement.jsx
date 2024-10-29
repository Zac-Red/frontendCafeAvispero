import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';

export const CardPresentElement = ({detail}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={detail.url}
          alt={detail.name}
          sx={{ height: 400, objectFit: 'contain',  }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{detail.name}</Typography>
          <Typography gutterBottom variant="h6" component="div">
            Precio:  
            <Chip color="primary" label={`Q.${detail.price}`} 
              size="medium" 
              style={{fontSize: "18px", marginLeft: "5px"}}/>
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Stock:
            <Chip color="primary" label={detail.stock? detail.stock : detail.newstock} 
              size="medium" 
              style={{fontSize: "18px", marginLeft: "5px"}}/>
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Unidad de medida:
            <Chip color="primary" label={detail.unitmeasureId.name} 
              size="medium" 
              style={{fontSize: "18px", marginLeft: "5px"}}/>
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {detail.description}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Creado en: 
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {detail.newCreatedAt}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Actualizado en: 
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {detail.newUpdatedAt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
