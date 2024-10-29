import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Inicio } from "./modules/Inicio/Inicio";
import { LandingPage } from "./LandingPage/LandingPage"
import { Container } from "./Components"
import { ListClients, CardClient } from "./modules/Clientes";
import { ListSupplier, CardSupplier } from "./modules/Proveedores";
import { ListUnitMeasure, Error404, InventoryMoves } from "./modules/Common";
import { DashBoardRawMaterial, KardexRawMaterial, ListRawMaterial, CardRawMaterial, RefineRawMaterial } from "./modules/materiaprima";
import { CardUser, ListUsers, Login, ReportUsersRoles, ReportsUsersActive } from "./modules/Auth/Pages";
import { DashboardVentas, RegistroVenta, Ventas, ReporteVenta, CardVentas } from "./modules/Ventas/Pages";
import { DashBoardProduct, ListProducts, KardexProduct, ReportTopSalesProduct,CardProduct } from "./modules/Productos";
import { RegisterShoppings, DashBoardCompras, Compras, CardCompras, 
  ReportTopRawMaterialShoppings } from "./modules/Compras/Pages";
import { DashboardProductions, ListProductions, ListRecipProductions, RecipProductCard, 
  RegisterProductions, RegisterRecipProductions, ReportTopPorductsProductions} from "./modules/Produccion";
import useAuthStore from "./store/AuthStore";
import { PublicGuard, AuthGuard } from "./Guards";
import { ventasURLs, comprasURLs, usuariosURLs, clientesURLs, 
  proveedoresURLs, productosURLs, MainURLs, materiaprimaURLs,Produccion} from "./router";
import './index.css';
import './Styles/MainProcess.css';
import '@fontsource/roboto/500.css';

function App() {
  const { isLoggedIn, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [isLoggedIn]);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicGuard userAuth={isLoggedIn}/>}>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>

        <Route path="admin/*" element={<AuthGuard userAuth={isLoggedIn} MainURLs={MainURLs}/>}>
          <Route index element={<Navigate to="inicio"/>}/>
          <Route path="inicio" element={<Inicio/>}/>
          
          <Route path="ventas/registrar" element={<RegistroVenta/>}/>
          <Route path="ventas/*" element={<Container urls={ventasURLs}/>}>
            <Route index element={<Navigate to="dashboard"/>}/>
            <Route path="dashboard" element={<DashboardVentas/>}/>
            <Route path="ventas" element={<Ventas/>}/>
            <Route path="reportes" element={<ReporteVenta/>}/>
            <Route path="venta/:saleId" element={<CardVentas/>}/>
            <Route path="*" element={<Error404/>}/>
          </Route>

          <Route path="compras/registrar" element={<RegisterShoppings/>}/>
          <Route path="compras/*" element={<Container urls={comprasURLs}/>}>
            <Route index element={<Navigate to="dashboard"/>}/>
            <Route path="dashboard" element={<DashBoardCompras/>}/>
            <Route path="compras" element={<Compras/>}/>
            <Route path="reporte" element={<ReportTopRawMaterialShoppings/>}/>
            <Route path="compra/:shoppingId" element={<CardCompras/>}/>
            <Route path="*" element={<Error404/>}/>
          </Route>

          <Route path="proveedores/*" element={<Container urls={proveedoresURLs}/>}>
            <Route index element={<Navigate to="proveedores"/>}/>
            <Route path="proveedores" element={<ListSupplier/>}/>
            <Route path="proveedor/:supplierId" element={<CardSupplier/>}/>
            <Route path="*" element={<Error404/>}/>
          </Route>
          
          <Route path="clientes/*" element={<Container urls={clientesURLs}/>}>
            <Route index element={<Navigate to="clientes"/>}/>
            <Route path="clientes" element={<ListClients/>}/>
            <Route path="cliente/:clientId" element={<CardClient/>}/>
            <Route path="*" element={<Error404/>}/>
          </Route> 

          <Route path="usuarios/*" element={<Container urls={usuariosURLs}/>}>
            <Route index element={<Navigate to="usuarios"/>}/>
            <Route path="usuarios" element={<ListUsers/>}/>
            <Route path="reporte-activos" element={<ReportsUsersActive/>}/>
            <Route path="reporte-rol" element={<ReportUsersRoles/>}/>
            <Route path="usuario/:userId" element={<CardUser/>}/>
            <Route path="*" element={<Error404/>}/>
          </Route>

          <Route path="productos/*" element={<Container urls={productosURLs}/>}>
            <Route index element={<Navigate to="dashboard"/>}/>
            <Route path="dashboard" element={<DashBoardProduct/>}/>
            <Route path="productos" element={<ListProducts/>}/>
            <Route path="unidades" element={<ListUnitMeasure/>}/>
            <Route path="tipos-movimientos" element={<InventoryMoves/>}/>
            <Route path="productos-top-ventas" element={<ReportTopSalesProduct/>}/>
            <Route path="kardex" element={<KardexProduct/>}/>
            <Route path="producto/:productId" element={<CardProduct/>}/>
            <Route path="*" element={<Error404/>}/>
          </Route>
          
          <Route path="materiaprima/*" element={<Container urls={materiaprimaURLs}/>}>
            <Route index element={<Navigate to="dashboard"/>}/>
            <Route path="dashboard" element={<DashBoardCompras/>}/>
            {/* <Route path="dashboard" element={<DashBoardRawMaterial/>}/> */}
            <Route path="materiasprimas" element={<ListRawMaterial/>}/>
            <Route path="unidades" element={<ListUnitMeasure/>}/>
            <Route path="tipos-movimientos" element={<InventoryMoves/>}/>
            <Route path="reporte" element={<ReportTopRawMaterialShoppings/>}/>
            <Route path="refinar-materiaprima" element={<RefineRawMaterial/>}/>
            <Route path="kardex" element={<KardexRawMaterial/>}/>
            <Route path="materiaprima/:rawmaterialId" element={<CardRawMaterial/>}/>
            <Route path="*" element={<Error404/>}/>
          </Route>
          
          <Route path="produccion/registrar-receta" element={<RegisterRecipProductions/>}/>
          <Route path="produccion/registrar-produccion" element={<RegisterProductions/>}/>
          <Route path="produccion/*" element={<Container urls={Produccion}/>}>
            <Route index element={<Navigate to="dashboard"/>}/>
            <Route path="dashboard" element={<DashboardProductions/>}/>
            <Route path="producciones" element={<ListProductions/>}/>
            <Route path="recetas" element={<ListRecipProductions/>}/>
            <Route path="productos-top-producidos" element={<ReportTopPorductsProductions/>}/>
            <Route path="receta/:recipproductId" element={<RecipProductCard/>}/>
            <Route path="*" element={<Error404/>}/>
          </Route>

          <Route path="*" element={<Error404/>}/>
        </Route>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </>
  )
}
export default App
