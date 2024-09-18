import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Inicio } from "./modules/Inicio/Inicio";
import { DashBoardCompras } from "./modules/Compras/DashBoardCompras"
import { LandingPage } from "./LandingPage/LandingPage"
import { Container } from "./Components/Container/Container"
import { CardUser, ListUsers, Login, ReportUsersRoles, ReportsUsersActive } from "./modules/Auth/Pages";
import { DashboardVentas, RegistroVenta, Ventas, ReporteVenta } from "./modules/Ventas/Pages";
import { ListClients } from "./modules/Clientes";
import { ListUnitMeasure } from "./modules/Common";
import { ListSupplier } from "./modules/Proveedores";
import { DashBoardProduct, ListProducts } from "./modules/Productos";
import { ventasURLs, comprasURLs, usuariosURLs, clientesURLs, 
  proveedoresURLs, productosURLs, MainURLs, materiaprimaURLs} from "./router";
import useAuthStore from "./store/AuthStore";
import AuthGuard from "./Guards/AuthGuard"
import { DashBoardRawMaterial, ListRawMaterial } from "./modules/materiaprima";
import './index.css'
import { PublicGuard } from "./Guards/PublicGuard";

function App() {
  const { isLoggedIn, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [isLoggedIn]);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicGuard userAuth={isLoggedIn} MainURLs={MainURLs}/>}>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>

        <Route path="admin" element={<Navigate to="/admin/Inicio"/>}/>        
        <Route path="admin/ventas" element={<Navigate to="/admin/ventas/dashboard"/>}/>
        <Route path="admin/compras" element={<Navigate to="/admin/compras/dashboard"/>}/>
        <Route path="admin/usuarios" element={<Navigate to="/admin/usuarios/usuarios"/>}/>
        <Route path="admin/clientes" element={<Navigate to="/admin/clientes/clientes"/>}/>
        <Route path="admin/proveedores" element={<Navigate to="/admin/proveedores/proveedores"/>}/>
        <Route path="admin/productos" element={<Navigate to="/admin/productos/dashboard"/>}/>
        <Route path="admin/materiaprima" element={<Navigate to="/admin/materiaprima/dashboard"/>}/>

        <Route path="admin/*" element={<AuthGuard userAuth={isLoggedIn} MainURLs={MainURLs}/>}>
          <Route path="inicio" element={<Inicio/>}/>
          
          <Route path="ventas/*" element={<Container urls={ventasURLs}/>}>
            <Route path="dashboard" element={<DashboardVentas/>}/>
            <Route path="registro" element={<RegistroVenta/>}/>
            <Route path="mantenimiento" element={<Ventas/>}/>
            <Route path="reportes" element={<ReporteVenta/>}/>
          </Route>

          <Route path="compras/*" element={<Container urls={comprasURLs}/>}>
            <Route path="dashboard" element={<DashBoardCompras/>}/>
          </Route>

          <Route path="proveedores/*" element={<Container urls={proveedoresURLs}/>}>
            <Route path="proveedores" element={<ListSupplier/>}/>
          </Route>
          
          <Route path="clientes/*" element={<Container urls={clientesURLs}/>}>
            <Route path="clientes" element={<ListClients/>}/>
          </Route> 

          <Route path="usuarios/*" element={<Container urls={usuariosURLs}/>}>
            <Route path="usuarios" element={<ListUsers/>}/>
            <Route path="reporte-activos" element={<ReportsUsersActive/>}/>
            <Route path="reporte-rol" element={<ReportUsersRoles/>}/>
            <Route path="usuario/:userId" element={<CardUser/>}/>
          </Route>

          <Route path="productos/*" element={<Container urls={productosURLs}/>}>
            <Route path="dashboard" element={<DashBoardProduct/>}/>
            <Route path="productos" element={<ListProducts/>}/>
            <Route path="unidades" element={<ListUnitMeasure/>}/>
          </Route>
          
          <Route path="materiaprima/*" element={<Container urls={materiaprimaURLs}/>}>
            <Route path="dashboard" element={<DashBoardRawMaterial/>}/>
            <Route path="materiaprima" element={<ListRawMaterial/>}/>
            <Route path="unidades" element={<ListUnitMeasure/>}/>
          </Route>
          {/* 
          <Route path="Producción/*" element={<Container urls={comprasURLs}/>}>
            <Route path="dashboard" element={<DashBoardCompras/>}/>
          </Route> */}
        </Route>
      </Routes>
    </>
  )
}
export default App
