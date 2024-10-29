import ReactDom from 'react-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useAuthStore from "../../../../store/AuthStore";
import { fetchPagedData } from "../../../../Api/HttpServer";
import { RequestHTTP } from "../../../../httpServer";
import { getUnitMeasure } from "../../../Common";
import { DynamicForm, FeedSnackBar, ModalComponent, SearchElement, TableDataCustom } from "../../../../Components";
import { RawMaterialSearchOptions } from '../../Helpers/RawMaterialSearch';
import { FormatRawMaterial } from '../../utils/FormatRawMaterial';
import { RawMaterialColumns } from '../../Helpers/RawMaterialTable.helper';
import { initialValuesRefineRawMaterial, validationSchemaFormRefineRawMaterial } from '../../Helpers/RawMaterialForm.helper';

export const RefineRawMaterial = () => {
  const { token } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rawmaterialSearch = useQuery({
    queryKey: ['rawmaterialsSearch', {
      url: "/rawmaterial", page, rowsPerPage, selectedOption,
      inputValue, token
    }],
    queryFn: fetchPagedData, enabled: false
  });

  const rawmaterial = useQuery({
    queryKey: ['rawmaterials', { url: "/rawmaterial", page, rowsPerPage, token }],
    queryFn: fetchPagedData,
  });

  const unitmeasure = useQuery({
    queryKey: ['unitMeasure', { url: "/unitmeasure", token }],
    queryFn: getUnitMeasure
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  const [openSucessRefine, setOpenSucessRefine] = useState(false);
  const handleOpenSucessRefine = () => setOpenSucessRefine(true);
  const handleCloseSucessRefine = () => {
    setOpenSucessRefine(false);
  }

  const [idRaw, setidRaw] = useState(null);

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
    const newForData = {
      rawmaterialId: idRaw.id,
      ...formData
    }
    const response = await RequestHTTP("/refinerawmaterial", "POST", newForData, token);
    if (response.sucess) {
      handleClose();
      handleOpenSucessRefine();
      if (inputValue) {
        rawmaterialSearch.refetch();
      }
      rawmaterial.refetch();
    } else {
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };

  const handleSetRaw = (item) => {
    setidRaw(item)
    handleOpen()
  };


  const RefienFormfields = [
    {
      name: "amount",
      label: "Cantidad refinada",
      type: "number",
      placeholder: "Ingrese la cantidad refinada"
    },
    {
      name: 'unitmeasureId',
      label: 'Seleccione unidad de medida',
      type: 'number',
      isSelect: true,
      options: unitmeasure.data
    },
  ];

  const navigate = useNavigate();

  const retorRefines = ()=> {
    navigate('/admin/materiaprima/kardex')
  }
  
  if (rawmaterial.data?.statusCode === 401 || rawmaterialSearch.data?.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }
  return (
    <div className="ContainerCustom">
      <Typography variant="h4">Seleccione Materia prima</Typography>
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={rawmaterialSearch.refetch}
        options={RawMaterialSearchOptions} />
      {!rawmaterialSearch.data ?
        <TableDataCustom
          data={rawmaterial.data}
          isLoading={rawmaterial.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={rawmaterial.refetch}
          columns={RawMaterialColumns}
          formatData={FormatRawMaterial}
          setData={handleSetRaw}/>
        :
        <TableDataCustom
          data={rawmaterialSearch.data}
          isLoading={rawmaterialSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={rawmaterialSearch.refetch}
          columns={RawMaterialColumns}
          formatData={FormatRawMaterial}
          setData={handleSetRaw}/>}
      {ReactDom.createPortal(<>
        <ModalComponent elemento={<DynamicForm
          fields={RefienFormfields}
          initialValues={initialValuesRefineRawMaterial}
          validationSchema={validationSchemaFormRefineRawMaterial}
          onSubmit={handleSubmit}
          titleButton={"Registrar"}
          StylesForm="FormProduct" />}
          open={open}
          title="Registre refinado de materia prima"
          handleClose={handleClose}/>
        <ModalComponent elemento={
          <>
            <Typography variant="h6">Precione aceptar para continuar</Typography>
            <Button variant="contained" onClick={retorRefines}>Aceptar</Button>
          </>}
          open={openSucessRefine}
          title="Materia prima registrada"
          handleClose={handleCloseSucessRefine} />
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
