import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Inicio } from "./modules/Inicio/Inicio";
import { DashBoardCompras } from "./modules/Compras/DashBoardCompras"
import { LandingPage } from "./LandingPage/LandingPage"
import { Container } from "./Components/Container/Container"
import useAuthStore from "./store/AuthStore";
import AuthGuard from "./Guards/AuthGuard"
import { ListUsers, Login, ReportUsersRoles, ReportsUsersActive } from "./modules/Auth/Pages";
import { DashboardVentas, RegistroVenta, Ventas, ReporteVenta } from "./modules/Ventas/Pages";
import { ventasURLs, comprasURLs, usuariosURLs } from "./router";
import { UserContextProvider } from "./modules/Auth/Context/UserContextProvider";
import { ListClients } from "./modules/Clientes/Pages";
import './index.css'
import { clientesURLs } from "./router/Clientes";
import { DashBoardProduct, ListProducts } from "./modules/Productos/Pages";
import { productosURLs } from "./router/Productos";

function App() {
  const { isLoggedIn, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [isLoggedIn]);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="admin" element={<Navigate to="/admin/Inicio"/>}/>        
        <Route path="admin/ventas" element={<Navigate to="/admin/ventas/dashboard"/>}/>
        <Route path="admin/compras" element={<Navigate to="/admin/compras/dashboard"/>}/>
        <Route path="admin/usuarios" element={<Navigate to="/admin/usuarios/usuarios"/>}/>
        <Route path="admin/clientes" element={<Navigate to="/admin/clientes/clientes"/>}/>
        <Route path="admin/productos" element={<Navigate to="/admin/productos/dashboard"/>}/>
        
        <Route path="admin/*" element={<AuthGuard userAuth={isLoggedIn}/>}>
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

          {/* <Route path="Proveedores/*" element={<Container urls={comprasURLs}/>}>
            <Route path="dashboard" element={<DashBoardCompras/>}/>
          </Route>*/}
          
          <Route path="clientes/*" element={<Container urls={clientesURLs}/>}>
            <Route path="clientes" element={<ListClients/>}/>
          </Route> 

          <Route path="usuarios/*" element={<Container urls={usuariosURLs}/>}>
            <Route path="usuarios" element={
              <UserContextProvider>
                <ListUsers/>
              </UserContextProvider>
            }/>
            <Route path="reporte-activos" element={<ReportsUsersActive/>}/>
            <Route path="reporte-rol" element={<ReportUsersRoles/>}/>
          </Route>

          <Route path="productos/*" element={<Container urls={productosURLs}/>}>
            <Route path="dashboard" element={<DashBoardProduct/>}/>
            <Route path="productos" element={<ListProducts/>}/>
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
