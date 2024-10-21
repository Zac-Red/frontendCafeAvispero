import { TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from "formik";
import FormStyles from './Forms.module.css';
import * as Yup from "yup";

export const DynamicForm = ({ initialValues, validationSchema, onSubmit, fields, titleButton, StylesForm, StylesButton }) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (formData) => {
      await onSubmit(formData);
    },
  });

  return (
    <div className={FormStyles[StylesForm]}>
      <form onSubmit={formik.handleSubmit}>
        {fields.map(({ name, label, type, placeholder, inputProps, inpulabel, isSelect, options }) => (
          <TextField
            key={name}
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            margin="normal"
            fullWidth
            InputLabelProps={inpulabel || {}}
            InputProps={inputProps || {}}
            select={isSelect || false}>
            {isSelect && options && options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        ))}
        <button type="submit" className={FormStyles[StylesButton]}>{titleButton}</button>
      </form>
    </div>
  );
};

