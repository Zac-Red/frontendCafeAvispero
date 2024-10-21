import { FormatDate } from "../../../Utils/FormatElements";

export const formatRecipProduction = (item) => {
  const {createdAt, productId, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const product = productId.name;
  const url = productId.url;
  const unidad = productId.unitmeasureId.name;
  return{
    newCreatedAt,
    product,
    url,
    unidad,
    ...restData,
  }
}

export const formatRecipProductionForCard = (item) => {
  const newCreatedAt = FormatDate(item.recipproduction.createdAt);
  return[
    {label: "ID", value: item.recipproduction.id},
    {label: "Nombre de receta", value: item.recipproduction.name},
    {label: "Fecha de creación:", value: newCreatedAt},
    {label: "Producto de elaboración:", value: item.recipproduction.productId.name},
    {label: "Unidad medida de elaboración:", value: item.recipproduction.productId.unitmeasureId.name},
  ]
}

export const formatDetailReciproduction = (item) =>{
  const {...restData} = item;
  let url = restData.rawmaterialId.url;
  let unidad = restData.unitmeasureId.name;
  return{
    url,
    unidad,
    ...restData
  }
}

export const formatProduction = (item) => {
  const {createdAt, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const url = restData.recipproductionId.productId.url;
  return{
    newCreatedAt,
    url,
    ...restData,
  }
}


export const formatPieKPIProduction = (item)=>{
  const {product_name, total_amount, productId} = item;
  const label = product_name;
  const value = total_amount;
  const id = productId;
  return {
    label,
    value,
    id
  }
}

export const formatReportTopProductsProductions = (item)=>{
  const {productId, ...restData} = item;
  const id = productId;
  return {
    id,
    ...restData
  }
}