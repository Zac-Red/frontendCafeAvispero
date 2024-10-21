import { FormatDate } from "../../../Utils/FormatElements";

export const formatCostumer = (item) => {
  const {createdAt, updatedAt, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const newUpdatedAt = FormatDate(updatedAt);
  return{
    newCreatedAt,
    newUpdatedAt,
    ...restData
  }
}

export const formatCostumerForCard = (item) => {
  const {createdAt, updatedAt, ...restData} = item;
  const newCreatedAt = FormatDate(createdAt);
  const newUpdatedAt = FormatDate(updatedAt);
  return[
    {label: "ID", value: restData.id},
    {label: "Nombre", value: restData.name},
    {label: "NIT", value: restData.nit},
    {label: "Telefono", value: restData.phone},
    {label: "Registrado en:", value: newCreatedAt},
    {label: "Actualizado en:", value: newUpdatedAt},
  ]
}