import ReactDom from 'react-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { DynamicForm, FeedSnackBar, ModalComponent, SearchElement, TableDataCustom } from "../../../../Components"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RecipProductionStore from '../../../../store/RecipProductionStore';
import { fetchPagedData } from '../../../../Api/HttpServer';
import useAuthStore from '../../../../store/AuthStore';
import { ProductColumns } from '../../../Productos/Helpers/ProductTable.helper';
import { ProductSearchOptions } from '../../../Productos/Helpers/ProductSearch';
import { formatProduct } from '../../../Productos/utils/FormatProduct';
import { CartProductionFormfields, Productpropert, initialCartDetailProduction, initialCartProduction, validationSchemaFormCartDetailProduction, validationSchemaFormCartProduction } from '../../Helpers/CartProduction';
import { ContainerElements } from '../../../../Components/ContainerElments/ContainerElements';
import { Cart } from '../../../../Components/Cart/Cart';
import { getUnitMeasureObject } from '../../../Common/services/actions';
import { formatUnitMeasureForSelect } from '../../../Common/utils/FormatUnitMeasure';
import { RequestHTTP } from '../../../../httpServer';

export const RegisterRecipProductions = () => {
  const { token } = useAuthStore();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { product, seterProduct, detailsproduction, 
    clearRecip, setRawMaterial, incrementRaw,  
    decrementRaw, eliminarRaw, name, amount  } = RecipProductionStore()
  
  const [setDataproduct, setsetDataproduct] = useState(null);
  const [DataProduct, setDataProduct] = useState(null);
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addRecip, setaddRecip] = useState(false);
  const handleaddRecipOpen = () => setaddRecip(true);
  const handleaddRecipClose = () => setaddRecip(false);
  
  const [successRecipProduct, setsuccessRecipProduct] = useState(false);
  const handlesuccessRecipProductOpen = () => setsuccessRecipProduct(true);
  const handlesuccessRecipProductClose = () => setsuccessRecipProduct(false);
  

  const [Message, setMessage] = useState("");
  const [typeSnack, setTypeSnack] = useState("success");
  const [openSnack, setOpenSnack] = useState(false);
  const handleOpenSnack = () => setOpenSnack(true);
  const handleCloseSnack = () => {
    setMessage("");
    setTypeSnack("");
    setOpenSnack(false)
  };

  const rawmaterials = useQuery({
    queryKey: ['products', { url: "/rawmaterial", page, rowsPerPage }],
    queryFn: fetchPagedData,
  });

  
  const productsSearchForRecip = useQuery({
    queryKey: ['productsSearchForRecip', { url: "/products", page, rowsPerPage, selectedOption, inputValue }],
    queryFn: fetchPagedData, enabled: false
  });

  const productsForRecip = useQuery({
    queryKey: ['productsForRecip', { url: "/products", page, rowsPerPage }],
    queryFn: fetchPagedData,
  });


  const unitmeasure = useQuery({
    queryKey: ['unitMeasure', {url:"/unitmeasure"}],
    queryFn: getUnitMeasureObject
  });

  const SelectProduct = (item) => {
    setsetDataproduct(item)
    handleaddRecipOpen()
  }
  
  const setDataRecip = (item) => {
    const recipDocument = {
      product: setDataproduct,
      name: item.name,
      amount: item.amount,
    }
    handleaddRecipClose()
    setsetDataproduct(null)
    seterProduct(recipDocument)
  }

  const SelectRawMaterial = (item)=> {
    setDataProduct(item);
    handleOpen()
  }

  const handleAddRawMaterial = (formdata) => {
    try {
      const unitmeasureId = unitmeasure.data.items
      .find((element) => element.id === formdata.unitmeasureId);
      setRawMaterial({...DataProduct, amount:formdata.amount, unitmeasureId })
      handleClose()
      setMessage("Producto agregado");
      setTypeSnack("success");
      handleOpenSnack();
    } catch (error) {
      setMessage(error);
      setTypeSnack("error");
      handleOpenSnack();
    }
  }

  const acceptProcess = async ()=>{
    const productiondetail = []
    for (const iterator of detailsproduction) {
      const { id, amount, unitmeasureId } = iterator
      let detail = {
        rawmaterialId: id,
        amount,
        unitmeasureId: unitmeasureId.id
      }
      productiondetail.push(detail)
    }
    const formData = {
      name,
      amount,
      productId: product.id,
      productiondetail
    }
    const response = await RequestHTTP("/recipproduction","POST",  formData, token);
    if (response.sucess) {
      clearRecip()
      handlesuccessRecipProductOpen()
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  }
  
  const navigate = useNavigate();

  const retorRecips = () => {
    navigate('/admin/produccion/recetas')  
  }
  
  
  if (!productsForRecip.data?.items) {
    return <h3>Sin datos</h3>
  }
  
  
  if (!unitmeasure.data?.items) {
    return <h1>Load</h1>
  }
  
  const CartDetailProductionFormfields = [
    {
      name: "amount",
      label: "Cantidad",
      type: "number",
      placeholder: "Ingrese la cantidad de la compra"
    },
    {
      name: 'unitmeasureId',
      label: 'Seleccione unidad de medida',
      type: 'number',
      isSelect: true,  
      options: formatUnitMeasureForSelect(unitmeasure.data)
    },
  ];
  
  return (
    <div>
      {(product === null) ?
        <div className="ContainerCustom">
          <Typography variant="h4">Seleccione Producto</Typography>
          <SearchElement
            inputValue={inputValue}
            setInputValue={setInputValue}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            refetch={productsSearchForRecip.refetch}
            options={ProductSearchOptions} />
          {!productsSearchForRecip.data ?
            <TableDataCustom
              columns={ProductColumns}
              data={productsForRecip.data}
              isLoading={productsForRecip.isLoading}
              page={page}
              refetch={productsForRecip.refetch}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              formatData={formatProduct}
              setData={SelectProduct}/> :
            <TableDataCustom
              columns={ProductColumns}
              data={productsSearchForRecip.data}
              isLoading={productsSearchForRecip.isLoading}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              refetch={productsSearchForRecip.refetch}
              setData={SelectProduct} 
              formatData={formatProduct}/>
          }
        </div>
        :
        <div className="containerProcess">
          <ContainerElements
            data={rawmaterials.data.items}
            propertys={Productpropert}
            actionBtn={SelectRawMaterial}/>
          <Cart
            data={detailsproduction}
            persone={"Producto:"}
            title={"Detalle de producción"}
            process={product.name}
            cancelProcess={clearRecip}
            incrementElement={incrementRaw}
            decrementElement={decrementRaw}
            deleted={eliminarRaw}
            acceptProcess={acceptProcess} 
            />
        </div>
      }
      {ReactDom.createPortal(<>
        <ModalComponent elemento={<DynamicForm
          fields={CartDetailProductionFormfields}
          initialValues={initialCartDetailProduction}
          validationSchema={validationSchemaFormCartDetailProduction}
          onSubmit={handleAddRawMaterial}
          titleButton={"Agregar"} />}
          open={open}
          title="Ingrese detalle de producción"
          handleClose={handleClose} />
        <ModalComponent elemento={<DynamicForm
          fields={CartProductionFormfields}
          initialValues={initialCartProduction}
          validationSchema={validationSchemaFormCartProduction}
          onSubmit={setDataRecip}
          titleButton={"aceptar"} />}
          open={addRecip}
          title="Ingrese datos del la receta"
          handleClose={handleaddRecipClose}/>
        <ModalComponent elemento={
          <>
            <Typography variant="h6">Precione aceptar para continuar</Typography>
            <Button variant="contained" onClick={retorRecips}>Aceptar</Button>
          </>}
          open={successRecipProduct}
          title="Receta registrada"
          handleClose={handlesuccessRecipProductClose} />
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
