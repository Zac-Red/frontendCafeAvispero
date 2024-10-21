import ReactDom from 'react-dom';
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { RequestHTTP } from '../../../../httpServer';
import { fetchPagedData } from '../../../../Api/HttpServer';
import useAuthStore from '../../../../store/AuthStore';
import { DeleteElement, DynamicForm, FeedSnackBar, ModalComponent, SearchElement, TableDataCustom } from '../../../../Components';
import { UnitMeasureFormfields, initialValuesCreatedUnitMeasure, validationSchemaFormUnitMeasure, valuesUpdateUnitMeasure } from '../../Helpers/UnitMeasureForm.helper';
import { UnitMeasureColumns } from '../../Helpers/UnitMeasureTable.helper';
import { UnitMeasureSearchOptions } from '../../Helpers/UnitMeasureSearch';
import { formatUnitMeasure } from '../../utils/FormatUnitMeasure';

export const ListUnitMeasure = () => {
  const { token } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const unitmeasureSearch = useQuery({
    queryKey: ['unitmeasureSearch', { url: "/unitmeasure", page, rowsPerPage, selectedOption, inputValue }],
    queryFn: fetchPagedData, enabled: false
  });

  const unitmeasure = useQuery({
    queryKey: ['unitmeasures', { url: "/unitmeasure", page, rowsPerPage }],
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
  const [idunitmeasure, setidunitmeasure] = useState("");

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
    const response = await RequestHTTP("/unitmeasure", "POST", formData, token);
    if (response.sucess) {
      handleClose();
      setMessage("Registro ingresado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        unitmeasureSearch.refetch();
      }
      unitmeasure.refetch();
    } else {
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };

  const handleSubmitUpdate = async (formData) => {
    const response = await RequestHTTP(`/unitmeasure/${idunitmeasure}`, "PATCH", formData, token);
    if (response.sucess) {
      handleCloseUpdate();
      setMessage("Registro actualizado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        unitmeasureSearch.refetch();
      }
      unitmeasure.refetch();
    } else {
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };

  const handleSubmiteDelete = async () => {
    const response = await RequestHTTP(`/unitmeasure/${idunitmeasure}`, "DELETE", {}, token);
    if (response.sucess) {
      handleCloseDelete();
      setMessage("Registro eliminado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        unitmeasureSearch.refetch();
      }
      unitmeasure.refetch();
    } else {
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };


  const handleUpdate = (item) => {
    setUpdateData(valuesUpdateUnitMeasure(item));
    setidunitmeasure(item.id);
    handleOpenUpdate();
  }


  const handledelete = async (item) => {
    setidunitmeasure(item.id);
    handleOpenDelete();
  }

  return (
    <div className="ContainerCustom">
      <button className="topButton" onClick={() => handleOpen()}>
        <span className="topButtontransition"></span>
        <span className="topButtongradient"></span>
        <span className="topButtonlabel">Registrar unidad de medida</span>
      </button>
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={unitmeasureSearch.refetch}
        options={UnitMeasureSearchOptions} />
      {!unitmeasureSearch.data ?
        <TableDataCustom
          data={unitmeasure.data}
          isLoading={unitmeasure.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={unitmeasure.refetch}
          columns={UnitMeasureColumns}
          formatData={formatUnitMeasure}
          updateFuntion={handleUpdate}
          deleteFuntion={handledelete} />
        :
        <TableDataCustom
          data={unitmeasureSearch.data}
          isLoading={unitmeasureSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={unitmeasureSearch.refetch}
          columns={UnitMeasureColumns}
          formatData={formatUnitMeasure}
          updateFuntion={handleUpdate}
          deleteFuntion={handledelete} />}
      {ReactDom.createPortal(<>
        <ModalComponent elemento={<DynamicForm
          fields={UnitMeasureFormfields}
          initialValues={initialValuesCreatedUnitMeasure}
          validationSchema={validationSchemaFormUnitMeasure}
          onSubmit={handleSubmit}
          titleButton={"Registrar"} />}
          open={open}
          title="Ingrese Unidad"
          handleClose={handleClose} />
        <ModalComponent elemento={<DynamicForm
          fields={UnitMeasureFormfields}
          initialValues={updateData}
          validationSchema={validationSchemaFormUnitMeasure}
          onSubmit={handleSubmitUpdate}
          titleButton={"Actualizar"} />}
          open={openUpdate}
          title="Actualizar Unidad"
          handleClose={handleCloseUpdate} />
        <ModalComponent elemento={<DeleteElement
          question={"¿Desea eliminar una unidad de medida?"}
          cancelDelete={handleCloseDelete}
          handleDelete={handleSubmiteDelete} />}
          open={openDelete}
          title="Eliminar unidad de medida"
          handleClose={handleCloseDelete} />
        <FeedSnackBar
          Close={handleCloseSnack}
          message={Message}
          open={openSnack}
          vertical={'bottom'}
          horizontal={'center'}
          type={typeSnack} />
      </>, document.getElementById('modals'))}
    </div>
  )
}
