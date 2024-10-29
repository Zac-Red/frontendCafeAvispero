import { FormatDate } from "../../../Utils/FormatElements";

export const FormatRawMaterial = (item) =>{
  const { createdAt, updatedAt, stock, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const newUpdatedAt = FormatDate(updatedAt);
  const newstock = parseFloat(stock.toFixed(4));
  return {
    newCreatedAt,
    newUpdatedAt,
    newstock,
    ...restData
  }
}

export const FormatKardexRawMaterial = (item) =>{
  const { createdAt, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const url = restData.rawmaterialId.url
  return {
    newCreatedAt,
    url,
    ...restData
  }
}