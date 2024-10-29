import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchByOneData } from '../../../../Api/HttpServer.js';
import useAuthStore from '../../../../store/AuthStore.js';
import { formatUserForCard } from '../../utils/FormatUser.js';
import { Card } from '../../../../Components/index.js';

export const CardUser = () => {
  let { userId } = useParams();
  const { token } = useAuthStore();

  const userSearch = useQuery({
    queryKey: ['userSearchTerm', {url:`/auth/${userId}`, token}],
    queryFn: fetchByOneData, 
  });
  let Detail;
  if (!userSearch.data) return <h2>Sin datos</h2>
  if (userSearch.data.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  } else {
    Detail = formatUserForCard(userSearch.data);
  }
  if (!Detail) {
    return <h2>Sin datos</h2>
  }
  return (
    <div className='ContainerCustom'>
      <Card title={"Datos del Usuario"} details={Detail}/>
    </div>
  )
}
