import ReactDom from 'react-dom';
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../../../../store/AuthStore';
import { DeleteElement, DynamicForm, FeedSnackBar, ModalComponent, SearchElement, TableDataCustom } from '../../../../Components';
import { InventoryMoveColumns } from '../../Helpers/InventoryMoveTable.helper';
import { InventoryMoveSearchOptions } from '../../Helpers/InventoryMoveSearch';
import { InventoryMoveFormfields, initialValuesCreatedInventoryMove, validationSchemaFormInventoryMove, valuesUpdateInventoryMove } from '../../Helpers/InventoryMoveForm.helper';
import { RequestHTTP } from '../../../../httpServer';
import { fetchPagedData } from '../../../../Api/HttpServer';
import { formatInventoryMove } from '../../utils/FormatInventoryMove';

export const InventoryMoves = () => {  
  const { token } = useAuthStore();
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const invetorymoveSearch = useQuery({
    queryKey: ['invetorymoveSearch', {url:"/inventorymoves", page, rowsPerPage, selectedOption, inputValue}],
    queryFn: fetchPagedData, enabled: false  
  });

  const invetorymove = useQuery({
    queryKey: ['invetorymoves', {url:"/inventorymoves", page, rowsPerPage}],
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
  const [idinvetorymove, setidinvetorymove] = useState("");

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
    const response = await RequestHTTP("/inventorymoves","POST",  formData, token);
    if (response.sucess) {
      handleClose();
      setMessage("Registro ingresado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        invetorymoveSearch.refetch();
      }
      invetorymove.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };

  const handleSubmitUpdate = async (formData) => {
    const response = await RequestHTTP(`/inventorymoves/${idinvetorymove}`, "PATCH", formData, token);
    if (response.sucess) {
      handleCloseUpdate();
      setMessage("Registro actualizado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        invetorymoveSearch.refetch();
      }
      invetorymove.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };

  const handleSubmiteDelete = async () => {
    const response = await RequestHTTP(`/inventorymoves/${idinvetorymove}`,"DELETE", {}, token);
    if (response.sucess) {
      handleCloseDelete();
      setMessage("Registro eliminado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        invetorymoveSearch.refetch();
      }
      invetorymove.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };


  const handleUpdate = (item) => {
    setUpdateData(valuesUpdateInventoryMove(item));
    setidinvetorymove(item.id);
    handleOpenUpdate();
  }

  const handledelete = async (item) => {
    setidinvetorymove(item.id);
    handleOpenDelete();
  }

  return (
    <div className="ContainerCustom">
      <button className="topButton" onClick={() => handleOpen()}>
        <span className="topButtontransition"></span>
        <span className="topButtongradient"></span>
        <span className="topButtonlabel">Registrar tipo de movimiento de inventario</span>
      </button>
      <SearchElement 
        inputValue={inputValue} 
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={invetorymoveSearch.refetch}
        options={InventoryMoveSearchOptions}/>
      {!invetorymoveSearch.data ? 
        <TableDataCustom
        data={invetorymove.data}
        isLoading={invetorymove.isLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        refetch={invetorymove.refetch}
        columns={InventoryMoveColumns}
        formatData={formatInventoryMove} 
        updateFuntion={handleUpdate} 
        deleteFuntion={handledelete}/>
        : 
        <TableDataCustom
        data={invetorymoveSearch.data}
        isLoading={invetorymoveSearch.isLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        refetch={invetorymoveSearch.refetch}
        columns={InventoryMoveColumns}
        formatData={formatInventoryMove} 
        updateFuntion={handleUpdate} 
        deleteFuntion={handledelete}/>}
      { ReactDom.createPortal(<>
      <ModalComponent elemento={<DynamicForm 
                    fields={InventoryMoveFormfields} 
                    initialValues={initialValuesCreatedInventoryMove} 
                    validationSchema={validationSchemaFormInventoryMove}
                    onSubmit={handleSubmit}
                    titleButton={"Registrar"}/>} 
                    open={open} 
                    title="Ingrese Unidad" 
                    handleClose={handleClose}/>
      <ModalComponent elemento={<DynamicForm 
                    fields={InventoryMoveFormfields} 
                    initialValues={updateData} 
                    validationSchema={validationSchemaFormInventoryMove}
                    onSubmit={handleSubmitUpdate}
                    titleButton={"Actualizar"}/>} 
                    open={openUpdate} 
                    title="Actualizar Unidad" 
                    handleClose={handleCloseUpdate}/>
      <ModalComponent elemento={<DeleteElement
                                  question={"¿Desea eliminar un tipo de movimiento de inventario?"} 
                                  cancelDelete={handleCloseDelete} 
                                  handleDelete={handleSubmiteDelete}/>} 
                      open={openDelete} 
                      title="Eliminar tipo de movimiento de inventario" 
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
