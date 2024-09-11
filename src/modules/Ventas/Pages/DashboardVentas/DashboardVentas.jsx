import { useState } from "react";
import { ModalComponent } from "../../../../Components/Modal/ModalComponent"
import Button from '@mui/material/Button';
import * as Yup from "yup";
import { DynamicForm } from "../../../../Components/Forms/DynamicForm ";

const columns = [
  {label: "nombre", value: "name"},
  {label: "descripcion", value: "description"},
  {label: "precio", value: "price"},
  {label: "stock", value: "stock"},
  {label: "proveedor", value: "supplierId.personeria"},
  {label: "fecha de creación", value: "createdAt"},
  {label: "fecha de actualización", value: "updatedAt"},
];

const fields = [
  { 
  name: "nombre", 
  label: "Nombre", 
  type: "text", 
  placeholder: "Ingrese un nombre" 
  },

  { 
    name: "descripcion", 
    label: "Descripción", 
    type: "text", 
    placeholder: "Ingrese una descripción" 
  },

  {
    name: "telefono",
    label: "telefono",
    type: "number",
    placeholder: "Ingrese número de telefono"
  }
];

const initialValues = {
  nombre: "",
  descripcion: "",
  telefono: "",
};

const validationSchema = {
  nombre: Yup.string().required("Debe ingresar un nombre"),
  descripcion: Yup.string().required("Debe ingresar una descripción"),
  telefono: Yup.string().required("Debe ingresar un numero de telefono"),
};

const handleSubmit = async (formData) => {
  console.log(formData);
};

export const DashboardVentas = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      DashboardVentas
      <ModalComponent 
        title="Ingres los datos" 
        open={open} handleClose={handleClose} 
        elemento={<DynamicForm 
                    fields={fields} 
                    initialValues={initialValues} 
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    titleButton={"Ingresar datos"}/>}/>
      {/* <TableData url={"/rawmaterial"} columns={columns}/> */}
    </div>
  )
}
