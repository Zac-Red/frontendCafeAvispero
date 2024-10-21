import { useEffect, useState } from 'react'
import { convertirImagenABase64 } from '../modules/Reports/utils/GeneretReport';

export const GetLogoReport = () => {
  const [logoBase64, setLogoBase64] = useState('');
  useEffect(() => {
    convertirImagenABase64(`/logo-coffe.png`)
      .then((base64) => {
        setLogoBase64(base64);
      })
      .catch((error) => {
        console.error("Error al cargar la imagen:", error);
      });
  }, []);
  return {
    logoBase64
  }
}
