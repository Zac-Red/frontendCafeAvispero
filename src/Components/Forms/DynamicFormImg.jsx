import { TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from "formik";
import * as Yup from "yup";
import FormStyles from './Forms.module.css';

export const DynamicFormImg = ({ initialValues, validationSchema, onSubmit, fields,
  titleButton, StylesForm, StylesButton, preview, setPreview }) => {

  const handleImageChange = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFieldValue('image', file);
    }
  };

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
        {fields.map(({ name, label, type, placeholder, inputProps, isSelect, options }) => (
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
            InputProps={inputProps || {}}
            select={isSelect || false}>
            {isSelect && options && options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        ))}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(event) => { handleImageChange(event, formik.setFieldValue) }} />
        {formik.errors.image && formik.touched.image && (
          <div>{formik.errors.image}</div>
        )}
        {preview &&
          <div className="image-preview-form">
            <img src={preview} alt="Previsualización" />
          </div>}
        <button type="submit" className={FormStyles[StylesButton]}>{titleButton}</button>
      </form>
    </div>
  );
};

