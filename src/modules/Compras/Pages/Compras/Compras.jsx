import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { SearchElement, TableDataCustom } from "../../../../Components"
import { fetchPagedData } from "../../../../Api/HttpServer";
import { ComprasSearchOptions } from "../../Helpers/ComprasSearch";
import { ShoppingColumns } from "../../Helpers/ComprasColumnsTable";
import { formatShopping } from "../../utils/FormatCompras";
import useAuthStore from "../../../../store/AuthStore";

export const Compras = () => {
  const { token } = useAuthStore();
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const shoppingSearch = useQuery({
    queryKey: ['shoppingSearch', { url: "/shopping", page, rowsPerPage, selectedOption, 
    inputValue, token }],
    queryFn: fetchPagedData, enabled: false
  });

  const shopping = useQuery({
    queryKey: ['shopping', { url: "/shopping", page, rowsPerPage, token }],
    queryFn: fetchPagedData,
  });

  const navigate = useNavigate();

  const handleOpen = () => {
    navigate('/admin/compras/registrar')
  }

  const SeeData = ({ id }) => {
    navigate(`/admin/compras/compra/${id}`);
  }

  if (shopping.data?.statusCode === 401 || shoppingSearch.data?.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }
  
  return (
    <div className="ContainerCustom">
      <button className="topButton" onClick={() => handleOpen()}>
        <span className="topButtontransition"></span>
        <span className="topButtongradient"></span>
        <span className="topButtonlabel">Registrar Compra</span>
      </button>
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={shoppingSearch.refetch}
        options={ComprasSearchOptions} />
      {!shoppingSearch.data ?
        <TableDataCustom
          data={shopping.data}
          isLoading={shopping.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={shopping.refetch}
          columns={ShoppingColumns}
          formatData={formatShopping}
          seeData={SeeData} />
        :
        <TableDataCustom
          data={shoppingSearch.data}
          isLoading={shoppingSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={shoppingSearch.refetch}
          columns={ShoppingColumns}
          formatData={formatShopping}
          seeData={SeeData} />}
    </div>
  )
}
