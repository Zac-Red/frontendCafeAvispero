import { create } from 'zustand';

// Función para calcular el total de la compra
const calcularTotalCompra = (compra) => {
  return compra.reduce((total, producto) => total + producto.subtotal, 0);
};

const cartStore = create((set, get) => ({
  totalCompra: 0,
  compra: [],
  cliente: null,

  agregarProducto: (producto) => {
    set((state) => {
      const productoExistente = state.compra.find((item) => item.id === producto.id);
      if (productoExistente) {
        const nuevaCompra = state.compra.map((item) => {
          if (item.id === producto.id) {
            if (item.stock < item.amount + producto.amount) {
              throw "Stock insuficiente"
            }else{
              return { ...item, amount: item.amount + producto.amount, subtotal: (item.amount + producto.amount) * item.price }
            }
          }
          return item
        });
        return {
          compra: nuevaCompra,
          totalCompra: calcularTotalCompra(nuevaCompra),
        };
      }
      const nuevoProducto = { ...producto, amount: producto.amount, subtotal: producto.amount * producto.price };
      const nuevaCompra = [...state.compra, nuevoProducto];
      return {
        compra: nuevaCompra,
        totalCompra: calcularTotalCompra(nuevaCompra),
      };
    });
  },

  aumentarProducto: (producto) => {
    set((state) => {
      const productoExistente = state.compra.find((item) => item.id === producto.id);
  
      if (productoExistente) {
        const nuevaCompra = state.compra.map((item) => {
          if (item.id === producto.id) {
            if (item.stock < item.amount + 1) {
              throw "Stock insuficiente"
            }else{
              return { ...item, amount: item.amount + 1, subtotal: (item.amount + 1) * item.price }
            }
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

  decrementarProducto: (producto) => {
    set((state) => {
      const productoExistente = state.compra.find((item) => item.id === producto.id);
      if (!productoExistente) return state;
      if (productoExistente.amount === 1) {
        const nuevaCompra = state.compra.filter((item) => item.id !== producto.id);
        return {
          compra: nuevaCompra,
          totalCompra: calcularTotalCompra(nuevaCompra),
        };
      }
      const nuevaCompra = state.compra.map((item) =>
        item.id === producto.id
          ? { ...item, amount: item.amount - 1, subtotal: (item.amount - 1) * item.price }
          : item
      );
      return {
        compra: nuevaCompra,
        totalCompra: calcularTotalCompra(nuevaCompra),
      };
    });
  },

  eliminarProducto: (producto) => {
    set((state) => {
      const nuevaCompra = state.compra.filter((item) => item.id !== producto.id);
      return {
        compra: nuevaCompra,
        totalCompra: calcularTotalCompra(nuevaCompra),
      };
    });
  },

  limpiarCarrito: () => {
    set({
      compra: [],
      totalCompra: 0,
      cliente: null
    });
  },

  agregarCliente: (cliente) => {
    set({
      cliente,
    });
  },

  // realizarPeticion: async (url, options) => {
  //   try {
  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     console.log('Respuesta de la petición:', data);
  //     // Puedes actualizar el estado con la respuesta si es necesario
  //   } catch (error) {
  //     console.error('Error al realizar la petición:', error);
  //   }
  // }
}));

export default cartStore;

