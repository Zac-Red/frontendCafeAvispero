import { useEffect, useState } from "react";
import useAuthStore from "../../../../store/AuthStore";
import { useQuery } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import { fetchPagedData, fetchPagedDataSearch, fetchPagedDatanotSearch } from "../../../../Api/HttpServer";
import { SearchElement, TableDataCustom } from "../../../../Components";
import { KardexProductSearchOptions } from "../../Helpers/ProductSearch";
import { formatKardexProduct } from "../../utils/FormatProduct";
import { KardexProductColumns } from "../../Helpers/ProductTable.helper";

export const KardexProduct = () => {
  const { token } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const kardexproductSearch = useQuery({
    queryKey: ['kardexproductSearch', {url:"/inventoryproduct", page, rowsPerPage, selectedOption, 
    inputValue, token}],
    queryFn: fetchPagedDataSearch, enabled: false
  });

  const kardexproduct = useQuery({
    queryKey: ['kardexproduct', {url:"/inventoryproduct", page, rowsPerPage, token}],
    queryFn: fetchPagedDatanotSearch, enabled: inputValue ? false : true
  });

  useEffect(() => {
    if (inputValue) {
      kardexproductSearch.refetch();
    }
  }, [page, rowsPerPage]);

  if (kardexproduct.data?.statusCode === 401 || kardexproductSearch.data?.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }

  return (
    <div className="ContainerCustom">
      <Typography variant="h3" gutterBottom>Kardex de producto</Typography>
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={kardexproductSearch.refetch}
        options={KardexProductSearchOptions} />
      {!kardexproductSearch.data?.items ?
        <TableDataCustom
          data={kardexproduct.data}
          isLoading={kardexproduct.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={kardexproduct.refetch}
          columns={KardexProductColumns}
          formatData={formatKardexProduct}/>
        :
        <TableDataCustom
          data={kardexproductSearch.data}
          isLoading={kardexproductSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={kardexproductSearch.refetch}
          columns={KardexProductColumns}
          formatData={formatKardexProduct}/>}
    </div>
  )
}
