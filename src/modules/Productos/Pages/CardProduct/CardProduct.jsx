import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useAuthStore from "../../../../store/AuthStore";
import { fetchByOneData } from "../../../../Api/HttpServer";
import { formatProduct } from "../../utils/FormatProduct";
import { CardPresentElement } from "../../../../Components/CardPresentElement/CardPresentElement";

export const CardProduct = () => {
  const { token } = useAuthStore();
  let { productId } = useParams();
  const productSearch = useQuery({
    queryKey: ['productSearchTerm', {url:`/products/${productId}`, token}],
    queryFn: fetchByOneData, 
  });
  
  if (!productSearch.data) return <h2>Sin datos</h2>

  const Detail = formatProduct(productSearch.data)
  return (
    <div className="ContainerCustom">
      <CardPresentElement detail={Detail}/>
    </div>
  )
}
