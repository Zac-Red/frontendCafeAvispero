import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { FormatSimpleDate } from "../../../../Utils/FormatElements";
import useAuthStore from "../../../../store/AuthStore";
import { fetchReportData } from "../../../../Api/HttpServer";
import { formatPieKPIVentas } from "../../utils/FormatVentas";

import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { TextField, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale';

export const DashboardVentas = () => {
  const { token } = useAuthStore();

  let targertlastsdate = new Date();
  let targertfirtsdate = new Date(targertlastsdate);
  targertfirtsdate.setDate(targertfirtsdate.getDate() - 30);

  const defaultStartDate = FormatSimpleDate(targertfirtsdate);
  const defaultEndDate = FormatSimpleDate(targertlastsdate);

  const [chartData, setChartData] = useState({ axis: [], series: [], dataKpi: [] });
  const [searching, setSearching] = useState(false);

  const [startDateSearch, setStartDateSearch] = useState(null);
  const [endDateSearch, setEndDateSearch] = useState(null);

  const formatChartData = (data) => {
    const dataKpi = data.map(item => formatPieKPIVentas(item));
    const axis = data.map(item => item.customer_name);
    const series = data.map(item => +item.purchase_count);
    return { dataKpi, axis, series };
  };

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
    const data = searching ? topcustomersSearch.data : topcustomers.data;
    if (data) {
      const formattedData = formatChartData(data);
      setChartData(formattedData);
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

  if (!topcustomers.data && !searching) {
    return <h1>Sin datos</h1>;
  }

  return (
    <div className='ContainerDashBoard'>
      <button onClick={handleReport}>Buscar</button>
      <button onClick={clearReport}>Limpiar</button>

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

      <div className='containerChart'>
        <PieChart
          series={[
            {
              data: chartData.dataKpi,
            },
          ]}
          width={700}
          height={300}
        />
      </div>

      <div className='containerChart'>
        <BarChart
          xAxis={[{ scaleType: 'band', data: chartData.axis }]}
          series={[{ data: chartData.series }]}
          height={300}
        />
      </div>
    </div>
  )
}
