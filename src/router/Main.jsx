import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AgricultureIcon from '@mui/icons-material/Agriculture';

export const MainURLs = [
  {
    url: "/admin/inicio",
    name: "Inicio",
    label: "Inicio",
    icon: <HomeIcon/>
  },
  {
    url: "/admin/ventas",
    name: "Ventas",
    label: "Modulo de Ventas",
    icon: <AttachMoneyIcon/>
  },
  {
    url: "/admin/compras",
    name: "Compras",
    label: "Modulo de Compras",
    icon: <ShoppingCartIcon/>
  },
  {
    url: "/admin/usuarios",
    name: "Usuarios",
    label: "Modulo de Usuarios",
    icon: <PeopleAltIcon/>
  },
  {
    url: "/admin/clientes",
    name: "Clientes",
    label: "Modulo de Clientes",
    icon: <SensorOccupiedIcon/>
  },
  {
    url: "/admin/proveedores",
    name: "Proveedores",
    label: "Modulo de Proveedores",
    icon: <AccountBoxIcon/>
  },
  {
    url: "/admin/productos",
    name: "Productos",
    label: "Modulo de productos",
    icon: <CategoryIcon/>
  },
  {
    url: "/admin/materiaprima",
    name: "Materia prima",
    label: "Modulo de materia prima",
    icon: <AgricultureIcon/>
  },
]