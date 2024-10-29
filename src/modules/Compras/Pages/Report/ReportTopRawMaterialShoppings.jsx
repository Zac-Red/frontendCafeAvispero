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
import { ButtonDownload } from "../../../../Components/ButtonDownload/ButtonDownload";
import { generarPDF } from "../../../Reports/utils/GeneretReport";
import { formatReportTopShopping } from "../../utils/FormatCompras";
import { ReportTopShoppingColumns } from "../../Helpers/ComprasColumnsTable";

export const ReportTopRawMaterialShoppings = () => {
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

  const [startdate, setstartdate] = useState(defaultStartDate);
  const [enddate, setenddate] = useState(defaultEndDate);

  const toprawmaterialshopping = useQuery({
    queryKey: ['toprawmaterialshopping', {
      url: "/rawmaterial/toprawmaterialshopping",
      token,
      startOfCurrentMonth: defaultStartDate,
      endOfCurrentMonth: defaultEndDate
    }],
    queryFn: fetchReportData,
    enabled: !searching
  });

  const toprawmaterialshoppingSearch = useQuery({
    queryKey: ['toprawmaterialshoppingSearch', {
      url: "/rawmaterial/toprawmaterialshopping",
      token,
      startOfCurrentMonth: startDateSearch ? FormatSimpleDate(startDateSearch) : defaultStartDate,
      endOfCurrentMonth: endDateSearch ? FormatSimpleDate(endDateSearch) : defaultEndDate
    }],
    queryFn: fetchReportData,
    enabled: searching
  });

  const isUnauthorized = (response) => response?.data?.statusCode === 401;
  useEffect(() => {
    if (!isUnauthorized(toprawmaterialshoppingSearch) && !isUnauthorized(toprawmaterialshopping)) {  
      const data = searching ? toprawmaterialshoppingSearch.data : toprawmaterialshopping.data;
      if (data) {
        let reportdata = data.map((item) => formatReportTopShopping(item))
        setData(reportdata);
      }
    }
  }, [toprawmaterialshopping.data, toprawmaterialshoppingSearch.data, searching]);

  const handleReport = () => {
    if (startDateSearch && endDateSearch) {
      setstartdate(FormatSimpleDate(startDateSearch))
      setenddate(FormatSimpleDate(endDateSearch))
      setSearching(true);
      toprawmaterialshoppingSearch.refetch();
    }
  };

  const clearReport = () => {
    setstartdate(defaultStartDate)
    setenddate(defaultEndDate);
    setStartDateSearch(null);
    setEndDateSearch(null);
    setSearching(false);
  };

  const { logoBase64 } = GetLogoReport();

  if (!toprawmaterialshopping.data && !searching) {
    return <h1>Sin datos</h1>;
  }
  if (toprawmaterialshopping.data?.statusCode === 401 || toprawmaterialshopping.data?.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }
  return (
    <div className='ContainerCustomReport'>
      <div className="ContainerSearchReport">
        <button onClick={handleReport}>Buscar</button>
        <button onClick={clearReport}>Limpiar</button>
      </div>
      {(Data) &&
        <ButtonDownload action={() => generarPDF({
          nameReport: "reporte de materia prima",
          detailReport: !searching ?
            `A continuación se presentan los materiales con mayores compras \nde la fecha ${defaultStartDate} a ${defaultEndDate}` :
            `A continuación se presentan los materiales con mayores compras \nde la fecha ${FormatSimpleDate(startDateSearch)} a ${FormatSimpleDate(endDateSearch)}`,
          logoBase64,
          tableHeader: ReportTopShoppingColumns,
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
      <Typography variant="h3" gutterBottom>Materia prima más comprada</Typography>
      <div className="DateDashboar">
        <Typography variant="h6" gutterBottom>
          {`Fecha de inicio: ${startdate}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Fecha fin: ${enddate}`}
        </Typography>
      </div>
      <TableSeeDetails
        columns={ReportTopShoppingColumns}
        data={Data}
        formatData={formatReportTopShopping} />
    </div>
  )
}
