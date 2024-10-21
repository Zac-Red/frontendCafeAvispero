import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { SearchElement, TableDataCustom } from '../../../../Components';
import { fetchPagedData } from '../../../../Api/HttpServer';
import { VentasSearchOptions } from '../../Helpers/VentasSearch';
import { SalesColumns } from '../../Helpers/VentasColumnsTable';
import { formatSales } from '../../utils/FormatVentas';

export const Ventas = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const salesSearch = useQuery({
    queryKey: ['salesSearch', { url: "/sales", page, rowsPerPage, selectedOption, inputValue }],
    queryFn: fetchPagedData, enabled: false
  });

  const sales = useQuery({
    queryKey: ['sales', { url: "/sales", page, rowsPerPage }],
    queryFn: fetchPagedData,
  });

  const navigate = useNavigate();
  
  const handleOpen = ()=> {
    navigate('/admin/ventas/registrar')
  }

  const SeeData = ({id}) => {
    navigate(`/admin/ventas/venta/${id}`);
  }
  return (
    <div className="ContainerCustom">
      <button className="topButton" onClick={() => handleOpen()}>
        <span className="topButtontransition"></span>
        <span className="topButtongradient"></span>
        <span className="topButtonlabel">Registrar Venta</span>
      </button>
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={salesSearch.refetch}
        options={VentasSearchOptions} />
      {!salesSearch.data ?
        <TableDataCustom
          data={sales.data}
          isLoading={sales.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={sales.refetch}
          columns={SalesColumns}
          formatData={formatSales}
          seeData={SeeData}/>
        :
        <TableDataCustom
          data={salesSearch.data}
          isLoading={salesSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={salesSearch.refetch}
          columns={SalesColumns}
          formatData={formatSales}
          seeData={SeeData}/>}
    </div>
  )
}
