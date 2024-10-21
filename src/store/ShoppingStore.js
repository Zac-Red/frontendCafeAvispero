import { create } from 'zustand';

// Función para calcular el total de la compra
const calcularTotalCompra = (compra) => {
  return compra.reduce((total, producto) => total + producto.subtotal, 0);
};

const shoppingStore = create((set, get) => ({
  totalCompra: 0,
  compra: [],
  supplier: null,
  commercialdocument: null,
  datecommercialdocument: null,

  addRawMaterial: (rawmaterial) => {
    set((state) => {
      const rawmaterialExist = state.compra.find((item) => item.id === rawmaterial.id);
      if (rawmaterialExist) {
        const nuevaCompra = state.compra.map((item) => {
          if (item.id === producto.id) {
            return { ...item, amount: item.amount + producto.amount, subtotal: (item.amount + producto.amount) * item.price }
          }
          return item
        });
        return {
          compra: nuevaCompra,
          totalCompra: calcularTotalCompra(nuevaCompra),
        };
      }
      const nuevoProducto = { ...rawmaterial, amount: rawmaterial.amount, subtotal: rawmaterial.amount * rawmaterial.price };
      const nuevaCompra = [...state.compra, nuevoProducto];
      return {
        compra: nuevaCompra,
        totalCompra: calcularTotalCompra(nuevaCompra),
      };
    });
  },

  incrementRawMaterial: (rawmaterial) => {
    set((state) => {
      const rawmaterialExist = state.compra.find((item) => item.id === rawmaterial.id);
      if (rawmaterialExist) {
        const nuevaCompra = state.compra.map((item) => {
          if (item.id === rawmaterial.id) {
            return { ...item, amount: item.amount + 1, subtotal: (item.amount + 1) * item.price }
          }
          return item
        });
        return {
          compra: nuevaCompra,
          totalCompra: calcularTotalCompra(nuevaCompra),
        };
      }
    })
  },

  decrementRawMaterial: (rawmaterial) => {
    set((state) => {
      const rawmaterialExist = state.compra.find((item) => item.id === rawmaterial.id);
      if (!rawmaterialExist) return state;
      if (rawmaterialExist.amount === 1) {
        const nuevaCompra = state.compra.filter((item) => item.id !== rawmaterial.id);
        return {
          compra: nuevaCompra,
          totalCompra: calcularTotalCompra(nuevaCompra),
        };
      }
      const nuevaCompra = state.compra.map((item) =>
        item.id === rawmaterial.id
          ? { ...item, amount: item.amount - 1, subtotal: (item.amount - 1) * item.price }
          : item
      );
      return {
        compra: nuevaCompra,
        totalCompra: calcularTotalCompra(nuevaCompra),
      };
    });
  },

  DeletedRawMaterial: (rawmaterial) => {
    set((state) => {
      const nuevaCompra = state.compra.filter((item) => item.id !== rawmaterial.id);
      return {
        compra: nuevaCompra,
        totalCompra: calcularTotalCompra(nuevaCompra),
      };
    });
  },

  cleanCartShopping: () => {
    set({
      compra: [],
      totalCompra: 0,
      supplier: null,
      commercialdocument: null,
      datecommercialdocument: null
    });
  },

  setSupplierAndDocument: (data) => {
    set({
      supplier: data.supplier,
      commercialdocument: data.document,
      datecommercialdocument: data.datecommercialdocument
    });
  },

}));

export default shoppingStore;

