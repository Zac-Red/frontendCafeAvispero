import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Card } from '../../../../Components';
import useAuthStore from '../../../../store/AuthStore';
import { fetchByOneData } from '../../../../Api/HttpServer';
import { formatSupplierForCard } from '../../utils/FormatSupplier';

export const CardSupplier = () => {
  const { token } = useAuthStore();
  const { supplierId } = useParams();

  const supplierSearch = useQuery({
    queryKey: ['clientSearchTerm', {url:`/suppliers/${supplierId}`, token}],
    queryFn: fetchByOneData, 
  });
  let Detail;
  if (!supplierSearch.data) return <h2>Sin datos</h2>
  if (supplierSearch.data.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  } else {
    Detail = formatSupplierForCard(supplierSearch.data)
  } 
  if (!Detail) {
    return <h2>Sin datos</h2>
  }
  return (
    <div className='ContainerCustom'>
      <Card title={"Datos de proveedor"} details={Detail}/>
    </div>
  )
}
