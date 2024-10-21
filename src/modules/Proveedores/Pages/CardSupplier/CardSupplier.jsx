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

  if (!supplierSearch.data) return <h2>Sin datos</h2>
  const Detail = formatSupplierForCard(supplierSearch.data)
  return (
    <div className='ContainerCustom'>
      <Card title={"Datos de proveedor"} details={Detail}/>
    </div>
  )
}
