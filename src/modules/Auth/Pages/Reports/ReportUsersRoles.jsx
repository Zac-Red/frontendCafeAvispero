import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { TableData } from "../../../../Components/Tables/TableData";
import Typography from '@mui/material/Typography';

import { SearchElement } from "../../../../Components/SearchElement/SearchElement";
import { UserSearchReportRole } from "../../Helpers/UserSearch";

import { generarPDF } from "../../../Reports/utils/GeneretReport";
import { GetLogoReport } from "../../../../Hooks";
import { ButtonDownload } from "../../../../Components/ButtonDownload/ButtonDownload";
import useAuthStore from "../../../../store/AuthStore";

const columns = [
  {label: "Nombre", value: "firstname"},
  {label: "Correo", value: "email"},
  {label: "Apellido", value: "lastname"},
  {label: "Dpi", value: "dpi"}, 
  {label: "Telefono", value: "phone"},
  {label: "Rol", value: "roleId.role"},
];

const fetchPagedData = async ({queryKey}) => {
  const [_key, {url, page, rowsPerPage, selectedOption, inputValue, token}] = queryKey;
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  let res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}`, params).then((resp)=>resp.json())
  if (selectedOption && inputValue) {
    res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}&${selectedOption}=${inputValue}`, params)
    .then((resp)=>resp.json())
  }
  return res;
};

export const ReportUsersRoles = () => {
  const { token } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const userSearch = useQuery({
    queryKey: ['userSearch', {url:"/auth", page, rowsPerPage, selectedOption, 
    inputValue, token}],
    queryFn: fetchPagedData, enabled: false  
  });

  const { logoBase64 } = GetLogoReport();

  if (userSearch.data?.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }
  return (
    <div className="ContainerCustom">
      <Typography variant="h3" gutterBottom>Usuarios por rol</Typography>
      { (userSearch.data?.items) &&
        <ButtonDownload action={()=>generarPDF({
          nameReport: "reporte de usuarios-rol",
          detailReport: "A continuación se presentan los usuarios por rol en el sistema",
          logoBase64,
          tableHeader: columns,
          tableRows: userSearch.data.items
        })} />
      }
      <SearchElement 
        inputValue={inputValue} 
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={userSearch.refetch}
        options={UserSearchReportRole}/>
      <TableData 
          columns={columns}  
          data={userSearch.data} 
          isLoading={userSearch.isLoading} 
          page={page} 
          setPage={setPage} 
          refetch={userSearch.refetch}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}/>
    </div>
  )
}
