import * as Yup from "yup";

export const initialValuesCreatedProduct = {
  name: "",
  description: "",
  price: "",
  unitmeasureId: "",
  image: null
};

export const validationSchemaFormProduct = {
  name: Yup.string().required("Debe ingresar un nombre"),
  description: Yup.string().required("Debe ingresar una descripción del producto"),
  price: Yup.number().required("Debe ingresar el precio"),
  unitmeasureId: Yup.number().required("Debe seleccionar una unidad de medida"),
  image: Yup.mixed().nullable()
  .test('FILE_SIZE', 'Archivo muy grande', (value) => {
    if (value && value instanceof File) {
      return value.size < 1920 * 1080;
    }
    return true; // Si no es un archivo, pasa la validación
  })
  .test('FILE_TYPE', 'Tipo de archivo no válido', (value) => {
    if (value && value instanceof File) {
      return ['image/png', 'image/jpeg'].includes(value.type);
    }
    return true; // Si no es un archivo, pasa la validación
  })
};

export const validationSchemaFormProductUpdate = {
  name: Yup.string().required("Debe ingresar un nombre"),
  description: Yup.string().required("Debe ingresar una descripción del producto"),
  price: Yup.number().required("Debe ingresar el precio"),
  unitmeasureId: Yup.number().required("Debe seleccionar una unidad de medida"),
  image: Yup.mixed().nullable().test(
      'is-string-or-file',
      'El valor debe ser un string o archivo',
      (value) => typeof value === 'string' || (value && value instanceof File) || value === undefined || value === null
    )
    .test('FILE_SIZE', 'Archivo muy grande', (value) => {
      if (value && value instanceof File) {
        return value.size < 1920 * 1080;
      }
      return true; // Si no es un archivo, pasa la validación
    })
    .test('FILE_TYPE', 'Tipo de archivo no válido', (value) => {
      if (value && value instanceof File) {
        return ['image/png', 'image/jpeg'].includes(value.type);
      }
      return true; // Si no es un archivo, pasa la validación
    }),
};

export const valuesUpdateProduct = (item) => ({
  name: item.name,
  description: item.description,
  price: item.price,
  unitmeasureId: item.unitmeasureId.id,
  image: item.url
})