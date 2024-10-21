import { useState } from "react";
import useAuthStore from "../../../../store/AuthStore";
import { useQuery } from '@tanstack/react-query';
import { fetchPagedData } from "../../../../Api/HttpServer";
import { SearchElement, TableDataCustom } from "../../../../Components";
import { KardexRawMaterialSearchOptions } from "../../Helpers/RawMaterialSearch";
import { FormatKardexRawMaterial } from "../../utils/FormatRawMaterial";
import { KardexRawMaterialColumns } from "../../Helpers/RawMaterialTable.helper";

export const KardexRawMaterial = () => {
  const { token } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const kardexrawmaterialSearch = useQuery({
    queryKey: ['kardexrawmaterialSearch', {url:"/inventoryrawmaterial", page, rowsPerPage, selectedOption, inputValue}],
    queryFn: fetchPagedData, enabled: false  
  });

  const kardexrawmaterial = useQuery({
    queryKey: ['kardexrawmaterial', {url:"/inventoryrawmaterial", page, rowsPerPage}],
    queryFn: fetchPagedData,
  });

  return (
    <div className="ContainerCustom">
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={kardexrawmaterialSearch.refetch}
        options={KardexRawMaterialSearchOptions} />
      {!kardexrawmaterialSearch.data ?
        <TableDataCustom
          data={kardexrawmaterial.data}
          isLoading={kardexrawmaterial.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={kardexrawmaterial.refetch}
          columns={KardexRawMaterialColumns}
          formatData={FormatKardexRawMaterial}/>
        :
        <TableDataCustom
          data={kardexrawmaterialSearch.data}
          isLoading={kardexrawmaterialSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={kardexrawmaterialSearch.refetch}
          columns={KardexRawMaterialColumns}
          formatData={FormatKardexRawMaterial}/>}
    </div>
  )
}
