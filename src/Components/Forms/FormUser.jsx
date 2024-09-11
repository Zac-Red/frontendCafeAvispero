import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export const FormUser = () => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log(formData); 
    },
  })
  return (
    <div className="containerforms">
      <Typography variant="h5">
          Cree un Servicio
      </Typography>
      <form className="formServicio" onSubmit={formik.handleSubmit}>
          <TextField 
              id="outlined-basic" 
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
              label="Nombre" 
              variant="outlined"
              margin="normal"/>
          <TextField
              aria-label="empty textarea"
              name="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
              helperText={formik.touched.descripcion && formik.errors.descripcion}
              placeholder="Ingresa una descripcion"
              style={{ height: 150 }}
              />
          <Button type="submit" variant="contained">Crear</Button>
      </form>
    </div>
  )
}

function initialValues(){
  return {
    nombre: "",
    descripcion: ""
  }
}

function validationSchema(){
  return{
    nombre: 
      Yup.string()
      .required("Debe ingresar un nombre"),
    descripcion:
      Yup.string()
      .required("debe ingresar una descripcion")
  }
}


