import ReactDom from 'react-dom';
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { DynamicForm, FeedSnackBar, ModalComponent, SearchElement, TableDataCustom } from '../../../../Components';
import { fetchPagedData } from '../../../../Api/HttpServer';
import { formatRecipProduction } from "../../utils/FormatProduction";
import { RecipProductionColumns } from "../../Helpers/ProductionColumnsTable";
import { ProductionFormfields, initialProductionForm, validationSchemaFormProduction } from '../../Helpers/ProductionForm';
import { RequestHTTP } from '../../../../httpServer';
import useAuthStore from '../../../../store/AuthStore';
import { RecipProductionSearchOptions } from '../../Helpers/ProductionSearch';

export const RegisterProductions = () => {
  const { token } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [DataRecipProduct, setDataRecipProduct] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [successProduction, setsuccessProduction] = useState(false);
  const handlesuccessProductionOpen = () => setsuccessProduction(true);
  const handlesuccessProductionClose = () => setsuccessProduction(false);
  
  const [Message, setMessage] = useState("");
  const [typeSnack, setTypeSnack] = useState("success");
  const [openSnack, setOpenSnack] = useState(false);
  const handleOpenSnack = () => setOpenSnack(true);
  const handleCloseSnack = () => {
    setMessage("");
    setTypeSnack("");
    setOpenSnack(false)
  };

  const recipproductionSearch = useQuery({
    queryKey: ['recipproductionSearch', { url: "/recipproduction", page, rowsPerPage, selectedOption,
    inputValue, token }],
    queryFn: fetchPagedData, enabled: false
  });

  const recipproduction = useQuery({
    queryKey: ['recipproduction', { url: "/recipproduction", page, rowsPerPage, token}],
    queryFn: fetchPagedData,
  });

  const seterRecip = (item) => {
    setDataRecipProduct(item)
    handleOpen();
  }

  const handleProduction = async (formData) => {
    const production = {
      recipproductionId: DataRecipProduct.id,
      ...formData
    }
    const response = await RequestHTTP("/productions","POST",  production, token);
    if (response.sucess) {
      handlesuccessProductionOpen()
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  }

  const navigate = useNavigate();

  const retorProductions = () => {
    navigate('/admin/produccion/producciones')  
  }

  if (recipproduction.data?.statusCode === 401 || recipproductionSearch.data?.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }
  return (
    <div className="ContainerCustom">
      <Typography variant="h4">Seleccione Receta</Typography>
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={recipproductionSearch.refetch}
        options={RecipProductionSearchOptions} />
      {!recipproductionSearch.data ?
        <TableDataCustom
          data={recipproduction.data}
          isLoading={recipproduction.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={recipproduction.refetch}
          columns={RecipProductionColumns}
          formatData={formatRecipProduction}
          setData={seterRecip} />
        :
        <TableDataCustom
          data={recipproductionSearch.data}
          isLoading={recipproductionSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={recipproductionSearch.refetch}
          columns={RecipProductionColumns}
          formatData={formatRecipProduction}
          setData={seterRecip} />}
      {ReactDom.createPortal(<>
        <ModalComponent elemento={<DynamicForm
          fields={ProductionFormfields}
          initialValues={initialProductionForm}
          validationSchema={validationSchemaFormProduction}
          onSubmit={handleProduction}
          titleButton={"Agregar"} />}
          open={open}
          title="Ingrese producción"
          handleClose={handleClose} />
        <ModalComponent elemento={
          <>
            <Typography variant="h6">Precione aceptar para continuar</Typography>
            <Button variant="contained" onClick={retorProductions}>Aceptar</Button>
          </>}
          open={successProduction}
          title="Producción registrada"
          handleClose={handlesuccessProductionClose} />
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
