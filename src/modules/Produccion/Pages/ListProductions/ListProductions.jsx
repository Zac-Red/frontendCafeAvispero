import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { SearchElement, TableDataCustom } from "../../../../Components";
import { fetchPagedData } from "../../../../Api/HttpServer";
import { ProductionSearchOptions } from "../../Helpers/ProductionSearch";
import { ProductionsColumns } from "../../Helpers/ProductionColumnsTable";
import { formatProduction } from "../../utils/FormatProduction";

export const ListProductions = () => {

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const productionSearch = useQuery({
    queryKey: ['productionSearch', { url: "/productions", page, rowsPerPage, selectedOption, inputValue }],
    queryFn: fetchPagedData, enabled: false
  });

  const production = useQuery({
    queryKey: ['production', { url: "/productions", page, rowsPerPage }],
    queryFn: fetchPagedData,
  });

  const navigate = useNavigate();

  const handleOpen = () => {
    navigate('/admin/produccion/registrar-produccion')
  }

  return (
    <div className="ContainerCustom">
      <button className="topButton" onClick={() => handleOpen()}>
        <span className="topButtontransition"></span>
        <span className="topButtongradient"></span>
        <span className="topButtonlabel">Registrar producción</span>
      </button>
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={productionSearch.refetch}
        options={ProductionSearchOptions} />

      {!productionSearch.data ?
        <TableDataCustom
          data={production.data}
          isLoading={production.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={production.refetch}
          columns={ProductionsColumns}
          formatData={formatProduction}
        />
        :
        <TableDataCustom
          data={productionSearch.data}
          isLoading={productionSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={productionSearch.refetch}
          columns={ProductionsColumns}
          formatData={formatProduction}
        />}
    </div>
  )
}
