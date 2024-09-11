import ReactDom from 'react-dom';
import { useState } from "react";
import useAuthStore from "../../../../store/AuthStore";
import { fetchPagedData } from "../../../../Api/HttpServer";
import { getUnitMeasure } from "../../service/actions";
import { initialValuesCreatedProduct, validationSchemaFormProduct, valuesUpdateProduct } from "../../Helpers/ProductForm.helper";
import { DeleteElement, DynamicForm, FeedSnackBar, ModalComponent, SearchElement, TableDataCustom } from "../../../../Components";
import { RequestHTTP } from '../../../../httpServer';
import { ProductColumns } from '../../Helpers/ProductTable.helper';
import { useQuery } from '@tanstack/react-query';
import { ProductSearchOptions } from '../../Helpers/ProductSearch';


export const ListProducts = () => {
  const { token } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const productSearch = useQuery({
    queryKey: ['productsSearch', {url:"/products", page, rowsPerPage, selectedOption, inputValue}],
    queryFn: fetchPagedData, enabled: false  
  });

  const product = useQuery({
    queryKey: ['products', {url:"/products", page, rowsPerPage}],
    queryFn: fetchPagedData,
  });
  
  const unitmeasure = useQuery({
    queryKey: ['unitMeasure', {url:"/unitmeasure"}],
    queryFn: getUnitMeasure
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
  };
  
  const handleSubmitUpdate = async (formData) => {
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
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  };
  
  const handleSubmiteDelete = async () => {
    const response = await RequestHTTP(`/products/${idProduct}`,"DELETE", {}, token);
    if (response.sucess) {
      handleCloseDelete();
      setMessage("Registro eliminado con éxito");
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
  };
  

  const handleUpdate = (item) => {
    setUpdateData(valuesUpdateProduct(item));
    setidProduct(item.id);
    handleOpenUpdate();
  }


  const handledelete = async (item) => {
    setidProduct(item.id);
    handleOpenDelete();
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
    }
  ];
  
  return (
    <div className="ContainerCustom">
      <button onClick={()=>handleOpen()}>Registrar producto</button>
        <SearchElement 
          inputValue={inputValue} 
          setInputValue={setInputValue}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          refetch={productSearch.refetch}
          options={ProductSearchOptions}/>
        {!productSearch.data ? 
          <TableDataCustom
          data={product.data}
          isLoading={product.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={product.refetch}
          columns={ProductColumns} 
          updateFuntion={handleUpdate} 
          deleteFuntion={handledelete}/>
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
          updateFuntion={handleUpdate} 
          deleteFuntion={handledelete}/>}
        { ReactDom.createPortal(<>
        <ModalComponent elemento={<DynamicForm 
                      fields={ProductsFormfields} 
                      initialValues={initialValuesCreatedProduct} 
                      validationSchema={validationSchemaFormProduct}
                      onSubmit={handleSubmit}
                      titleButton={"Registrar"}/>} 
                      open={open} 
                      title="Ingrese Producto" 
                      handleClose={handleClose}/>
        <ModalComponent elemento={<DynamicForm 
                      fields={ProductsFormfields} 
                      initialValues={updateData} 
                      validationSchema={validationSchemaFormProduct}
                      onSubmit={handleSubmitUpdate}
                      titleButton={"Actualizar"}/>} 
                      open={openUpdate} 
                      title="Actualizar producto" 
                      handleClose={handleCloseUpdate}/>
        <ModalComponent elemento={<DeleteElement
                                    question={"¿Desea eliminar producto?"} 
                                    cancelDelete={handleCloseDelete} 
                                    handleDelete={handleSubmiteDelete}/>} 
                        open={openDelete} 
                        title="Eliminar Producto" 
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
