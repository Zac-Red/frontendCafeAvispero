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