export const getUnitMeasure = async ({ queryKey }) => {
  const [_key, { url, token }] = queryKey;
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, params).then((resp) => resp.json())
  let unitmeasure = [];
  if (res.items) {
    unitmeasure = res.items.map((item) => (
      {
        value: item.id,
        label: item.name
      }
    ))
  }
  return unitmeasure;
}

export const getUnitMeasureObject = async ({ queryKey }) => {
  const [_key, { url, token }] = queryKey;
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, params).then((resp) => resp.json())
  return res;
}


export const getSupplier = async ({ queryKey }) => {
  const [_key, { url, token }] = queryKey;
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, params).then((resp) => resp.json())
  let supplier = [];
  if (res.items) {
    supplier = res.items.map((item) => (
      {
        value: item.id,
        label: item.personeria
      }
    ))
  }
  return supplier;
}