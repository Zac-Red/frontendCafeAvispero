import { Card, TableSeeDetails } from "../../../../Components"
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchByOneData } from "../../../../Api/HttpServer";
import { RecipProductionDetailsColumns } from "../../Helpers/ProductionColumnsTable";
import { formatDetailReciproduction, formatRecipProductionForCard } from "../../utils/FormatProduction";
import useAuthStore from "../../../../store/AuthStore";


export const RecipProductCard = () => {
  const { token } = useAuthStore();
  let { recipproductId } = useParams();
  const recipproductSearch = useQuery({
    queryKey: ['recipproductSearchTerm', { url: `/detailproduction/${recipproductId}`, token }],
    queryFn: fetchByOneData,
  });
  let Detail;
  if (!recipproductSearch.data) return <h2>Sin datos</h2>
  if (recipproductSearch.data.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  } else {
    Detail = formatRecipProductionForCard(recipproductSearch.data);
  }
  if (!Detail) {
    return <h2>Sin datos</h2>
  }
  return (
    <div className='ContainerCustom'>
      <Card title={"Receta de Fabricación"} details={Detail}/>
      <TableSeeDetails 
        columns={RecipProductionDetailsColumns}
        data={recipproductSearch.data.detailsproduction}
        formatData={formatDetailReciproduction}/>
    </div>
  )
}
