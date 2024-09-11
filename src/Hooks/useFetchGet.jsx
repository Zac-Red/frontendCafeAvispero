import { useState, useEffect } from "react";

export default function useFetchGet(url, page, limit, reload=false) {
  const [loading, setloading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, seterror] = useState(null);

  const endpoint = `${import.meta.env.VITE_API_URL}${url}?page=${page}&limit=${limit}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
      // "token": token
    }
  };
  
  const refresh = async() =>{
    try {
      const res = await fetch(endpoint, params);
      const json = await res.json();
      if (json) {
        const {error} = json;
        if (error) {
          throw error
        }
        setResult(json);
        setloading(false);
      }
    } catch (err) {
      seterror(err);
      setloading(false);
    }
  }
  
  useEffect(() => {
    refresh()
  }, [url, page, reload]);

  return {
    loading,
    result,
    error,
  };
}
