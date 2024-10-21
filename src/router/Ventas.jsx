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
    url: "/admin/ventas/registrar",
    name: "Registrar venta",
    icon: <AddShoppingCartIcon/>
  },
  {
    url: "/admin/ventas/ventas",
    name: "Ventas",
    icon: <HandymanIcon/>
  },
  {
    url: "/admin/ventas/reportes",
    name: "Reportes",
    icon: <SignalCellularAltIcon/>
  },
]
