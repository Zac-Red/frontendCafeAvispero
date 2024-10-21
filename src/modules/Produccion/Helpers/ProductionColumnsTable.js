export const RecipProductionColumns = [
  {label: "Producto", value: "product"},
  {label: "Img", value: "url"},
  {label: "Receta", value: "name"},
  {label: "No.Unidades", value: "amount"},
  {label: "Unidad de medida", value: "unidad"},
  {label: "Creado en", value: "newCreatedAt"},
];


export const RecipProductionDetailsColumns = [
  {label: "Materia prima", value: "rawmaterialId.name"},
  {label: "Img", value: "url"},
  {label: "Cantidad", value: "amount"},  
  {label: "Unidad de medida", value: "unidad"},
];

export const ProductionsColumns = [
  {label: "Receta", value: "recipproductionId.name"},
  {label: "Img", value: "url"},
  {label: "Producto", value: "recipproductionId.productId.name"},
  {label: "Cantidad producida", value: "amount"},
  {label: "Creado en", value: "newCreatedAt"},
];

export const ReportTopProductsProductionsColumns = [
  {label: "Producto", value: "product_name"},
  {label: "Cantidad producida", value: "total_amount"},
];