import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card } from "../../../../Components"
import { fetchByOneData } from '../../../../Api/HttpServer';
import useAuthStore from '../../../../store/AuthStore';
import { formatCostumerForCard } from '../../utils/FormatCostumer';

export const CardClient = () => {
  const { token } = useAuthStore();
  const { clientId } = useParams();
  const clientSearch = useQuery({
    queryKey: ['clientSearchTerm', {url:`/customers/${clientId}`, token}],
    queryFn: fetchByOneData, 
  });
  let Detail;
  if (!clientSearch.data) return <h2>Sin datos</h2>
  if (clientSearch.data.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  } else {
    Detail = formatCostumerForCard(clientSearch.data)
  }
  if (!Detail) {
    return <h2>Sin datos</h2>
  }
  return (
    <div className='ContainerCustom'>
      <Card title={"Datos de cliente"} details={Detail}/>
    </div>
  )
}
