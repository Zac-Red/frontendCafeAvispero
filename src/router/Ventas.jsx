import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HandymanIcon from '@mui/icons-material/Handyman';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

export const ventasURLs = [
  {
    url: "/admin/ventas/dashboard",
    name: "Dashboard",
    icon: <LeaderboardIcon/>
  },
  {
    url: "/admin/ventas/registro",
    name: "Registrar venta",
    icon: <AddShoppingCartIcon/>
  },
  {
    url: "/admin/ventas/mantenimiento",
    name: "Mantenimiento",
    icon: <HandymanIcon/>
  },
  {
    url: "/admin/ventas/reportes",
    name: "Reportes",
    icon: <SignalCellularAltIcon/>
  },
]
