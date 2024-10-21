import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const convertirImagenABase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous'; 
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};


export const generarPDF = ({
  nameReport="sin-nombre", 
  detailReport="sin detalle",
  tableHeader=[],
  tableRows=[],
  logoBase64}) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Café el avispero.", 60, 30);
  doc.setFontSize(16);
  doc.text(nameReport, 60, 40);
  doc.setFontSize(12);
  doc.text(detailReport, 60, 45);

  const headers = tableHeader.map((column) => column.label);
  const rows = tableRows.map((row) => {
    return tableHeader.map((column) => {
      const value = column.value.split('.').reduce((o, i) => o[i], row);
      return typeof value === "boolean" ? (value === true ? "Activo" : "Desactivado") : value;
    });
  });

  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', 10, 10, 50, 50); // Posición (x, y) y tamaño (ancho, alto)
  }
  
  doc.autoTable({
    startY: 65,
    theme: 'grid',
    head: [headers],
    body: rows,
  });
  doc.save(`${nameReport}.pdf`);
};