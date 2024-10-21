import { format } from 'date-fns';
import { TZDate } from "@date-fns/tz";
// export const FormatDate = (dateFormat) => {
//   const newDateFormat = new Date(dateFormat);
//   const año = newDateFormat.getFullYear();
//   const mes = String(newDateFormat.getMonth() + 1).padStart(2, '0');
//   const dia = String(newDateFormat.getDate()).padStart(2, '0');
//   const horas = String(newDateFormat.getHours()).padStart(2, '0');
//   const minutos = String(newDateFormat.getMinutes()).padStart(2, '0');
//   const segundos = String(newDateFormat.getSeconds()).padStart(2, '0');
//   const DateFormat = `${dia}-${mes}-${año} ${horas}:${minutos}:${segundos}`;
//   return DateFormat;
// }

export const FormatDate = (dateFormat, timeZone = 'America/Guatemala') => {
  const zonedDate = new TZDate(dateFormat, timeZone); 
  const DateFormat = format(zonedDate, 'dd-MM-yyyy HH:mm:ss'); 
  return DateFormat;
}

export const FormatSimpleDate = (dateFormat, timeZone = 'America/Guatemala') => {
  const zonedDate = new TZDate(dateFormat, timeZone); 
  const DateFormat = format(zonedDate, 'yyyy-MM-dd'); 
  return DateFormat;
}