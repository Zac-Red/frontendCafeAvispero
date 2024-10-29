import { Card, TableSeeDetails } from "../../../../Components"
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { formatDetailSale, formatSaleForCard } from "../../utils/FormatVentas";
import { fetchByOneData } from "../../../../Api/HttpServer";
import { SalesDetailColumns } from "../../Helpers/VentasColumnsTable";
import useAuthStore from "../../../../store/AuthStore";

export const CardVentas = () => {
  let { saleId } = useParams();
  const { token } = useAuthStore();

  const saleSearch = useQuery({
    queryKey: ['saleSearchTerm', { url: `/salesdetail/${saleId}`, token }],
    queryFn: fetchByOneData,
  });
  if (!saleSearch.data) return <h2>Sin datos</h2>
  let Detail = [];
  if (saleSearch.data.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }else{
    Detail = formatSaleForCard(saleSearch.data); 
  }
  if (!Detail) {
    return <h2>Sin datos</h2>
  }
  return (
    <div className='ContainerCustom'>
      <Card title={"Detalles de venta"} details={Detail}/>
      <TableSeeDetails 
        columns={SalesDetailColumns}
        data={saleSearch.data.salesdetails}
        formatData={formatDetailSale}/>
    </div>
  )
}
