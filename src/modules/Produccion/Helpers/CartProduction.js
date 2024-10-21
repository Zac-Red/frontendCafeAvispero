import * as Yup from "yup";

export const initialCartDetailProduction = {
  amount: "",
  unitmeasureId: "",
};

export const validationSchemaFormCartDetailProduction = {
  amount: Yup.number().positive("Debe ser un numero positivo").required("Debe ingresar la cantidad de materia prima"),
  unitmeasureId: Yup.number().required("Debe seleccionar la unidad de medida"),
};

export const CartProductionFormfields = [
  {
    name: "name",
    label: "Nombre de la receta",
    type: "text",
    placeholder: "Ingrese el nombre de la receta"
  },
  {
    name: "amount",
    label: "Cantidad",
    type: "number",
    placeholder: "Ingrese la cantidad de unidades recepresenta esta receta"
  },
];

export const initialCartProduction = {
  amount: "",
  name: "",
};

export const validationSchemaFormCartProduction = {
  name: Yup.string().required("Debe ingresar el nombre de la receta"),
  amount: Yup.number().positive("Debe ser un numero positivo").required("Debe ingresar la cantidad de unidades que representa esta receta"),
};

export const Productpropert = [
  { propName: 'Name', value: 'name' },
  { propName: 'UnitMeasure', value: 'unitmeasureId.name' },
  { propName: 'imgUrl', value: 'url' },
]