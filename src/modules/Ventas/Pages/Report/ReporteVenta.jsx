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
import { formatReportTopCustomers } from "../../utils/FormatVentas";
import { ReportTopCustomers } from "../../Helpers/VentasColumnsTable";
import { ButtonDownload } from "../../../../Components/ButtonDownload/ButtonDownload";
import { generarPDF } from "../../../Reports/utils/GeneretReport";

export const ReporteVenta = () => {
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


  const topcustomers = useQuery({
    queryKey: ['topcustomers', {
      url: "/sales/topcustomers",
      token,
      startOfCurrentMonth: defaultStartDate,
      endOfCurrentMonth: defaultEndDate
    }],
    queryFn: fetchReportData,
    enabled: !searching
  });

  const topcustomersSearch = useQuery({
    queryKey: ['topcustomersSearch', {
      url: "/sales/topcustomers",
      token,
      startOfCurrentMonth: startDateSearch ? FormatSimpleDate(startDateSearch) : defaultStartDate,
      endOfCurrentMonth: endDateSearch ? FormatSimpleDate(endDateSearch) : defaultEndDate
    }],
    queryFn: fetchReportData,
    enabled: searching
  });

  useEffect(() => {
    if (topcustomersSearch.data || topcustomers.data) {
      const data = searching ? topcustomersSearch.data: topcustomers.data;
      if (data) {
        let reportdata = data.map((item)=> formatReportTopCustomers(item))
        setData(reportdata);
      }
    }
  }, [topcustomers.data, topcustomersSearch.data, searching]);

  const handleReport = () => {
    setSearching(true);
    topcustomersSearch.refetch();
  };

  const clearReport = () => {
    setStartDateSearch(null);
    setEndDateSearch(null);
    setSearching(false);
  };

  const { logoBase64 } = GetLogoReport();
  
  if (!topcustomers.data && !searching) {
    return <h1>Sin datos</h1>;
  }
  return (
    <div className='ContainerCustomReport'>
      <div className="ContainerSearchReport">
        <button onClick={handleReport}>Buscar</button>
        <button onClick={clearReport}>Limpiar</button>
      </div>
      { (Data) &&
        <ButtonDownload action={()=>generarPDF({
          nameReport: "reporte de top-clientes",
          detailReport: !searching ? 
          `A continuación se presentan los clientes con mayores compras \nde la fecha ${defaultStartDate} a ${defaultEndDate}` : 
          `A continuación se presentan los clientes con mayores compras \nde la fecha ${FormatSimpleDate(startDateSearch)} a ${FormatSimpleDate(endDateSearch)}` ,
          logoBase64,
          tableHeader: ReportTopCustomers,
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
            renderInput={(params) => <TextField {...params}/>}
          />
        </div>
      </LocalizationProvider>
      <Typography variant="h3" gutterBottom>Clientes con más compras</Typography>
      <TableSeeDetails
        columns={ReportTopCustomers}
        data={Data} 
        formatData={formatReportTopCustomers}/>
    </div>
  )
}
