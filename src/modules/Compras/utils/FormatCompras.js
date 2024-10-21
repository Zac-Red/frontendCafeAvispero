import { FormatDate } from "../../../Utils/FormatElements";

export const formatShopping = (item) => {
  const {createdAt, supplierId, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const supplier = supplierId.namecontact;
  return{
    newCreatedAt,
    supplier,
    ...restData
  }
}

export const formatShoppingForCard = (item) => {
  const newCreatedAt = FormatDate(item.shopping.createdAt);
  return[
    {label: "ID", value: item.shopping.id},
    {label: "Documento comercial", value: item.shopping.commercialdocument},
    {label: "Fecha del documento comercial", value: item.shopping.datecommercialdocument},
    {label: "Proveedor", value: item.shopping.supplierId.namecontact},
    {label: "Total de la compra:", value: item.shopping.total},
    {label: "Fecha de la compra:", value: newCreatedAt},
  ]
}

export const formatDetailShopping = (item) =>{
  const {...restData} = item;
  return{
    ...restData
  }
}

export const formatPieKPICompras = (item)=>{
  const {rawmaterial_name, total_purchase, rawmaterialIdId} = item;
  const label = rawmaterial_name;
  const value = +total_purchase;
  const id = rawmaterialIdId;
  return {
    label,
    value,
    id
  }
}

export const formatReportTopShopping = (item)=> {
  const {rawmaterialIdId, ...restdata} = item;
  return {
    id: rawmaterialIdId,
    ...restdata
  }
}