import axios from 'axios';

export const ServerApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const fetchPagedData = async ({queryKey}) => {
  const [_key, {url, page, rowsPerPage, selectedOption, inputValue}] = queryKey;
  let res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}`).then((resp)=>resp.json())
  if (selectedOption && inputValue) {
    res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}&${selectedOption}=${inputValue}`).then((resp)=>resp.json())
  }
  return res;
};

export const fetchByOneData = async ({queryKey}) => {
  const [_key, {url, token}] = queryKey;
  const params = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
  };
  let res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, params).then((resp)=>resp.json())
  return res;
};

export const fetchReportData = async ({queryKey}) => {
  const [_key, {url, token, startOfCurrentMonth,  endOfCurrentMonth}] = queryKey;
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  let res = await fetch(`${import.meta.env.VITE_API_URL}${url}?startOfCurrentMonth=${startOfCurrentMonth}&endOfCurrentMonth=${endOfCurrentMonth}`, params).then((resp)=>resp.json())
  return res;
};