import DashboardIcon from '@mui/icons-material/Dashboard';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import InventoryIcon from '@mui/icons-material/Inventory';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export const materiaprimaURLs = [
  {
    url: "/admin/materiaprima/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon/>,
  },
  {
    url: "/admin/materiaprima/materiasprimas",
    name: "Materia Prima",
    icon: <AgricultureIcon/>,
  },
  {
    url: "/admin/materiaprima/tipos-movimientos",
    name: "Tipos de Movimientos",
    icon: <HourglassBottomIcon/>
  },
  {
    url: "/admin/materiaprima/unidades",
    name: "Unidades",
    icon: <HourglassBottomIcon/>,
  },
  {
    url: "/admin/materiaprima/reporte",
    name: "Materia prima más comprada",
    icon: <SignalCellularAltIcon/>
  },
  {
    url: "/admin/materiaprima/kardex",
    name: "Kardex de materia prima",
    icon: <InventoryIcon/>
  },
  {
    url: "/admin/materiaprima/refinar-materiaprima",
    name: "refinar materia prima",
    icon: <AutoFixHighIcon/>
  },
]