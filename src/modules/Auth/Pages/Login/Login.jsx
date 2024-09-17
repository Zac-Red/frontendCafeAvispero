import { useState } from "react";
import useAuthStore from "../../../../store/AuthStore";
import { RequestHTTP } from "../../../../httpServer";
import { DynamicForm } from "../../../../Components";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import * as Yup from "yup";
import './Login.css';
import { FeedSnackBar } from "../../../../Components/SnackBar/FeedSnackBar";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = {
  email: Yup.string().email("Debe ingresar un correo valido").required("Debe ingresar un nombre"),
  password: Yup.string().required("Debe ingresar una descripción"),
};


const stylesbuttonLogin = {
  background: "#7F4626",
  color: "white",
  width: "100%",
  height: "35px",
  borderRadius: "5px"
}

export const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [showPassword, setshowPassword] = useState(false);
  const handleClickShowPassword = ()=>setshowPassword(true);
  const handleMouseDownPassword = ()=>setshowPassword(false);

  const [openSnack, setOpenSnack] = useState(false);
  const handleOpenSnack = () => setOpenSnack(true);
  const handleCloseSnack = () => {
    setMessage("");
    setTypeSnack("");
    setOpenSnack(false)
  };
  const [Message, setMessage] = useState("");
  const [typeSnack, setTypeSnack] = useState("success");

  const fields = [
    { 
    name: "email", 
    label: "Correo", 
    type: "text", 
    placeholder: "Ingrese correo de usuario" 
    },
    { 
      name: "password", 
      label: "Contraseña", 
      type: showPassword ? 'text' : 'password', 
      placeholder: "Ingrese contraseña",
      inputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>)
      }
    }
  ];

  const handleSession = async(formData) => {
    const response = await RequestHTTP("/auth/login", "POST", formData);
    if (response.sucess) {
      login(response.result.token)
      navigate("/admin");
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  }
  return (
    <div className="ContainerLogin">
      <div className="ContainerLogoLogin">
        <div className="LogoLogin">
          <img src="/logo-coffe.png" alt="Café El Avispero"/>
        </div>
      </div>
      <div className="FormLogin">
        <Typography variant="h5">
          Iniciar sesión
        </Typography>
        <DynamicForm 
          fields={fields} 
          initialValues={initialValues} 
          validationSchema={validationSchema} 
          onSubmit={handleSession} 
          titleButton="Iniciar sesión"
          ButtonStyles={stylesbuttonLogin}/>
      </div>
      <FeedSnackBar 
          Close={handleCloseSnack} 
          message={Message} 
          open={openSnack} 
          vertical={'bottom'} 
          horizontal={'center'} 
          type={typeSnack}/>
    </div>
  )
}
