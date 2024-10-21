import ReactDom from 'react-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { fetchPagedData } from '../../../../Api/HttpServer';
import { Cart } from "../../../../Components/Cart/Cart"
import { ContainerElements } from "../../../../Components/ContainerElments/ContainerElements"
import cartStore from '../../../../store/CartStore';
import { DynamicForm, FeedSnackBar, ModalComponent, SearchElement, TableSetData } from '../../../../Components';
import { ClientSearchOptionsForSales } from '../../Helpers/ClientSearchForSale';
import { ClientColumnsForSale } from '../../Helpers/ClientColumnsForSale';
import { CartProductFormfields, initialCartProduct, propert, validationSchemaFormCartProduct } from '../../Helpers/CartProduct';
import { RequestHTTP } from '../../../../httpServer';
import useAuthStore from '../../../../store/AuthStore';

export const RegistroVenta = () => {
  const { token } = useAuthStore();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { cliente, totalCompra, agregarCliente,
    compra, agregarProducto, limpiarCarrito,
    aumentarProducto, decrementarProducto, eliminarProducto } = cartStore();

  const [DataProduct, setDataProduct] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [succesSale, setsuccesSale] = useState(false);
  const handlesuccesSaleOpen = () => setsuccesSale(true);
  const handlesuccesSaleClose = () => setsuccesSale(false);

  const [Message, setMessage] = useState("");
  const [typeSnack, setTypeSnack] = useState("success");
  const [openSnack, setOpenSnack] = useState(false);
  const handleOpenSnack = () => setOpenSnack(true);
  const handleCloseSnack = () => {
    setMessage("");
    setTypeSnack("");
    setOpenSnack(false)
  };

  const product = useQuery({
    queryKey: ['products', { url: "/products", page, rowsPerPage }],
    queryFn: fetchPagedData,
  });


  const clientSearchForsale = useQuery({
    queryKey: ['clientSearchForSale', { url: "/customers", page, rowsPerPage, selectedOption, inputValue }],
    queryFn: fetchPagedData, enabled: false
  });

  const clientForSale = useQuery({
    queryKey: ['clientForSale', { url: "/customers", page, rowsPerPage }],
    queryFn: fetchPagedData,
  });


  const AgredProduct = (item) => {
    handleOpen()
    setDataProduct(item);
  }

  const handleAddProduct = (data) => {
    if (DataProduct.stock === 0 || data.amount > DataProduct.stock) {
      handleClose();
      setMessage("El Stock del producto es insuficiente");
      setTypeSnack("error");
      handleOpenSnack();
    } else {
      handleClose();
      try {
        agregarProducto({ ...DataProduct, ...data })
        setMessage("Producto agregado");
        setTypeSnack("success");
        handleOpenSnack();
      } catch (error) {
        setMessage(error);
        setTypeSnack("error");
        handleOpenSnack();
      }
    }
  }

  const incrementProduct = (item) => {
    try {
      aumentarProducto(item);
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
    decrementarProducto(item);
    setMessage("Decremento producto");
    setTypeSnack("success");
    handleOpenSnack();
  }

  const deleteProduct = (item) => {
    eliminarProducto(item);
    setMessage("Elimino producto");
    setTypeSnack("success");
    handleOpenSnack();
  }

  const SelectClient = (item) => {
    agregarCliente(item)
  }


  const AcceptSale = async () => {
    const salesdetail = []
    for (const iterator of compra) {
      const { price, id, amount, subtotal } = iterator
      let detail = {
        price,
        productId: id,
        amount,
        subtotal
      }
      salesdetail.push(detail)
    }
    const formData = {
      customerId: cliente.id,
      salesdetail,
      total: totalCompra
    }
    const response = await RequestHTTP("/sales", "POST", formData, token);
    if (response.sucess) {
      limpiarCarrito()
      handlesuccesSaleOpen()      
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

  const navigate = useNavigate();

  const retorSales = ()=> {
    navigate('/admin/ventas/ventas')
  } 

  if (!product.data?.items) {
    return <h3>Sin datos</h3>
  }

  return (
    <>
      {(cliente === null) ?
        <div className="ContainerCustom">
          <Typography variant="h4">Seleccione Cliente</Typography>
          <SearchElement
            inputValue={inputValue}
            setInputValue={setInputValue}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            refetch={clientSearchForsale.refetch}
            options={ClientSearchOptionsForSales} />
          {!clientSearchForsale.data ?
            <TableSetData
              columns={ClientColumnsForSale}
              data={clientForSale.data}
              isLoading={clientForSale.isLoading}
              page={page}
              refetch={clientForSale.refetch}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              setData={SelectClient} /> :
            <TableSetData
              columns={ClientColumnsForSale}
              data={clientSearchForsale.data}
              isLoading={clientSearchForsale.isLoading}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              refetch={clientSearchForsale.refetch}
              setData={SelectClient} />
          }
        </div>
        :
        <div className="containerProcess">
          <ContainerElements
            data={product.data.items}
            propertys={propert}
            actionBtn={AgredProduct} />
          <Cart
            data={compra}
            persone={"Cliente:"}
            title={"Detalle de compra"}
            process={cliente.name}
            total={totalCompra}
            cancelProcess={limpiarCarrito}
            incrementElement={incrementProduct}
            decrementElement={decrementProduct}
            deleted={deleteProduct}
            acceptProcess={AcceptSale} />
        </div>
      }

      {ReactDom.createPortal(<>
        <ModalComponent elemento={<DynamicForm
          fields={CartProductFormfields}
          initialValues={initialCartProduct}
          validationSchema={validationSchemaFormCartProduct}
          onSubmit={handleAddProduct}
          titleButton={"Registrar"} />}
          open={open}
          title="Ingrese cantidad a vender"
          handleClose={handleClose} />
        <ModalComponent elemento={
          <>
            <Typography variant="h6">Precione aceptar para continuar</Typography>
            <Button variant="contained" onClick={retorSales}>Aceptar</Button>
          </>}
          open={succesSale}
          title="Venta registrada"
          handleClose={handlesuccesSaleClose} />
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
