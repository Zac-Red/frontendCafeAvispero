import * as Yup from "yup";

export const InventoryMoveFormfields = [
  {
    name: "name",
    label: "Nombre",
    type: "text",
    placeholder: "Ingrese el nombre del tipo de movimiento"
  },
  {
    name: "description",
    label: "Descripción",
    type: "text",
    placeholder: "Ingrese el descripción del tipo de movimiento"
  },
];

export const initialValuesCreatedInventoryMove = {
  name: "",
  description: "",
};

export const validationSchemaFormInventoryMove = {
  name: Yup.string().required("Debe ingresar un nombre"),
  description: Yup.string().required("Debe ingresar una descripción"),
};


export const valuesUpdateInventoryMove = (item) => ({
  name: item.name,
  description: item.description,
})