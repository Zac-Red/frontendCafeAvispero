import ReactDom from 'react-dom';
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { TableDataCustom } from "../../../../Components/Tables/TableDataCustom";
import useAuthStore from "../../../../store/AuthStore";
import { initialValuesCreatedUser, validationSchemaFormUser, valuesUpdateUser } from "../../Helpers/UserForm.helper";
import { UserColumns } from "../../Helpers/UserTable.helper";
import { FeedSnackBar } from "../../../../Components/SnackBar/FeedSnackBar";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import './ListUsers.css';
import { RequestHTTP } from "../../../../httpServer";
import { UserSearchOptions } from "../../Helpers/UserSearch";
import {  DeleteElement, SearchElement, DynamicForm, 
          ModalComponent } from "../../../../Components";
import { getRoles } from "../../service/actions";
import { fetchPagedData } from "../../../../Api/HttpServer";


export const ListUsers = () => {
  const { token } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const userSearch = useQuery({
    queryKey: ['userSearch', {url:"/auth", page, rowsPerPage, selectedOption, inputValue}],
    queryFn: fetchPagedData, enabled: false  
  });

  const user = useQuery({
    queryKey: ['users', {url:"/auth", page, rowsPerPage}],
    queryFn: fetchPagedData,
  });
  
  const role = useQuery({
    queryKey: ['roles', {url:"/roles"}],
    queryFn: getRoles
  });

  const [showPassword, setshowPassword] = useState(false);
  const handleClickShowPassword = ()=>setshowPassword(true);
  const handleMouseDownPassword = ()=>setshowPassword(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [updateData, setUpdateData] = useState(null);
  const [idUser, setidUser] = useState("");

  const [openSnack, setOpenSnack] = useState(false);
  const handleOpenSnack = () => setOpenSnack(true);
  const handleCloseSnack = () => {
    setMessage("");
    setTypeSnack("");
    setOpenSnack(false)
  };
  const [Message, setMessage] = useState("");
  const [typeSnack, setTypeSnack] = useState("success");
  
  const handleSubmit = async(formData) => {
    const response = await RequestHTTP("/auth/create","POST",  formData, token);
    if (response.sucess) {
      handleClose();
      setMessage("Registro ingresado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        userSearch.refetch();
      }
      user.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
    // userMutation.mutate({url:"/auth/create", formData, token });
    // console.log(userMutation);
    // if (userMutation.isSuccess) {
    //   handleClose();
    //   setMessage("Registro ingresado con éxito");
    //   setTypeSnack("success");
    //   handleOpenSnack();
    //   refetch();
    // }else{
    //   setMessage(`${userMutation.error}`);
    //   setTypeSnack("error");
    //   handleOpenSnack();
    // }
  };
  
  const handleSubmitUpdate = async (formData) => {
    const response = await RequestHTTP(`/auth/${idUser}`, "PATCH", formData, token);
    if (response.sucess) {
      handleCloseUpdate();
      setMessage("Registro actualizado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        userSearch.refetch();
      }
      user.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };
  
  const handleSubmiteDelete = async () => {
    const response = await RequestHTTP(`/auth/${idUser}`,"DELETE", {}, token);
    if (response.sucess) {
      handleCloseDelete();
      setMessage("Registro eliminado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        userSearch.refetch();
      }
      user.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };
  

  const handleUpdate = (item) => {
    setUpdateData(valuesUpdateUser(item));
    setidUser(item.id);
    handleOpenUpdate();
  }


  const handledelete = async (item) => {
    setidUser(item.id);
    handleOpenDelete();
  }


  const UserFormfields = [
    { 
    name: "email", 
    label: "Correo", 
    type: "text", 
    placeholder: "Ingrese un correo" 
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
    },
    {
      name: "firstname",
      label: "Nombre",
      type: "text",
      placeholder: "Ingrese el nombre"
    },
  
    {
      name: "lastname",
      label: "Apellido",
      type: "text",
      placeholder: "Ingrese el apellido"
    },
  
    {
      name: "dpi",
      label: "DPI",
      type: "number",
      placeholder: "Ingrese el DPI"
    },
  
    {
      name: "phone",
      label: "Telefono",
      type: "number",
      placeholder: "Ingrese el no. telefono"
    },
    {
      name: 'roleId',
      label: 'Seleccione un Rol',
      type: 'number',
      isSelect: true,  
      options:role.data
    }
  ];

  return (
      <div className="ContainerCustom">
        <button onClick={()=>handleOpen()}>Registrar usuario</button>
        <SearchElement 
          inputValue={inputValue} 
          setInputValue={setInputValue}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          refetch={userSearch.refetch}
          options={UserSearchOptions}/>
        {!userSearch.data ? 
          <TableDataCustom
          data={user.data}
          isLoading={user.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={user.refetch}
          columns={UserColumns} 
          updateFuntion={handleUpdate} 
          deleteFuntion={handledelete}/>
          : 
          <TableDataCustom
          data={userSearch.data}
          isLoading={userSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={userSearch.refetch}
          columns={UserColumns} 
          updateFuntion={handleUpdate} 
          deleteFuntion={handledelete}/>}
        { ReactDom.createPortal(<>
        <ModalComponent elemento={<DynamicForm 
                      fields={UserFormfields} 
                      initialValues={initialValuesCreatedUser} 
                      validationSchema={validationSchemaFormUser}
                      onSubmit={handleSubmit}
                      titleButton={"Registrar"}/>} 
                      open={open} 
                      title="Ingrese Usuario" 
                      handleClose={handleClose}/>
        <ModalComponent elemento={<DynamicForm 
                      fields={UserFormfields} 
                      initialValues={updateData} 
                      validationSchema={validationSchemaFormUser}
                      onSubmit={handleSubmitUpdate}
                      titleButton={"Actualizar"}/>} 
                      open={openUpdate} 
                      title="Actualizar Usuario" 
                      handleClose={handleCloseUpdate}/>
        <ModalComponent elemento={<DeleteElement
                                    question={"¿Desea eliminar usuario?"} 
                                    cancelDelete={handleCloseDelete} 
                                    handleDelete={handleSubmiteDelete}/>} 
                        open={openDelete} 
                        title="Eliminar usuario" 
                        handleClose={handleCloseDelete}/>
        <FeedSnackBar 
          Close={handleCloseSnack} 
          message={Message} 
          open={openSnack} 
          vertical={'bottom'} 
          horizontal={'center'} 
          type={typeSnack}/>
        </>, document.getElementById('modals'))}
      </div>
  )
}
