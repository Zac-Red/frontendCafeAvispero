import { FormatDate } from "../../../Utils/FormatElements";

export const FormatRawMaterial = (item) =>{
  const { createdAt, updatedAt, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const newUpdatedAt = FormatDate(updatedAt);
  return {
    newCreatedAt,
    newUpdatedAt,
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