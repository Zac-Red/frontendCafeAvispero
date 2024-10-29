import axios from 'axios';

export const ServerApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const fetchPagedData = async ({queryKey}) => {
  const [_key, {url, page, rowsPerPage, selectedOption, inputValue, token}] = queryKey;
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  let res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}`, params).then((resp)=>resp.json())
  if (selectedOption && inputValue) {
    res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}&${selectedOption}=${inputValue}`, params).then((resp)=>resp.json())
  }
  return res;
};


export const fetchPagedDataSearch = async ({queryKey}) => {
  const [_key, {url, page, rowsPerPage, selectedOption, inputValue, token}] = queryKey;
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  let res = []
  if (selectedOption && inputValue) {
    res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}&${selectedOption}=${inputValue}`, params).then((resp)=>resp.json())
  }
  return res;
};

export const fetchPagedDatanotSearch = async ({queryKey}) => {
  const [_key, {url, page, rowsPerPage, token}] = queryKey;
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  let res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}`, params).then((resp)=>resp.json())
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

export const fetchDatawitmParam = async ({queryKey}) => {
  const [_key, {url, page, rowsPerPage, queryparam, valuequery, token}] = queryKey;
  let res = [];
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  if (queryparam && valuequery) {
    res = await fetch(`${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${rowsPerPage}&${queryparam}=${valuequery}`, params)
    .then((resp)=>resp.json())
  }
  return res;
};