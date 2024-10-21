import { Card, TableSeeDetails } from "../../../../Components"
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchByOneData } from "../../../../Api/HttpServer";
import { formatDetailShopping, formatShoppingForCard } from "../../utils/FormatCompras";
import { ShoppingDetailColumns } from "../../Helpers/ComprasColumnsTable";

export const CardCompras = () => {
  let { shoppingId } = useParams();
  const shoppingSearch = useQuery({
    queryKey: ['shoppingSearchTerm', { url: `/shoppingdetail/${shoppingId}` }],
    queryFn: fetchByOneData,
  });
  if (!shoppingSearch.data) return <h2>Sin datos</h2>
  const Detail = formatShoppingForCard(shoppingSearch.data);
  return (
    <div className='ContainerCustom'>
      <Card title={"Detalles de compra"} details={Detail}/>
      <TableSeeDetails 
        columns={ShoppingDetailColumns}
        data={shoppingSearch.data.shoppingdetails}
        formatData={formatDetailShopping}/>
    </div>
  )
}
