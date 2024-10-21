import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { SearchElement, TableDataCustom } from '../../../../Components';
import { fetchPagedData } from '../../../../Api/HttpServer';
import { RecipProductionSearchOptions } from "../../Helpers/ProductionSearch";
import { RecipProductionColumns } from "../../Helpers/ProductionColumnsTable";
import { formatRecipProduction } from "../../utils/FormatProduction";

export const ListRecipProductions = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const recipproductionSearch = useQuery({
    queryKey: ['recipproductionSearch', { url: "/recipproduction", page, rowsPerPage, selectedOption, inputValue }],
    queryFn: fetchPagedData, enabled: false
  });

  const recipproduction = useQuery({
    queryKey: ['recipproduction', { url: "/recipproduction", page, rowsPerPage }],
    queryFn: fetchPagedData,
  });

  const navigate = useNavigate();

  const handleOpen = ()=> {
    navigate('/admin/produccion/registrar-receta')
  }

  const SeeData = ({id}) => {
    navigate(`/admin/produccion/receta/${id}`);
  }

  return (
    <div className="ContainerCustom">
      <button className="topButton" onClick={() => handleOpen()}>
        <span className="topButtontransition"></span>
        <span className="topButtongradient"></span>
        <span className="topButtonlabel">Registrar receta de fabricación</span>
      </button>
      <SearchElement
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        refetch={recipproductionSearch.refetch}
        options={RecipProductionSearchOptions} />
      {!recipproductionSearch.data ?
        <TableDataCustom
          data={recipproduction.data}
          isLoading={recipproduction.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={recipproduction.refetch}
          columns={RecipProductionColumns}
          formatData={formatRecipProduction}
          seeData={SeeData}/>
        :
        <TableDataCustom
          data={recipproductionSearch.data}
          isLoading={recipproductionSearch.isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          refetch={recipproductionSearch.refetch}
          columns={RecipProductionColumns}
          formatData={formatRecipProduction}
          seeData={SeeData}/>}
    </div>
  )
}