import * as Yup from "yup";

export const CartProductFormfields = [
  {
    name: "amount",
    label: "Cantidad",
    type: "number",
    placeholder: "Ingrese la cantidad a vender"
  },
];

export const initialCartProduct = {
  amount: "",
};

export const validationSchemaFormCartProduct = {
  amount: Yup.number().positive("Debe ser un numero positivo").required("Debe ingresar la cantidad a vender"),
};

export const propert = [
  { propName: 'Name', value: 'name' },
  { propName: 'Price', value: 'price' },
  { propName: 'UnitMeasure', value: 'unitmeasureId.name' },
  { propName: 'imgUrl', value: 'url' },
  { propName: 'Stock', value: 'stock' }
]