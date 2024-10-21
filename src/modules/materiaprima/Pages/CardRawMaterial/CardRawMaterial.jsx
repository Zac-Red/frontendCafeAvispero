import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'; 
import { fetchByOneData } from "../../../../Api/HttpServer";
import { CardPresentElement } from "../../../../Components/CardPresentElement/CardPresentElement"
import useAuthStore from "../../../../store/AuthStore";
import { FormatRawMaterial } from "../../utils/FormatRawMaterial";

export const CardRawMaterial = () => {
  const { token } = useAuthStore();
  let { rawmaterialId } = useParams();
  const rawmaterialSearch = useQuery({
    queryKey: ['rawmaterialSearchTerm', {url:`/rawmaterial/${rawmaterialId}`, token}],
    queryFn: fetchByOneData, 
  });
  
  if (!rawmaterialSearch.data) return <h2>Sin datos</h2>
  const Detail = FormatRawMaterial(rawmaterialSearch.data);
  
  return (
    <div className="ContainerCustom">
      <CardPresentElement detail={Detail}/>
    </div>
  )
}
