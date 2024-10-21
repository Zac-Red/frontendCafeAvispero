import * as Yup from "yup";

export const CartRawMaterialFormfields = [
  {
    name: "amount",
    label: "Cantidad",
    type: "number",
    placeholder: "Ingrese la cantidad de la compra"
  },
];

export const initialCartRawMaterial = {
  amount: "",
};

export const validationSchemaFormCartRawMaterial = {
  amount: Yup.number().positive("Debe ser un numero positivo").required("Debe ingresar la cantidad de la compra"),
};



export const ComercialDocumentFormfields = [
  {
    name: "document",
    label: "Factura o documento comercial",
    type: "string",
    placeholder: "Ingrese la cantidad de la compra"
  },
  {
    name: "datecommercialdocument",
    label: "Fecha de la factura o documento comercial",
    type: "date",
    inpulabel: { shrink: true }
  },
];

export const initialComercialDocument = {
  document: "",
  datecommercialdocument: "",
};

export const validationSchemaFormComercialDocument = {
  document: Yup.string().required("Debe ingresar la factura o documento comercial"),
  datecommercialdocument: Yup.string().required("Debe ingresar la fecha de factura o documento comercial"),
};

export const propert = [
  { propName: 'Name', value: 'name' },
  { propName: 'Price', value: 'price' },
  { propName: 'UnitMeasure', value: 'unitmeasureId.name' },
  { propName: 'imgUrl', value: 'url' },
  { propName: 'Stock', value: 'stock' }
]