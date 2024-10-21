import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../../../../store/AuthStore';
import { fetchReportData } from '../../../../Api/HttpServer';
import { FormatSimpleDate } from '../../../../Utils/FormatElements';

import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

import { TextField, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale';
import { formatPieKPIProduction } from '../../utils/FormatProduction';

// export const DashboardProductions = () => {
//   const { token } = useAuthStore();

//   let targertlastsdate = new Date()
//   let targertfirtsdate = new Date(targertlastsdate)
//   targertfirtsdate.setDate(targertfirtsdate.getDate() - 30)

//   const defaultstartOfCurrentMonth = FormatSimpleDate(targertfirtsdate);
//   const defaultendOfCurrentMonth = FormatSimpleDate(targertlastsdate);

//   const topproductions = useQuery({
//     queryKey: ['topproductions', {
//       url: "/productions/topproductions", token,
//       startOfCurrentMonth: defaultstartOfCurrentMonth,
//       endOfCurrentMonth: defaultendOfCurrentMonth
//     }],
//     queryFn: fetchReportData,
//   });

//   const [startDateSearch, setStartDateSearch] = useState(null);
//   const [endDateSearch, setEndDateSearch] = useState(null);

//   const startOfCurrentMonth = FormatSimpleDate(targertfirtsdate);
//   const endOfCurrentMonth = FormatSimpleDate(targertlastsdate);

//   const topproductionsSearch = useQuery({
//     queryKey: ['topproductionsSearch', { url: "/productions/topproductions", token, startOfCurrentMonth, endOfCurrentMonth }],
//     queryFn: fetchReportData,
//     enabled: false
//   });

//   const handleReport = () => {
//     topproductionsSearch.refetch()
//   }
//   const clearReport = () => {
//     setStartDateSearch(null)
//     setEndDateSearch(null)
//   }

//   if (topproductions.data === undefined) {
//     return <h1>Sin datos</h1>
//   }
//   const dataKpi = topproductions.data.map((item) => {
//     return formatPieKPIProduction(item)
//   })

//   let axis = []
//   let series = []
//   for (const item of topproductions.data) {
//     axis.push(item.product_name)
//     series.push(item.total_amount)
//   }

//   let dataKpisearch
//   let axissearch = []
//   let seriessearch = []
//   if (topproductionsSearch.data) {
//     dataKpisearch = topproductionsSearch.data.map((item) => {
//       return formatPieKPIProduction(item)
//     })
//     for (const item of topproductionsSearch.data) {
//       axissearch.push(item.product_name)
//       seriessearch.push(item.total_amount)
//     }
//   }

//   return (
//     <div className='ContainerCustom'>
//       <button onClick={handleReport}>Buscar</button>
//       <button onClick={clearReport}>Limpliar</button>
//       <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <DatePicker
//             label="Fecha inicial"
//             value={startDateSearch}
//             onChange={(newValue) => setStartDateSearch(newValue)}
//             renderInput={(params) => <TextField {...params} />}
//           />
//           <Box sx={{ mx: 2 }}> a </Box>
//           <DatePicker
//             label="Fecha final"
//             value={endDateSearch}
//             onChange={(newValue) => setEndDateSearch(newValue)}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         </Box>
//       </LocalizationProvider>
//       {!topproductionsSearch.data ?
//         <>
//           <div className='containerChart'>
//             <PieChart
//               series={[
//                 {
//                   data: dataKpi
//                 },
//               ]}
//               width={700}
//               height={300}
//             />
//           </div>
//           <div className='containerPieChart'>
//             <BarChart
//               xAxis={[{ scaleType: 'band', data: axis }]}
//               series={[{ data: series }]}
//               width={900}
//               height={300}
//             />
//           </div>
//         </>
//         :
//         <>
//           <h2>Busqueda</h2>
//           <div className='containerPieChart'>
//             <PieChart
//               series={[
//                 {
//                   data: dataKpisearch
//                 },
//               ]}
//               width={700}
//               height={300}
//             />
//           </div>
//           <div className='containerPieChart'>
//             <BarChart
//               xAxis={[{ scaleType: 'band', data: axissearch }]}
//               series={[{ data: seriessearch }]}
//               width={900}
//               height={300}
//             />
//           </div>
//         </>
//       }
//     </div>
//   )
// }

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

  useEffect(() => {
    const data = searching ? topproductionsSearch.data : topproductions.data;
    if (data) {
      const formattedData = formatChartData(data);
      setChartData(formattedData);
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

  if (!topproductions.data && !searching) {
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
  );
};


