export const RawMaterialColumns = [
  {label: "Nombre", value: "name"},
  {label: "Stock", value: "stock"},
  {label: "Precio", value: "price"},
  {label: "Unidad", value: "unitmeasureId.name"},
  {label: "Creado en", value: "newCreatedAt"}, 
  {label: "Actualizado en", value: "newUpdatedAt"},
  {label: "Img", value: "url"},
];

export const KardexRawMaterialColumns = [
  {label: "Materia prima", value: "rawmaterialId.name"},
  {label: "Img", value: "url"},
  {label: "Cantidad", value: "amount"},
  {label: "Unidad", value: "unitmeasureId.name"},
  {label: "Tipo de movimiento", value: "inventorymoveId.name"},
  {label: "Creado en", value: "newCreatedAt"}, 
];