import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { TableData } from "../../../../Components/Tables/TableData";
import Typography from '@mui/material/Typography';
import { ButtonDownload } from "../../../../Components/ButtonDownload/ButtonDownload";
import { generarPDF } from "../../../Reports/utils/GeneretReport";
import { GetLogoReport } from "../../../../Hooks";

const columns = [
  { label: "Nombre", value: "firstname" },
  { label: "Correo", value: "email" },
  { label: "Apellido", value: "lastname" },
  { label: "Dpi", value: "dpi" },
  { label: "Telefono", value: "phone" },
  { label: "Rol", value: "roleId.role" },
  { label: "Estado", value: "IsActive" },
];


const fetchPagedData = async ({ queryKey }) => {
  const [_key, { url, page, rowsPerPage }] = queryKey;
  let res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}&IsActive=true`).then((resp) => resp.json())
  return res;
};


export const ReportsUsersActive = () => {

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const userSearch = useQuery({
    queryKey: ['userSearch', { url: "/auth", page, rowsPerPage }],
    queryFn: fetchPagedData,
  });

  const { logoBase64 } = GetLogoReport();

  if (!userSearch.data?.items) {
    return <h1>Sin datos</h1>
  }
  return (
    <div className="ContainerCustom">
      <Typography variant="h3" gutterBottom>Usuarios Activos</Typography>
      <ButtonDownload action={()=>generarPDF({
        nameReport: "reporte de usuarios-activos",
        detailReport: "A continuación se presentan los usuarios activos en el sistema",
        logoBase64,
        tableHeader: columns,
        tableRows: userSearch.data.items
      })} />
      <TableData
        columns={columns}
        data={userSearch.data}
        isLoading={userSearch.isLoading}
        page={page}
        setPage={setPage}
        refetch={userSearch.refetch}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage} />
    </div>
  )
}
