import { Card, TableSeeDetails } from "../../../../Components"
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchByOneData } from "../../../../Api/HttpServer";
import { formatDetailShopping, formatShoppingForCard } from "../../utils/FormatCompras";
import { ShoppingDetailColumns } from "../../Helpers/ComprasColumnsTable";
import useAuthStore from "../../../../store/AuthStore";

export const CardCompras = () => {
  const { token } = useAuthStore();
  let { shoppingId } = useParams();
  const shoppingSearch = useQuery({
    queryKey: ['shoppingSearchTerm', { url: `/shoppingdetail/${shoppingId}`, token }],
    queryFn: fetchByOneData,
  });
  if (!shoppingSearch.data) return <h2>Sin datos</h2>
  let Detail = [];
  if (shoppingSearch.data.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }else{
    Detail = formatShoppingForCard(shoppingSearch.data);
  }
  if (!Detail) {
    return <h2>Sin datos</h2>
  }
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
