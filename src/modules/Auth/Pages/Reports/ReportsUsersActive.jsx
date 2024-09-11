import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { TableData } from "../../../../Components/Tables/TableData";
import { SearchElement } from "../../../../Components/SearchElement/SearchElement";
import { UserSearchReportIsActive } from "../../Helpers/UserSearch";

const columns = [
  {label: "Nombre", value: "firstname"},
  {label: "Correo", value: "email"},
  {label: "Apellido", value: "lastname"},
  {label: "Dpi", value: "dpi"}, 
  {label: "Telefono", value: "phone"},
  {label: "Rol", value: "roleId.role"},
  {label: "Estado", value: "IsActive"},
];


const fetchPagedData = async ({queryKey}) => {
  const [_key, {url, page, rowsPerPage, selectedOption, inputValue}] = queryKey;
  let res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}`).then((resp)=>resp.json())
  if (selectedOption && inputValue) {
    res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}&${selectedOption}=${inputValue}`).then((resp)=>resp.json())
  }
  return res;
};

export const ReportsUsersActive = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const userSearch = useQuery({
    queryKey: ['userSearch', {url:"/auth", page, rowsPerPage, selectedOption, inputValue}],
    queryFn: fetchPagedData, enabled: false  
  });
  
  return (
    <div className="ContainerCustom">
      <SearchElement 
        inputValue={inputValue} 
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={userSearch.refetch}
        options={UserSearchReportIsActive}/>
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
