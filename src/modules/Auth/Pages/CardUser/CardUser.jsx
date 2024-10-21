import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchByOneData } from '../../../../Api/HttpServer.js';
import useAuthStore from '../../../../store/AuthStore.js';
import { formatUserForCard } from '../../utils/FormatUser.js';
import { Card } from '../../../../Components/index.js';
// import './Carduser.css';

export const CardUser = () => {
  let { userId } = useParams();
  const { token } = useAuthStore();

  const userSearch = useQuery({
    queryKey: ['userSearchTerm', {url:`/auth/${userId}`, token}],
    queryFn: fetchByOneData, 
  });
  if (!userSearch.data) return <h2>Sin datos</h2>
  const Detail = formatUserForCard(userSearch.data);

  return (
    <div className='ContainerCustom'>
      <Card title={"Datos del Usuario"} details={Detail}/>
    </div>
  )
}
