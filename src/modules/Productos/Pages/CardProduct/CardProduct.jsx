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
    queryKey: ['productSearchTerm', {url:`/products/${productId}`, token }],
    queryFn: fetchByOneData, 
  });
  let Detail;
  if (!productSearch.data) return <h2>Sin datos</h2>
  if (productSearch.data.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }else{
    Detail = formatProduct(productSearch.data)
  }
  if (!Detail) {
    return <h2>Sin datos</h2>
  }
  return (
    <div className="ContainerCustom">
      <CardPresentElement detail={Detail}/>
    </div>
  )
}
