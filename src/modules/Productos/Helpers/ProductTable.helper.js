export const ProductColumns = [
  {label: "Nombre", value: "name"},
  {label: "Stock", value: "stock"},
  {label: "Precio", value: "price"},
  {label: "Unidad", value: "unitmeasureId.name"},
  {label: "Creado en", value: "newCreatedAt"}, 
  {label: "Actualizado en", value: "newUpdatedAt"},
  {label: "Img", value: "url"},
];


export const KardexProductColumns = [
  {label: "Producto", value: "productId.name"},
  {label: "Img", value: "url"},
  {label: "Cantidad", value: "amount"},
  {label: "Unidad", value: "unitmeasureId.name"},
  {label: "Tipo de movimiento", value: "inventorymoveId.name"},
  {label: "Creado en", value: "newCreatedAt"}, 
];

export const ReportTopSalesProductColumns = [
  {label: "Producto", value: "product_name"},
  {label: "Total de ventas", value: "total_sold"},
];
