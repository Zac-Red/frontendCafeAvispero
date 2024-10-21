export const formatSupplier = (item) => {
  const { ...restData } = item
  return {
    ...restData
  }
}

export const formatSupplierForCard = (item) => {
  return[
    {label: "ID", value: item.id},
    {label: "Nombre", value: item.personeria},
    {label: "Nombre de contacto", value: item.namecontact},
    {label: "DPI", value: item.dpi},
    {label: "Telefono", value: item.tel},
    {label: "Dirección", value: item.address},
  ]
}