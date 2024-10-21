import { useEffect, useState } from "react";
import { GetLogoReport } from "../../../../Hooks";
import { useQuery } from '@tanstack/react-query';
import useAuthStore from "../../../../store/AuthStore";

import Typography from '@mui/material/Typography';
import { TextField, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale';
import { FormatSimpleDate } from "../../../../Utils/FormatElements";
import { fetchReportData } from "../../../../Api/HttpServer";
import { TableSeeDetails } from "../../../../Components/Tables/TableSeeDetails";
import { ButtonDownload } from "../../../../Components/ButtonDownload/ButtonDownload"
import { generarPDF } from "../../../Reports/utils/GeneretReport"
import { ReportTopProductsProductionsColumns } from "../../Helpers/ProductionColumnsTable";
import { formatReportTopProductsProductions } from "../../utils/FormatProduction";


export const ReportTopPorductsProductions = () => {
  const { token } = useAuthStore();

  let targertlastsdate = new Date();
  let targertfirtsdate = new Date(targertlastsdate);
  targertfirtsdate.setDate(targertfirtsdate.getDate() - 30);

  const defaultStartDate = FormatSimpleDate(targertfirtsdate);
  const defaultEndDate = FormatSimpleDate(targertlastsdate);

  const [Data, setData] = useState([]);
  const [searching, setSearching] = useState(false);

  const [startDateSearch, setStartDateSearch] = useState(null);
  const [endDateSearch, setEndDateSearch] = useState(null);


  const topproductions = useQuery({
    queryKey: ['topproductions', {
      url: "/productions/topproductions",
      token,
      startOfCurrentMonth: defaultStartDate,
      endOfCurrentMonth: defaultEndDate
    }],
    queryFn: fetchReportData,
    enabled: !searching
  });

  const topproductionsSearch = useQuery({
    queryKey: ['topproductionsSearch', {
      url: "/productions/topproductions",
      token,
      startOfCurrentMonth: startDateSearch ? FormatSimpleDate(startDateSearch) : defaultStartDate,
      endOfCurrentMonth: endDateSearch ? FormatSimpleDate(endDateSearch) : defaultEndDate
    }],
    queryFn: fetchReportData,
    enabled: searching
  });


  useEffect(() => {
    if (topproductionsSearch.data || topproductions.data) {
      const data = searching ? topproductionsSearch.data : topproductions.data;
      if (data) {
        let reportdata = data.map((item) => formatReportTopProductsProductions(item))
        setData(reportdata);
      }
    }
  }, [topproductions.data, topproductionsSearch.data, searching]);

  const handleReport = () => {
    setSearching(true);
    topproductionsSearch.refetch();
  };

  const clearReport = () => {
    setStartDateSearch(null);
    setEndDateSearch(null);
    setSearching(false);
  };

  const { logoBase64 } = GetLogoReport();

  if (!topproductions.data && !searching) {
    return <h1>Sin datos</h1>;
  }

  return (
    <div className='ContainerCustomReport'>
      <div className="ContainerSearchReport">
        <button onClick={handleReport}>Buscar</button>
        <button onClick={clearReport}>Limpiar</button>
      </div>
      {(Data) &&
        <ButtonDownload action={() => generarPDF({
          nameReport: "Reporte de top-productos-producidos",
          detailReport: !searching ?
            `A continuación se presentan los productos más producidos \nde la fecha ${defaultStartDate} a ${defaultEndDate}` :
            `A continuación se presentan los productos más producidos \nde la fecha ${FormatSimpleDate(startDateSearch)} a ${FormatSimpleDate(endDateSearch)}`,
          logoBase64,
          tableHeader: ReportTopProductsProductionsColumns,
          tableRows: Data
        })} />
      }
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
        <div className='containerDatepikerdashboar'>
          <DatePicker
            label="Fecha inicial"
            value={startDateSearch}
            onChange={(newValue) => setStartDateSearch(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <Box sx={{ mx: 2 }}> a </Box>
          <DatePicker
            label="Fecha final"
            value={endDateSearch}
            onChange={(newValue) => setEndDateSearch(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </LocalizationProvider>
      <Typography variant="h3" gutterBottom>Productos más producidos</Typography>
      <TableSeeDetails
        columns={ReportTopProductsProductionsColumns}
        data={Data}
        formatData={formatReportTopProductsProductions} />
    </div>
  )
}
