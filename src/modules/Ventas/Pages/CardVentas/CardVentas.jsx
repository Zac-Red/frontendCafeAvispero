import { Card, TableSeeDetails } from "../../../../Components"
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { formatDetailSale, formatSaleForCard } from "../../utils/FormatVentas";
import { fetchByOneData } from "../../../../Api/HttpServer";
import { SalesDetailColumns } from "../../Helpers/VentasColumnsTable";

export const CardVentas = () => {
  let { saleId } = useParams();

  const saleSearch = useQuery({
    queryKey: ['saleSearchTerm', { url: `/salesdetail/${saleId}` }],
    queryFn: fetchByOneData,
  });
  if (!saleSearch.data) return <h2>Sin datos</h2>
  const Detail = formatSaleForCard(saleSearch.data);

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
