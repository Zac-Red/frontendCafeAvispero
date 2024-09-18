import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUnitData } from '../../../../Api/HttpServer.js';
import useAuthStore from '../../../../store/AuthStore.js';
import Typography from '@mui/material/Typography';
import './Carduser.css';
import ProfielIMG from '/logo-coffe.png';

export const CardUser = () => {
  let { userId } = useParams();
  const { token } = useAuthStore();

  const userSearch = useQuery({
    queryKey: ['userSearchTerm', {url:`/auth/${userId}`, token}],
    queryFn: fetchUnitData, 
  });
  if (!userSearch.data) return <h2>Sin datos</h2>
  return (
    <div className='containerCardUser'>
      <div className='cardUser'>
        <div> 
          <Typography style={{ color: "orange"}} variant="h5" component="h3">Usuario</Typography>
        </div>
        <div className='profieldImage'>
          <img src={ProfielIMG}/>
        </div>
        <Typography color={'white'} variant="h5" component="h3">
          <span>Nombre: </span> 
        {userSearch.data.firstname}</Typography>
        <Typography color={'white'} variant="h5" component="h3">
          <span>Apellido: </span> 
          {userSearch.data.lastname}</Typography>
        <Typography color={'white'} variant="h5" component="h3">
          <span>DPI: </span> 
          {userSearch.data.dpi}</Typography>
        <Typography color={'white'} variant="h5" component="h3">
          <span>Telefono: </span> 
          {userSearch.data.phone}</Typography>
        <Typography color={'white'} variant="h5" component="h3">
          <span>Rol: </span> 
          {userSearch.data.roleId.role}</Typography>
        <Typography color={'white'} variant="h5" component="h3">
          <span>Correo: </span> 
          {userSearch.data.email}</Typography>
        <Typography color={'white'} variant="h5" component="h3">
          <span>Estado: </span> 
          {userSearch.data.IsActive? "Activo":"Inactivo"}</Typography>
      </div>
    </div>
  )
}
