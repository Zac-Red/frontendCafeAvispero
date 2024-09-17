export const getUnitMeasure = async({queryKey}) =>{
  const [_key, {url}] = queryKey;
  const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`).then((resp)=>resp.json())
  let unitmeasure = [];
  if (res) {
    unitmeasure = res.items.map((item)=>(
      {
        value: item.id,
        label: item.name
      }
    ))
  }
  return unitmeasure;
}