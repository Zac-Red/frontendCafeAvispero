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
];

export const initialValuesCreatedUnitMeasure = {
  name: "",
  description: "",
};

export const validationSchemaFormUnitMeasure = {
  name: Yup.string().required("Debe ingresar un nombre"),
  description: Yup.string().required("Debe ingresar una descripción"),
};


export const valuesUpdateUnitMeasure = (item) => ({
  name: item.name,
  description: item.description,
})