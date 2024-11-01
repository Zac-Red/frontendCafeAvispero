import { FormatDate } from "../../../Utils/FormatElements";

export const formatSales = (item) => {
  const {createdAt, customerId, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const cliente = customerId.name;
  const nit = customerId.nit;
  return{
    newCreatedAt,
    cliente,
    nit,
    ...restData
  }
}

export const formatSaleForCard = (item) => {
  if (item) {
    const newCreatedAt = FormatDate(item.sale.createdAt);
    return[
      {label: "ID", value: item.sale.id},
      {label: "Cliente", value: item.sale.customerId.name},
      {label: "Total de la venta:", value: item.sale.total},
      {label: "Fecha de la venta:", value: newCreatedAt},
    ]
  } else {
    return []
  }
}

export const formatDetailSale = (item) =>{
  const {...restData} = item;
  return{
    ...restData
  }
}

export const formatPieKPIVentas = (item)=>{
  const {customer_name, purchase_count, customerId} = item;
  const label = customer_name;
  const value = +purchase_count;
  const id = customerId;
  return {
    label,
    value,
    id
  }
}

export const formatReportTopCustomers = (item)=> {
  const {customerId, ...restdata} = item;
  return {
    id: customerId,
    ...restdata
  }
}

export const formatCardProduct = (item)=> {
  const {stock, ...restdata} = item;
  const newstock = parseFloat(stock.toFixed(4))
  return {
    stock: newstock,
    ...restdata
  }
}