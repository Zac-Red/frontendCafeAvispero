import * as Yup from "yup";

export const initialProductionForm = {
  amount: "",
};

export const validationSchemaFormProduction = {
  amount: Yup.number().positive("Debe ser un numero positivo").required("Debe ingresar la cantidad ha producir"),
};

export const ProductionFormfields = [
  {
    name: "amount",
    label: "Cantidad",
    type: "number",
    placeholder: "Ingrese la cantidad a producir"
  },
];