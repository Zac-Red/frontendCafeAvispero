import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../../../../store/AuthStore';
import { fetchReportData } from '../../../../Api/HttpServer';
import { FormatSimpleDate } from '../../../../Utils/FormatElements';

import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { TextField, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale';
import { formatPieKPIProduction } from '../../utils/FormatProduction';

export const DashboardProductions = () => {
  const { token } = useAuthStore();

  let targertlastsdate = new Date();
  let targertfirtsdate = new Date(targertlastsdate);
  targertfirtsdate.setDate(targertfirtsdate.getDate() - 30);

  const defaultStartDate = FormatSimpleDate(targertfirtsdate);
  const defaultEndDate = FormatSimpleDate(targertlastsdate);

  const [chartData, setChartData] = useState({ axis: [], series: [],  dataKpi: []});
  const [searching, setSearching] = useState(false);

  const [startDateSearch, setStartDateSearch] = useState(null);
  const [endDateSearch, setEndDateSearch] = useState(null);

  const [startdate, setstartdate] = useState(defaultStartDate);
  const [enddate, setenddate] = useState(defaultEndDate);
  
  const formatChartData = (data) => {
    const dataKpi = data.map(item => formatPieKPIProduction(item));
    const axis = data.map(item => item.product_name);
    const series = data.map(item => item.total_amount);
    return { dataKpi, axis, series };
  };

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

  const isUnauthorized = (response) => response?.data?.statusCode === 401;
  useEffect(() => {
    if (!isUnauthorized(topproductionsSearch) && !isUnauthorized(topproductions)) { 
      const data = searching ? topproductionsSearch.data : topproductions.data;
      if (data) {
        const formattedData = formatChartData(data);
        setChartData(formattedData);
      }
    }
  }, [topproductions.data, topproductionsSearch.data, searching]);

  const handleReport = () => {
    if (startDateSearch && endDateSearch) {
      setstartdate(FormatSimpleDate(startDateSearch))
      setenddate(FormatSimpleDate(endDateSearch))
      setSearching(true);
      topproductionsSearch.refetch();
    }
  };

  const clearReport = () => {
    setstartdate(defaultStartDate)
    setenddate(defaultEndDate);
    setStartDateSearch(null);
    setEndDateSearch(null);
    setSearching(false);
  };

  if (!topproductions.data && !searching) {
    return <h1>Sin datos</h1>;
  }

  if (topproductions.data?.statusCode === 401 || topproductionsSearch.data?.statusCode === 401) {
    return <h2>Acceso denegado</h2>
  }

  return (
    <div className='ContainerDashBoard'>
      <div className="containerbtndashboard">
        <button onClick={handleReport}>Buscar</button>
        <button onClick={clearReport}>Limpiar</button>
      </div>
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
      <div className="DateDashboar">
        <Typography variant="h6" gutterBottom>
          {`Fecha de inicio: ${startdate}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Fecha fin: ${enddate}`}
        </Typography>
      </div>
      <div className='containerChart'>
        <PieChart
          series={[
            {
              data: chartData.dataKpi,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
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
  );
};


