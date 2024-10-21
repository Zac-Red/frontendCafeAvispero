import * as Yup from "yup";

export const initialValuesCreatedRawMaterial = {
  name: "",
  description: "",
  price: "",
  unitmeasureId: "",
  supplierId: "",
  image: null
};

export const validationSchemaFormRawMaterial= {
  name: Yup.string().required("Debe ingresar un nombre"),
  description: Yup.string().required("Debe ingresar una descripción del materia prima"),
  price: Yup.number().required("Debe ingresar el precio"),
  unitmeasureId: Yup.number().required("Debe seleccionar una unidad de medida"),
  supplierId: Yup.string().required("Debe seleccionar un proveedor"),
  image: Yup.mixed()
  .test("FILE_SIZE", "Archivo muy grande", (value)=> value && (value.size < 1920*1080))
  .test("FILE_TYPE", "Tipo de archivo no valido", (value)=> value && ['image/png', 'image/jpeg'].includes(value.type)),
};

export const validationSchemaFormRawMaterialUpdate = {
  name: Yup.string().required("Debe ingresar un nombre"),
  description: Yup.string().required("Debe ingresar una descripción de la materia prima"),
  price: Yup.number().required("Debe ingresar el precio"),
  unitmeasureId: Yup.number().required("Debe seleccionar una unidad de medida"),
  supplierId: Yup.string().required("Debe seleccionar un proveedor"),
  image: Yup.mixed().test(
      'is-string-or-file',
      'El valor debe ser un string o un archivo',
      (value) => typeof value === 'string' || (value && value instanceof File)
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

export const valuesUpdateRawMaterial = (item) => ({
  name: item.name,
  description: item.description,
  price: item.price,
  supplierId: item.supplierId.id,
  unitmeasureId: item.unitmeasureId.id,
  image: item.url
})