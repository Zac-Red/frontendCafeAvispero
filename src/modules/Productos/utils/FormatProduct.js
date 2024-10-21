import { FormatDate } from "../../../Utils/FormatElements";

export const formatProduct = (item) =>{
  const { createdAt, updatedAt, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const newUpdatedAt = FormatDate(updatedAt);
  return {
    newCreatedAt,
    newUpdatedAt,
    ...restData
  }
}


export const formatKardexProduct = (item) =>{
  const { createdAt, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const url = restData.productId.url
  return {
    newCreatedAt,
    url,
    ...restData
  }
}

export const formatPieKPITopSalesProducts = (item)=>{
  const {product_name, total_sold, productIdId} = item;
  const label = product_name;
  const value = +total_sold;
  const id = productIdId;
  return {
    label,
    value,
    id
  }
}

export const formatReportTopSalesProducts = (item)=> {
  const {productIdId, ...restdata} = item;
  return {
    id: productIdId,
    ...restdata
  }
}



