import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DetailsIcon from '@mui/icons-material/Details';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import BlenderIcon from '@mui/icons-material/Blender';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

export const Produccion = [
  {
    url: "/admin/produccion/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon/>,
  },
  {
    url: "/admin/produccion/registrar-produccion",
    name: "registrar producción",
    icon: <BlenderIcon/>,
  },
  {
    url: "/admin/produccion/producciones",
    name: "Producción",
    icon: <PrecisionManufacturingIcon/>,
  },
  {
    url: "/admin/produccion/registrar-receta",
    name: "registrar receta de producción",
    icon: <DetailsIcon/>,
  },
  {
    url: "/admin/produccion/recetas",
    name: "recetas de producción",
    icon: <DisplaySettingsIcon/>,
  },
  {
    url: "/admin/produccion/productos-top-producidos",
    name: "Productos más producidos",
    icon: <SignalCellularAltIcon/>
  },
]
