import ReactDom from 'react-dom';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useAuthStore from "../../../../store/AuthStore";
import { fetchPagedData, fetchPagedDataSearch, fetchPagedDatanotSearch } from "../../../../Api/HttpServer";
import {
  initialValuesCreatedProduct, validationSchemaFormProduct,
  validationSchemaFormProductUpdate, valuesUpdateProduct
} from "../../Helpers/ProductForm.helper";
import { DeleteElement, FeedSnackBar, ModalComponent, SearchElement, TableDataCustom } from "../../../../Components";
import { RequestHTTP } from '../../../../httpServer';
import { ProductColumns } from '../../Helpers/ProductTable.helper';
import { ProductSearchOptions } from '../../Helpers/ProductSearch';
import { DynamicFormImg } from '../../../../Components/Forms/DynamicFormImg';
import { getUnitMeasure } from '../../../Common';
import { formatProduct } from '../../utils/FormatProduct';
import axios from 'axios';

export const ListProducts = () => {
  const { token } = useAuthStore();

  const [preview, setPreview] = useState(null);

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const productSearch = useQuery({
    queryKey: ['productsSearch', { url: "/products", page, rowsPerPage, selectedOption, 
    inputValue, token }],
    queryFn: fetchPagedDataSearch, enabled: false
  });

  const product = useQuery({
    queryKey: ['products', { url: "/products", page, rowsPerPage, token }],
    queryFn: fetchPagedDatanotSearch, enabled: inputValue ? false : true
  });

  const unitmeasure = useQuery({
    queryKey: ['unitMeasure', { url: "/unitmeasure", token }],
    queryFn: getUnitMeasure
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setPreview(null);
    setOpen(false);
  }

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => {
    setPreview(null);
    setOpenUpdate(false);
  }

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

  const handleSubmit = async (formData) => {
    const { image, ...restData } = formData;
    const nwformData = new FormData();
    if (image) {
      try {
        nwformData.append('file', image);
        nwformData.append('upload_preset', import.meta.env.VITE_FILECLOUDINARY);
        const res = await axios.post(`${import.meta.env.VITE_URLCLOUDINARY}`, nwformData);
        const newproduct = { ...restData, url: res.data.secure_url, }
        if (res.data.secure_url) {
          const response = await RequestHTTP("/products", "POST", newproduct, token);
          if (response.sucess) {
            handleClose();
            setMessage("Registro ingresado con éxito");
            setTypeSnack("success");
            handleOpenSnack();
            if (inputValue) {
              productSearch.refetch();
            }
            product.refetch();
          } else {
            setMessage(`${response.mesague.message}`);
            setTypeSnack("error");
            handleOpenSnack();
          }
        } else {
          setMessage(`${response.mesague.message}`);
          setTypeSnack("error");
          handleOpenSnack();
        }
      } catch (error) {
        setMessage(`${error}`);
        setTypeSnack("error");
        handleOpenSnack();
      }
    } else {
      const response = await RequestHTTP("/products","POST",  formData, token);
      if (response.sucess) {
        handleClose();
        setMessage("Registro ingresado con éxito");
        setTypeSnack("success");
        handleOpenSnack();
        if (inputValue) {
          productSearch.refetch();
        }
        product.refetch();
      }else{
        setMessage(`${response.mesague.message}`);
        setTypeSnack("error");
        handleOpenSnack();
      }
    }
    setPreview(null);
  };

  const handleSubmitUpdate = async (formData) => {
    const { image, ...restData } = formData;
    if (typeof image === 'string' || !image) {
      const response = await RequestHTTP(`/products/${idProduct}`, "PATCH", formData, token);
      if (response.sucess) {
        handleCloseUpdate();
        setMessage("Registro actualizado con éxito");
        setTypeSnack("success");
        handleOpenSnack();
        if (inputValue) {
          productSearch.refetch();
        }
        product.refetch();
      } else {
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
          const response = await RequestHTTP(`/products/${idProduct}`, "PATCH", newproduct, token);
          if (response.sucess) {
            handleCloseUpdate();
            setMessage("Registro actualizado con éxito");
            setTypeSnack("success");
            handleOpenSnack();
            if (inputValue) {
              productSearch.refetch();
            }
            product.refetch();
          } else {
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
    setPreview(null);
  };

  const handleSubmiteDelete = async () => {
    const response = await RequestHTTP(`/products/${idProduct}`, "DELETE", {}, token);
    if (response.sucess) {
      handleCloseDelete();
      setMessage("Registro eliminado con éxito");
      setTypeSnack("success");
      handleOpenSnack();
      if (inputValue) {
        productSearch.refetch();
      }
      product.refetch();
    } else {
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };

  const handleUpdate = (item) => {
    setUpdateData(valuesUpdateProduct(item));
    setidProduct(item.id);
    setPreview(item.url)
    handleOpenUpdate();
  }


  const handledelete = async (item) => {
    setidProduct(item.id);
    handleOpenDelete();
  }


  const navigate = useNavigate();
  const SeeData = ({ id }) => {
    navigate(`/admin/productos/producto/${id}`);
  }

  const ProductsFormfields = [
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
      name: 'unitmeasureId',
      label: 'Seleccione unidad de medida',
      type: 'number',
      isSelect: true,
      options: unitmeasure.data
    },
  ];

  useEffect(() => {
    if (inputValue) {
      productSearch.refetch();
    }
  }, [page, rowsPerPage]);

  if (product.data?.statusCode === 401 || productSearch.data?.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }
  return (
    <div className="ContainerCustom">
      <button className="topButton" onClick={() => handleOpen()}>
        <span className="topButtontransition"></span>
        <span className="topButtongradient"></span>
        <span className="topButtonlabel">Registrar producto</span>
      </button>
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={productSearch.refetch}
        options={ProductSearchOptions} />
      {!productSearch.data?.items ?
        <TableDataCustom
          data={product.data}
          isLoading={product.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={product.refetch}
          columns={ProductColumns}
          formatData={formatProduct}
          updateFuntion={handleUpdate}
          deleteFuntion={handledelete}
          seeData={SeeData} />
        :
        <TableDataCustom
          data={productSearch.data}
          isLoading={productSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={productSearch.refetch}
          columns={ProductColumns}
          formatData={formatProduct}
          updateFuntion={handleUpdate}
          deleteFuntion={handledelete}
          seeData={SeeData} />}
      {ReactDom.createPortal(<>
        <ModalComponent elemento={<DynamicFormImg
          setPreview={setPreview}
          preview={preview}
          fields={ProductsFormfields}
          initialValues={initialValuesCreatedProduct}
          validationSchema={validationSchemaFormProduct}
          onSubmit={handleSubmit}
          titleButton={"Registrar"}
          StylesForm="FormProduct" />}
          open={open}
          title="Ingrese producto"
          handleClose={handleClose} />
        <ModalComponent elemento={<DynamicFormImg
          setPreview={setPreview}
          preview={preview}
          fields={ProductsFormfields}
          initialValues={updateData}
          validationSchema={validationSchemaFormProductUpdate}
          onSubmit={handleSubmitUpdate}
          titleButton={"Actualizar"}
          StylesForm="FormProduct" />}
          open={openUpdate}
          title="Actualizar producto"
          handleClose={handleCloseUpdate} />
        <ModalComponent elemento={<DeleteElement
          question={"¿Desea eliminar producto?"}
          cancelDelete={handleCloseDelete}
          handleDelete={handleSubmiteDelete} />}
          open={openDelete}
          title="Eliminar Producto"
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
