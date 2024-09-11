import { ServerApi } from "../../../Api/HttpServer";

export const PostElement = async({url, formData, token})=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await ServerApi.post(url, formData, config);
  return data;
}

export const getRoles = async({queryKey}) =>{
  const [_key, {url}] = queryKey;
  const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`).then((resp)=>resp.json())
  let roles = [];
  if (res) {
    roles = res.map((item)=>(
      {
        value: item.id,
        label: item.role
      }
    ))
  }
  return roles;
}