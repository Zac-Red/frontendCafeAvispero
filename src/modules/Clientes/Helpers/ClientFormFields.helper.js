import * as Yup from "yup";

export const ClientFormfields = [
  {
    name: "name",
    label: "Nombre",
    type: "text",
    placeholder: "Ingrese el nombre"
  },
  {
    name: "nit",
    label: "Nit",
    type: "text",
    placeholder: "Ingrese el nit"
  },
  {
    name: "phone",
    label: "Telefono",
    type: "number",
    placeholder: "Ingrese el no. de telefono"
  },
];

export const initialValuesCreatedClient = {
  name: "",
  nit: "",
  phone: "",
};

export const validationSchemaFormClient = {
  name: Yup.string().required("Debe ingresar un nombre"),
  nit: Yup.string().required("Debe ingresar el nit"),
  phone: Yup.number().required("Debe ingresar un número de telefono"),
};

export const ValuesUpdateClient = (item) => ({
  name: item.name,
  nit: item.nit,
  phone: item.phone,
})