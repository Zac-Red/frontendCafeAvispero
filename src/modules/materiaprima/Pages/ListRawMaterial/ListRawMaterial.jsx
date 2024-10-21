import ReactDom from 'react-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useAuthStore from "../../../../store/AuthStore";
import { fetchPagedData } from "../../../../Api/HttpServer";
import { RequestHTTP } from "../../../../httpServer";
import { getUnitMeasure } from "../../../Common";
import { getSupplier } from "../../../Common/services/actions";
import { DynamicFormImg } from "../../../../Components/Forms/DynamicFormImg";
import { DeleteElement, FeedSnackBar, ModalComponent, SearchElement, TableDataCustom } from "../../../../Components";
import { RawMaterialColumns } from '../../Helpers/RawMaterialTable.helper';
import { RawMaterialSearchOptions } from '../../Helpers/RawMaterialSearch';
import { initialValuesCreatedRawMaterial, validationSchemaFormRawMaterial, validationSchemaFormRawMaterialUpdate, valuesUpdateRawMaterial } from '../../Helpers/RawMaterialForm.helper';
import { FormatRawMaterial } from '../../utils/FormatRawMaterial';
import axios from 'axios';

export const ListRawMaterial = () => {
  const { token } = useAuthStore();

  const [preview, setPreview] = useState(null);

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const rawmaterialSearch = useQuery({
    queryKey: ['rawmaterialsSearch', {url:"/rawmaterial", page, rowsPerPage, selectedOption, inputValue}],
    queryFn: fetchPagedData, enabled: false  
  });

  const rawmaterial = useQuery({
    queryKey: ['rawmaterials', {url:"/rawmaterial", page, rowsPerPage}],
    queryFn: fetchPagedData,
  });
  
  const unitmeasure = useQuery({
    queryKey: ['unitMeasure', {url:"/unitmeasure"}],
    queryFn: getUnitMeasure
  });

  const supplier = useQuery({
    queryKey: ['supplier', {url:"/suppliers"}],
    queryFn: getSupplier
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
  const [idProduct, setidProduct] = useState("");

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
    const { image, ...restData } = formData;
    const nwformData = new FormData();
    try {
      nwformData.append('file', image);
      nwformData.append('upload_preset', import.meta.env.VITE_FILECLOUDINARY);
      const res = await axios.post(`${import.meta.env.VITE_URLCLOUDINARY}`, nwformData);
      const newproduct = { ...restData, url: res.data.secure_url, }
      if (res.data.secure_url) {
        const response = await RequestHTTP("/rawmaterial","POST",  newproduct, token);
        if (response.sucess) {
          handleClose();
          setMessage("Registro ingresado con éxito");
          setTypeSnack("success");
          handleOpenSnack();
          if (inputValue) {
            rawmaterialSearch.refetch();
          }
          rawmaterial.refetch();
        }else{
          setMessage(`${response.mesague.message}`);
          setTypeSnack("error");
          handleOpenSnack();
        }
      }else{
        setMessage(`${response.mesague.message}`);
        setTypeSnack("error");
        handleOpenSnack();
      }
    } catch (error) {
      setMessage(`${error}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };
  
  const handleSubmitUpdate = async (formData) => {
    const { image, ...restData } = formData;
    if (typeof image === 'string') {
      const response = await RequestHTTP(`/rawmaterial/${idProduct}`, "PATCH", formData, token);
      if (response.sucess) {
        handleCloseUpdate();
        setMessage("Registro actualizado con éxito");
        setTypeSnack("success");
        handleOpenSnack();
        if (inputValue) {
          rawmaterialSearch.refetch();
        }
        rawmaterial.refetch();
      }else{
        setMessage(`${response.mesague.message}`);
        setTypeSnack("error");
        handleOpenSnack();
      }
    }
    try {
      if (image instanceof File) {
        const nwformData = new FormData();
        nwformData.append('file', image);
        nwformData.append('upload_preset', import.meta.env.VITE_FILECLOUDINARY);
        const res = await axios.post(`${import.meta.env.VITE_URLCLOUDINARY}`, nwformData);
        const newproduct = { ...restData, url: res.data.secure_url, }
        if (res.data.secure_url) {
          const response = await RequestHTTP(`/rawmaterial/${idProduct}`, "PATCH", newproduct, token);
          if (response.sucess) {
            handleCloseUpdate();
            setMessage("Registro actualizado con éxito");
            setTypeSnack("success");
            handleOpenSnack();
            if (inputValue) {
              rawmaterialSearch.refetch();
            }
            rawmaterial.refetch();
          }else{
            setMessage(`${response.mesague.message}`);
            setTypeSnack("error");
            handleOpenSnack();
          }
        } else {
          setMessage(`${response.mesague.message}`);
          setTypeSnack("error");
          handleOpenSnack();
        }
      }
    } catch (error) {
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };
  
  const handleSubmiteDelete = async () => {
    const response = await RequestHTTP(`/rawmaterial/${idProduct}`,"DELETE", {}, token);
    if (response.sucess) {
      handleCloseDelete();
      setMessage("Registro eliminado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        rawmaterialSearch.refetch();
      }
      rawmaterial.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };
  

  const handleUpdate = (item) => {
    setUpdateData(valuesUpdateRawMaterial(item));
    setidProduct(item.id);
    setPreview(item.url)
    handleOpenUpdate();
  }


  const handledelete = async (item) => {
    setidProduct(item.id);
    handleOpenDelete();
  }

  const navigate = useNavigate();
  const SeeData = ({id}) => {
    navigate(`/admin/materiaprima/materiaprima/${id}`);
  }

  const RawMaterialFormfields = [
    {
      name: "name",
      label: "Nombre de producto",
      type: "text",
      placeholder: "Ingrese el nombre de producto"
    },
    {
      name: "description",
      label: "Descripción",
      type: "text",
      placeholder: "Ingrese descripción"
    },
    {
      name: "price",
      label: "Precio",
      type: "number",
      placeholder: "Ingrese el precio"
    },
    {
      name: 'supplierId',
      label: 'Seleccione un proveedor',
      type: 'string',
      isSelect: true,  
      options: supplier.data
    },
    {
      name: 'unitmeasureId',
      label: 'Seleccione unidad de medida',
      type: 'number',
      isSelect: true,  
      options: unitmeasure.data
    },
  ];

  return (
    <div className="ContainerCustom">
      <button className="topButton" onClick={() => handleOpen()}>
        <span className="topButtontransition"></span>
        <span className="topButtongradient"></span>
        <span className="topButtonlabel">Registrar materia prima</span>
      </button>
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
          updateFuntion={handleUpdate}
          deleteFuntion={handledelete} 
          seeData={SeeData}/>
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
          updateFuntion={handleUpdate}
          deleteFuntion={handledelete} 
          seeData={SeeData}/>}
      {ReactDom.createPortal(<>
        <ModalComponent elemento={<DynamicFormImg
          setPreview={setPreview}
          preview={preview}
          fields={RawMaterialFormfields}
          initialValues={initialValuesCreatedRawMaterial}
          validationSchema={validationSchemaFormRawMaterial}
          onSubmit={handleSubmit}
          titleButton={"Registrar"}
          StylesForm="FormProduct" />}
          open={open}
          title="Ingrese Producto"
          handleClose={handleClose} />
        <ModalComponent elemento={<DynamicFormImg
          setPreview={setPreview}
          preview={preview}
          fields={RawMaterialFormfields}
          initialValues={updateData}
          validationSchema={validationSchemaFormRawMaterialUpdate}
          onSubmit={handleSubmitUpdate}
          titleButton={"Actualizar"}
          StylesForm="FormProduct" />}
          open={openUpdate}
          title="Actualizar materia prima"
          handleClose={handleCloseUpdate} />
        <ModalComponent elemento={<DeleteElement
          question={"¿Desea eliminar materia prima?"}
          cancelDelete={handleCloseDelete}
          handleDelete={handleSubmiteDelete} />}
          open={openDelete}
          title="Eliminar Materia prima"
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
