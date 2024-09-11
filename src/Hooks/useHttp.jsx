import { useMutation } from '@tanstack/react-query';
import { ServerApi } from '../Api/HttpServer';
import { PostElement } from '../modules/Auth/service/actions';

const methodTypes = {
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const useHttp = () => {
  // const requestFn = async (formData) => {
  //   switch (method) {
  //     case methodTypes.POST:
  //       const { data } = await ServerApi.post(url, formData, config);
  //       return data;
  //     case methodTypes.PATCH:
  //       return await ServerApi.patch(url, formData, config);
  //     case methodTypes.DELETE:
  //       return await ServerApi.delete(url, { ...config, formData });
  //     default:
  //       throw new Error(`Método ${method} no soportado`);
  //   }
  // };

  const mutation = useMutation({
    mutationFn: PostElement,
    // onSuccess: () => {
    //   console.log("Paso");
    // },
  });
  return mutation;
}





