import * as Yup from "yup";

export const initialValuesCreatedProduct = {
  name: "",
  description: "",
  price: "",
  unitmeasureId: "",
};

export const validationSchemaFormProduct = {
  name: Yup.string().required("Debe ingresar un nombre"),
  description: Yup.string().required("Debe ingresar una descripción del producto"),
  price: Yup.number().required("Debe ingresar el precio"),
  unitmeasureId: Yup.number().required("Debe seleccionar una unidad de medida"),
};


export const valuesUpdateProduct = (item) => ({
  name: item.name,
  description: item.description,
  price: item.price,
  unitmeasureId: item.unitmeasureId.id
})