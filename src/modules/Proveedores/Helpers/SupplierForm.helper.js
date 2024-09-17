import * as Yup from "yup";

export const SuplierFormfields = [
  {
    name: "namecontact",
    label: "Nombre de contacto",
    type: "text",
    placeholder: "Ingrese el nombre del contacto"
  },
  {
    name: "personeria",
    label: "Nombre de negocio",
    type: "text",
    placeholder: "Ingrese el nombre del negocio"
  },
  {
    name: "tel",
    label: "Telefono",
    type: "number",
    placeholder: "Ingrese el no. telefono"
  },
  {
    name: "dpi",
    label: "DPI",
    type: "number",
    placeholder: "Ingrese el DPI"
  },
  {
    name: "address",
    label: "Dirección",
    type: "text",
    placeholder: "Ingrese la dirección del negocio"
  },
];

export const initialValuesCreatedSuplier = {
  namecontact: "",
  personeria: "",
  tel: "",
  dpi: "",
  address: "",
};

export const validationSchemaFormSuplier = {
  namecontact: Yup.string().required("Debe ingresar el nombre de contacto"),
  personeria: Yup.string(),
  tel: Yup.number().required("Debe ingresar un número de telefono"),
  dpi: Yup.number().required("Debe ingresar un número DPI"),
  address: Yup.string().required("Debe ingresar la dirección del negoció"),
};


export const valuesUpdateSuplier = (item) => ({
  namecontact: item.namecontact,
  personeria: item.personeria,
  tel: item.tel,
  dpi: item.dpi,
  address: item.address
})