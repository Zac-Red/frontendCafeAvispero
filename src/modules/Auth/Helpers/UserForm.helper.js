import * as Yup from "yup";


export const initialValuesCreatedUser = {
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  dpi: "",
  phone: "",
  roleId: "",
};

export const validationSchemaFormUser = {
  email: Yup.string().email("ingrese un correo valido").required("Debe ingresar un correo"),
  password: Yup.string().required("Debe ingresar una contraseña"),
  firstname: Yup.string().required("Debe ingresar un nombre"),
  lastname: Yup.string().required("Debe ingresar un apellido"),
  dpi: Yup.number().required("Debe ingresar un número DPI"),
  phone: Yup.number().required("Debe ingresar un número de telefono"),
  roleId: Yup.number().required("Debe seleccionar un rol"),
};


export const valuesUpdateUser = (item) => ({
  email: item.email,
  password: "",
  firstname: item.firstname,
  lastname: item.lastname,
  dpi: item.dpi,
  phone: item.phone,
  roleId: item.roleId.id
})