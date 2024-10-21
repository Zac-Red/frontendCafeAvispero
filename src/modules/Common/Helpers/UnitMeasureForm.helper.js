import * as Yup from "yup";

export const UnitMeasureFormfields = [
  {
    name: "name",
    label: "Nombre",
    type: "text",
    placeholder: "Ingrese el nombre de la unidad"
  },
  {
    name: "description",
    label: "Descripción",
    type: "text",
    placeholder: "Ingrese el descripción de la unidad"
  },
  {
    name: "conversionfactor",
    label: "Factor de conversión en gramos",
    type: "number",
    placeholder: "Ingrese el factor de conversion en gramos"
  },
];

export const initialValuesCreatedUnitMeasure = {
  name: "",
  description: "",
  conversionfactor: "",
};

export const validationSchemaFormUnitMeasure = {
  name: Yup.string().required("Debe ingresar un nombre"),
  description: Yup.string().required("Debe ingresar una descripción"),
  conversionfactor: Yup.number().required("Debe ingresar el factor de conversion en gramos"),
};


export const valuesUpdateUnitMeasure = (item) => ({
  name: item.name,
  description: item.description,
  conversionfactor: item.conversionfactor,
})