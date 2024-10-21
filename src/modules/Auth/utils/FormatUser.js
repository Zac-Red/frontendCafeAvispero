export const formatUser = (item) =>{
  const {IsActive, ...restData} = item;
  let estado = FormatDeleteFlagUser(IsActive);
  return{
    ...restData,
    estado
  }
}

const FormatDeleteFlagUser = (DeleteFlag) => {
  let newFormatDeleteFlag;
  DeleteFlag === true ?
  newFormatDeleteFlag = "Activo" 
  : 
  newFormatDeleteFlag = "Inactivo"
  return newFormatDeleteFlag;
}

export const formatUserForCard = (item) => {
  return[
    {label: "ID", value: item.id},
    {label: "Nombre", value: item.firstname},
    {label: "Apellido", value: item.lastname},
    {label: "DPI", value: item.dpi},
    {label: "Telefono", value: item.phone},
    {label: "Correo", value: item.email},
    {label: "Rol", value: item.roleId.role},
    {label: "Estado", value: item.IsActive? "Activo":"Inactivo"},
  ]
}