import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import InventoryIcon from '@mui/icons-material/Inventory';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

export const productosURLs = [
  {
    url: "/admin/productos/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon/>
  },
  {
    url: "/admin/productos/productos",
    name: "Productos",
    icon: <CategoryIcon/>
  },
  {
    url: "/admin/productos/unidades",
    name: "Unidades",
    icon: <HourglassBottomIcon/>
  },
  {
    url: "/admin/productos/tipos-movimientos",
    name: "Tipos de Movimientos",
    icon: <HourglassBottomIcon/>
  },
  {
    url: "/admin/productos/productos-top-ventas",
    name: "Productos más vendidos",
    icon: <SignalCellularAltIcon/>
  },
  {
    url: "/admin/productos/kardex",
    name: "Kardex de producto",
    icon: <InventoryIcon/>
  },
]