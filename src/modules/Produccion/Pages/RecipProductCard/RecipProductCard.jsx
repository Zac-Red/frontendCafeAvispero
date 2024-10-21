import { Card, TableSeeDetails } from "../../../../Components"
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchByOneData } from "../../../../Api/HttpServer";
import { RecipProductionDetailsColumns } from "../../Helpers/ProductionColumnsTable";
import { formatDetailReciproduction, formatRecipProductionForCard } from "../../utils/FormatProduction";


export const RecipProductCard = () => {
  let { recipproductId } = useParams();
  const recipproductSearch = useQuery({
    queryKey: ['recipproductSearchTerm', { url: `/detailproduction/${recipproductId}` }],
    queryFn: fetchByOneData,
  });
  if (!recipproductSearch.data) return <h2>Sin datos</h2>
  const Detail = formatRecipProductionForCard(recipproductSearch.data);

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
