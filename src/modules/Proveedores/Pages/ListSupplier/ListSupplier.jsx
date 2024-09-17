import ReactDom from 'react-dom';
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../../../../store/AuthStore';
import { DeleteElement, DynamicForm, FeedSnackBar, ModalComponent, SearchElement, TableDataCustom } from '../../../../Components';
import { RequestHTTP } from '../../../../httpServer';
import { SuplierFormfields, initialValuesCreatedSuplier, validationSchemaFormSuplier, valuesUpdateSuplier } from '../../Helpers/SupplierForm.helper';
import { SupplierSearchOptions } from '../../Helpers/SupplierSearch';
import { SupplierColumns } from '../../Helpers/SupplierTable.helper';
import { fetchPagedData } from '../../../../Api/HttpServer';

export const ListSupplier = () => {
  const { token } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const supplierSearch = useQuery({
    queryKey: ['supplierSearch', {url:"/suppliers", page, rowsPerPage, selectedOption, inputValue}],
    queryFn: fetchPagedData, enabled: false  
  });

  const supplier = useQuery({
    queryKey: ['supplier', {url:"/suppliers", page, rowsPerPage}],
    queryFn: fetchPagedData,
  });
  
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
  const [idSuplier, setidSuplier] = useState("");

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
    const response = await RequestHTTP("/suppliers","POST",  formData, token);
    if (response.sucess) {
      handleClose();
      setMessage("Registro ingresado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        supplierSearch.refetch();
      }
      supplier.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };
  
  const handleSubmitUpdate = async (formData) => {
    const response = await RequestHTTP(`/suppliers/${idSuplier}`, "PATCH", formData, token);
    if (response.sucess) {
      handleCloseUpdate();
      setMessage("Registro actualizado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        supplierSearch.refetch();
      }
      supplier.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };
  
  const handleSubmiteDelete = async () => {
    const response = await RequestHTTP(`/supplier/${idSuplier}`,"DELETE", {}, token);
    if (response.sucess) {
      handleCloseDelete();
      setMessage("Registro eliminado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        supplierSearch.refetch();
      }
      supplier.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };
  

  const handleUpdate = (item) => {
    console.log(item);
    setUpdateData(valuesUpdateSuplier(item));
    setidSuplier(item.id);
    handleOpenUpdate();
  }


  const handledelete = async (item) => {
    setidSuplier(item.id);
    handleOpenDelete();
  }

  return (
    <div className="ContainerCustom">
      <button onClick={()=>handleOpen()}>Registrar Proveedor</button>
      <SearchElement 
        inputValue={inputValue} 
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={supplierSearch.refetch}
        options={SupplierSearchOptions}/>
      {!supplierSearch.data ? 
        <TableDataCustom
        data={supplier.data}
        isLoading={supplier.isLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        refetch={supplier.refetch}
        columns={SupplierColumns} 
        updateFuntion={handleUpdate} 
        deleteFuntion={handledelete}/>
        : 
        <TableDataCustom
        data={supplierSearch.data}
        isLoading={supplierSearch.isLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        refetch={supplierSearch.refetch}
        columns={SupplierColumns} 
        updateFuntion={handleUpdate} 
        deleteFuntion={handledelete}/>}
      { ReactDom.createPortal(<>
      <ModalComponent elemento={<DynamicForm 
                    fields={SuplierFormfields} 
                    initialValues={initialValuesCreatedSuplier} 
                    validationSchema={validationSchemaFormSuplier}
                    onSubmit={handleSubmit}
                    titleButton={"Registrar"}/>} 
                    open={open} 
                    title="Ingrese Proveedor" 
                    handleClose={handleClose}/>
      <ModalComponent elemento={<DynamicForm 
                    fields={SuplierFormfields} 
                    initialValues={updateData} 
                    validationSchema={validationSchemaFormSuplier}
                    onSubmit={handleSubmitUpdate}
                    titleButton={"Actualizar"}/>} 
                    open={openUpdate} 
                    title="Actualizar Proveedor" 
                    handleClose={handleCloseUpdate}/>
      <ModalComponent elemento={<DeleteElement
                                  question={"¿Desea eliminar proveedor?"} 
                                  cancelDelete={handleCloseDelete} 
                                  handleDelete={handleSubmiteDelete}/>} 
                      open={openDelete} 
                      title="Eliminar Proveedor" 
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
