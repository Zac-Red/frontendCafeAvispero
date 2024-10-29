import ReactDom from 'react-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalComponent, DynamicForm, DeleteElement, FeedSnackBar,
  SearchElement, TableDataCustom } from "../../../../Components"
import { fetchPagedData } from "../../../../Api/HttpServer";
import useAuthStore from "../../../../store/AuthStore";
import { RequestHTTP } from "../../../../httpServer";
import { ClientFormfields, ValuesUpdateClient, initialValuesCreatedClient, validationSchemaFormClient } from "../../Helpers/ClientFormFields.helper";
import { ClientColumns } from "../../Helpers/ClientColumnsTable.helpr";
import { useQuery } from '@tanstack/react-query';
import { ClientSearchOptions } from "../../Helpers/ClientSearch";
import { formatCostumer } from '../../utils/FormatCostumer';

export const ListClients = () => {
  const { token } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const clientSearch = useQuery({
    queryKey: ['clientSearch', { url: "/customers", page, rowsPerPage, selectedOption, inputValue, token }],
    queryFn: fetchPagedData, enabled: false
  });

  const client = useQuery({
    queryKey: ['client', { url: "/customers", page, rowsPerPage, token }],
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
  const [idClient, setidClient] = useState("");

  const [openSnack, setOpenSnack] = useState(false);
  const handleOpenSnack = () => setOpenSnack(true);
  const handleCloseSnack = () => {
    setMessage("");
    setTypeSnack("");
    setOpenSnack(false)
  };
  const [Message, setMessage] = useState("");
  const [typeSnack, setTypeSnack] = useState("success");

  const handleSubmit = async (formData) => {
    const response = await RequestHTTP("/customers", "POST", formData, token);
    if (response.sucess) {
      handleClose();
      setMessage("Registro ingresado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        clientSearch.refetch();
      }
      client.refetch();
    } else {
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };

  const handleSubmitUpdate = async (formData) => {
    const response = await RequestHTTP(`/customers/${idClient}`, "PATCH", formData, token);
    if (response.sucess) {
      handleCloseUpdate();
      setMessage("Registro actualizado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        clientSearch.refetch();
      }
      client.refetch();
    } else {
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };

  const handleSubmiteDelete = async () => {
    const response = await RequestHTTP(`/customers/${idClient}`, "DELETE", {}, token);
    if (response.sucess) {
      handleCloseDelete();
      setMessage("Registro eliminado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        clientSearch.refetch();
      }
      client.refetch();
    } else {
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };


  const handleUpdate = (item) => {
    setUpdateData(ValuesUpdateClient(item));
    setidClient(item.id);
    handleOpenUpdate();
  }


  const handledelete = async (item) => {
    setidClient(item.id);
    handleOpenDelete();
  }

  const navigate = useNavigate();
  const SeeData = ({ id }) => {
    navigate(`/admin/clientes/cliente/${id}`);
  }

  if (client.data?.statusCode === 401 || clientSearch.data?.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }
  return (
    <div className="ContainerCustom">
      <button className="topButton" onClick={() => handleOpen()}>
        <span className="topButtontransition"></span>
        <span className="topButtongradient"></span>
        <span className="topButtonlabel">Registrar cliente</span>
      </button>
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={clientSearch.refetch}
        options={ClientSearchOptions} />
      {!clientSearch.data ?
        <TableDataCustom
          data={client.data}
          isLoading={client.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={client.refetch}
          columns={ClientColumns}
          formatData={formatCostumer}
          updateFuntion={handleUpdate}
          deleteFuntion={handledelete}
          seeData={SeeData} />
        :
        <TableDataCustom
          data={clientSearch.data}
          isLoading={clientSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={clientSearch.refetch}
          columns={ClientColumns}
          formatData={formatCostumer}
          updateFuntion={handleUpdate}
          deleteFuntion={handledelete}
          seeData={SeeData} />}
      {ReactDom.createPortal(
        <>
          <ModalComponent elemento={<DynamicForm
            fields={ClientFormfields}
            initialValues={initialValuesCreatedClient}
            validationSchema={validationSchemaFormClient}
            onSubmit={handleSubmit}
            titleButton={"Registrar"} />}
            open={open}
            title="Ingrese cliente"
            handleClose={handleClose} />
          <ModalComponent elemento={<DynamicForm
            fields={ClientFormfields}
            initialValues={updateData}
            validationSchema={validationSchemaFormClient}
            onSubmit={handleSubmitUpdate}
            titleButton={"Actualizar"} />}
            open={openUpdate}
            title="Actualizar cliente"
            handleClose={handleCloseUpdate} />
          <ModalComponent elemento={<DeleteElement
            question={"¿Desea eliminar cliente?"}
            cancelDelete={handleCloseDelete}
            handleDelete={handleSubmiteDelete} />}
            open={openDelete}
            title="Eliminar cliente"
            handleClose={handleCloseDelete} />
          <FeedSnackBar
            Close={handleCloseSnack}
            message={Message}
            open={openSnack}
            vertical={'bottom'}
            horizontal={'center'}
            type={typeSnack} />
        </>
        , document.getElementById('modals'))
      }
    </div>
  )
}
