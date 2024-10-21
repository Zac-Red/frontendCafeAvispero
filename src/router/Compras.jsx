import DashboardIcon from '@mui/icons-material/Dashboard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

export const comprasURLs = [
  {
    url: "/admin/compras/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon/>
  },
  {
    url: "/admin/compras/registrar",
    name: "Registrar Compras",
    icon: <AddShoppingCartIcon/>
  },
  {
    url: "/admin/compras/compras",
    name: "Compras",
    icon: <AddBusinessIcon/>
  },
  {
    url: "/admin/compras/reporte",
    name: "Materia prima más comprada",
    icon: <SignalCellularAltIcon/>
  },
]
