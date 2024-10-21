import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Inicio } from "./modules/Inicio/Inicio";
import { LandingPage } from "./LandingPage/LandingPage"
import { Container } from "./Components/Container/Container"
import { CardUser, ListUsers, Login, ReportUsersRoles, ReportsUsersActive } from "./modules/Auth/Pages";
import { DashboardVentas, RegistroVenta, Ventas, ReporteVenta, CardVentas } from "./modules/Ventas/Pages";
import { ListClients } from "./modules/Clientes";
import { ListUnitMeasure, Error404, InventoryMoves } from "./modules/Common";
import { ListSupplier } from "./modules/Proveedores";
import useAuthStore from "./store/AuthStore";
import AuthGuard from "./Guards/AuthGuard"
import { DashBoardProduct, ListProducts, KardexProduct } from "./modules/Productos";
import { ventasURLs, comprasURLs, usuariosURLs, clientesURLs, 
  proveedoresURLs, productosURLs, MainURLs, materiaprimaURLs,Produccion} from "./router";
import { DashBoardRawMaterial, KardexRawMaterial, ListRawMaterial } from "./modules/materiaprima";
import { PublicGuard } from "./Guards/PublicGuard";
import { RegisterShoppings, DashBoardCompras, Compras, CardCompras, ReportTopRawMaterialShoppings } from "./modules/Compras/Pages";
import { CardClient } from "./modules/Clientes/Pages/CardClient/CardClient";
import { CardSupplier } from "./modules/Proveedores/Pages/CardSupplier/CardSupplier";
import { CardProduct } from "./modules/Productos/Pages/CardProduct/CardProduct";
import { CardRawMaterial } from "./modules/materiaprima/Pages/CardRawMaterial/CardRawMaterial";
import { DashboardProductions, ListProductions, ListRecipProductions, RecipProductCard, 
  RegisterProductions, RegisterRecipProductions, 
  ReportTopPorductsProductions} from "./modules/Produccion";
import './index.css';
import './Styles/MainProcess.css';
import { ReportTopSalesProduct } from "./modules/Productos/Pages";

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
            <Route path="dashboard" element={<DashBoardRawMaterial/>}/>
            <Route path="materiasprimas" element={<ListRawMaterial/>}/>
            <Route path="unidades" element={<ListUnitMeasure/>}/>
            <Route path="tipos-movimientos" element={<InventoryMoves/>}/>
            <Route path="reporte" element={<ReportTopRawMaterialShoppings/>}/>
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
