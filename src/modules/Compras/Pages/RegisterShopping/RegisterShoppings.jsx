import ReactDom from 'react-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { fetchDatawitmParam, fetchPagedData } from '../../../../Api/HttpServer';
import useAuthStore from '../../../../store/AuthStore';
import { DynamicForm, FeedSnackBar, ModalComponent, SearchElement, TableSetData } from '../../../../Components';
import { ContainerElements } from '../../../../Components/ContainerElments/ContainerElements';
import { Cart } from '../../../../Components/Cart/Cart';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import shoppingStore from '../../../../store/ShoppingStore';
import { SupplierSearchOptions } from '../../../Proveedores/Helpers/SupplierSearch';
import { SupplierColumnsForShopping } from '../../Helpers/SupplierColumnsForShopping';
import { CartRawMaterialFormfields, ComercialDocumentFormfields, initialCartRawMaterial, initialComercialDocument, propert, validationSchemaFormCartRawMaterial, validationSchemaFormComercialDocument } from '../../Helpers/CartRawMaterial';
import { RequestHTTP } from '../../../../httpServer';
import { formatCardRaw } from '../../../materiaprima/utils/FormatRawMaterial';


export const RegisterShoppings = () => {
  const { token } = useAuthStore();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { supplier, commercialdocument, compra, datecommercialdocument, 
    totalCompra, setSupplierAndDocument, cleanCartShopping, addRawMaterial,
    incrementRawMaterial, decrementRawMaterial, DeletedRawMaterial} = shoppingStore();

  const [DataProduct, setDataProduct] = useState(null);
  const [setDataSupplier, setsetDataSupplier] = useState(null);


  const [succesShoping, setsuccesShoping] = useState(false);
  const handlesuccesShopingOpen = () => setsuccesShoping(true);
  const handlesuccesShopingClose = () => setsuccesShoping(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addsupplier, setaddsupplier] = useState(false);
  const handleaddsupplierOpen = () => setaddsupplier(true);
  const handleaddsupplierClose = () => setaddsupplier(false);

  const [Message, setMessage] = useState("");
  const [typeSnack, setTypeSnack] = useState("success");
  const [openSnack, setOpenSnack] = useState(false);
  const handleOpenSnack = () => setOpenSnack(true);
  const handleCloseSnack = () => {
    setMessage("");
    setTypeSnack("");
    setOpenSnack(false)
  };

  const suppliersSearchForShopping = useQuery({
    queryKey: ['suppliersSearchForShopping', { url: "/suppliers", page, rowsPerPage, selectedOption, 
    inputValue, token }],
    queryFn: fetchPagedData, enabled: false
  });

  const suppliersForShopping = useQuery({
    queryKey: ['suppliersForShopping', { url: "/suppliers", page, rowsPerPage, token }],
    queryFn: fetchPagedData,
  });

  const rawmaterial = useQuery({
    queryKey: ['rawmaterial', { url: "/rawmaterial", page, rowsPerPage, queryparam: "supplierId",  
    valuequery: supplier?.id, token}],
    queryFn: fetchDatawitmParam,
  });

  const AgredProduct = (item) => {
    handleOpen()
    setDataProduct(item); 
  }

  const handleAddProduct = (data) => {
    try {
      addRawMaterial({...DataProduct, ...data })
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

  const incrementProduct = (item) => {
    try {
      incrementRawMaterial(item);
      setMessage("Aumento producto");
      setTypeSnack("success");
      handleOpenSnack();
    } catch (error) {
      setMessage(error);
      setTypeSnack("error");
      handleOpenSnack();
    }
  }

  const decrementProduct = (item) => {
    decrementRawMaterial(item);
    setMessage("Decremento producto");
    setTypeSnack("success");
    handleOpenSnack();
  }

  const deleteProduct = (item) => {
    DeletedRawMaterial(item);
    setMessage("Elimino producto");
    setTypeSnack("success");
    handleOpenSnack();
  }

  const SelectSupplier = (item) => {
    setsetDataSupplier(item)
    handleaddsupplierOpen()
  }
  
  const setDocumentComercial = (item) => {
    const documentData = {
      supplier: setDataSupplier,
      document: item.document,
      datecommercialdocument: item.datecommercialdocument
    }
    setSupplierAndDocument(documentData)
    handleaddsupplierClose()
    setsetDataSupplier(null)
  }

  const AcceptSale = async ()=> {
    const shoppingdetail = []
    for (const iterator of compra) {
      const { price, id, amount, subtotal } = iterator
      let detail = {
        price,
        rawmaterialId: id,
        amount,
        subtotal
      }
      shoppingdetail.push(detail)
    }
    const formData = {
      supplierId: supplier.id,
      shoppingdetail,
      total: totalCompra,
      commercialdocument,
      datecommercialdocument
    }
    const response = await RequestHTTP("/shopping","POST",  formData, token);
    if (response.sucess) {
      cleanCartShopping()
      handlesuccesShopingOpen()
      if (inputValue) {
        suppliersSearchForShopping.refetch();
      }
      suppliersForShopping.refetch();
    }else{
      setMessage(`${response.mesague.message}`);
      setTypeSnack("error");
      handleOpenSnack();
    }
  }

  const navigate = useNavigate();

  const retorShopings = ()=> {
    navigate('/admin/compras/compras')
  }
  
  if (suppliersForShopping.data?.statusCode === 401 || suppliersSearchForShopping.data?.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }

  return (
    <>
      {(supplier === null && commercialdocument === null) ?
        <div className="ContainerCustom">
          <Typography variant="h4">Seleccione Proveedor</Typography>
          <SearchElement
            inputValue={inputValue}
            setInputValue={setInputValue}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            refetch={suppliersSearchForShopping.refetch}
            options={SupplierSearchOptions} />
          {!suppliersSearchForShopping.data ?
            <TableSetData
              columns={SupplierColumnsForShopping}
              data={suppliersForShopping.data}
              isLoading={suppliersForShopping.isLoading}
              page={page}
              refetch={suppliersForShopping.refetch}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              setData={SelectSupplier} /> :
            <TableSetData
              columns={SupplierColumnsForShopping}
              data={suppliersSearchForShopping.data}
              isLoading={suppliersSearchForShopping.isLoading}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              refetch={suppliersSearchForShopping.refetch}
              setData={SelectSupplier} />
          }
        </div>
        :
        <div className="containerProcess">
          <ContainerElements
            formatData={formatCardRaw}
            data={rawmaterial.data?.items}
            propertys={propert}
            actionBtn={AgredProduct}/>
          <Cart
            data={compra}
            persone={"Proveedor:"}
            title={"Detalle de compra"}
            process={supplier.namecontact}
            total={totalCompra}
            cancelProcess={cleanCartShopping} 
            incrementElement={incrementProduct}
            decrementElement={decrementProduct}
            deleted={deleteProduct}
            acceptProcess={AcceptSale}/>
        </div>
      }

      {ReactDom.createPortal(<>
        <ModalComponent elemento={<DynamicForm
          fields={CartRawMaterialFormfields}
          initialValues={initialCartRawMaterial}
          validationSchema={validationSchemaFormCartRawMaterial}
          onSubmit={handleAddProduct}
          titleButton={"Registrar"} />}
          open={open}
          title="Ingrese cantidad"
          handleClose={handleClose} />
        <ModalComponent elemento={<DynamicForm
          fields={ComercialDocumentFormfields}
          initialValues={initialComercialDocument}
          validationSchema={validationSchemaFormComercialDocument}
          onSubmit={setDocumentComercial}
          titleButton={"aceptar"} />}
          open={addsupplier}
          title="Ingrese datos del documento comercial"
          handleClose={handleaddsupplierClose} />
        <ModalComponent elemento={
          <>
            <Typography variant="h6">Precione aceptar para continuar</Typography>
            <Button variant="contained" onClick={retorShopings}>Aceptar</Button>
          </>}
          open={succesShoping}
          title="Compra registrada"
          handleClose={handlesuccesShopingClose} />
        <FeedSnackBar
          Close={handleCloseSnack}
          message={Message}
          open={openSnack}
          vertical={'bottom'}
          horizontal={'center'}
          type={typeSnack} />
      </>, document.getElementById('modals'))}
    </>
  )
}
