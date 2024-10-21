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
import { ReportTopSalesProductColumns } from "../../Helpers/ProductTable.helper";
import { formatReportTopSalesProducts } from "../../utils/FormatProduct";

export const ReportTopSalesProduct = () => {
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


  const topProducts = useQuery({
    queryKey: ['topProducts', {
      url: "/products/topProducts",
      token,
      startOfCurrentMonth: defaultStartDate,
      endOfCurrentMonth: defaultEndDate
    }],
    queryFn: fetchReportData,
    enabled: !searching
  });

  const topProductsSearch = useQuery({
    queryKey: ['topProductsSearch', {
      url: "/products/topProducts",
      token,
      startOfCurrentMonth: startDateSearch ? FormatSimpleDate(startDateSearch) : defaultStartDate,
      endOfCurrentMonth: endDateSearch ? FormatSimpleDate(endDateSearch) : defaultEndDate
    }],
    queryFn: fetchReportData,
    enabled: searching
  });

  useEffect(() => {
    if (topProductsSearch.data || topProducts.data) {
      const data = searching ? topProductsSearch.data : topProducts.data;
      if (data) {
        let reportdata = data.map((item) => formatReportTopSalesProducts(item))
        setData(reportdata);
      }
    }
  }, [topProducts.data, topProductsSearch.data, searching]);

  const handleReport = () => {
    setSearching(true);
    topProductsSearch.refetch();
  };

  const clearReport = () => {
    setStartDateSearch(null);
    setEndDateSearch(null);
    setSearching(false);
  };

  const { logoBase64 } = GetLogoReport();

  if (!topProducts.data && !searching) {
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
          nameReport: "Reporte de top-ventas-producto",
          detailReport: !searching ?
            `A continuación se presentan los productos con mayores ventas \nde la fecha ${defaultStartDate} a ${defaultEndDate}` :
            `A continuación se presentan los productos con mayores ventas \nde la fecha ${FormatSimpleDate(startDateSearch)} a ${FormatSimpleDate(endDateSearch)}`,
          logoBase64,
          tableHeader: ReportTopSalesProductColumns,
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
      <Typography variant="h3" gutterBottom>Productos con más ventas</Typography>
      <TableSeeDetails
        columns={ReportTopSalesProductColumns}
        data={Data}
        formatData={formatReportTopSalesProducts} />
    </div>
  )
}
