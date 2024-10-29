import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

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
    icon: <MonetizationOnIcon/>
  },
  {
    url: "/admin/ventas/reportes",
    name: "Reportes",
    icon: <SignalCellularAltIcon/>
  },
]
