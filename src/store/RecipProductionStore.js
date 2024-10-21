import { create } from 'zustand';

const RecipProductionStore = create((set, get) => ({
  name: "",
  amount: 0,
  detailsproduction: [],
  product: null,

  setRawMaterial: (rawmaterial) => {
    set((state) => {
      const rawmaterialExist = state.detailsproduction.find((item) => item.id === rawmaterial.id);
      if (rawmaterialExist) {
        const nwDetail = state.detailsproduction.map((item) => {
          if (item.id === rawmaterial.id && item.unitmeasureId === rawmaterial.unitmeasureId) {
            return { ...item, amount: item.amount + rawmaterial.amount }
          }else{
            throw "Unidad de medida incorrecta"
          }
          return item
        });
        return {
          detailsproduction: nwDetail,
        };
      }
      const nwDetail = { ...rawmaterial, amount: rawmaterial.amount };
      const nwDetails = [...state.detailsproduction, nwDetail];
      return {
        detailsproduction: nwDetails,
      };
    });
  },

  incrementRaw: (rawmaterial) => {
    set((state) => {
      const rawmaterialExist = state.detailsproduction.find((item) => item.id === rawmaterial.id);
      if (rawmaterialExist) {
        const nwDetail = state.detailsproduction.map((item) => {
          if (item.id === rawmaterial.id) {
            return { ...item, amount: item.amount + 1}
          }
          return item
        });
        return {
          detailsproduction: nwDetail,
        };
      }
    })
  },

  decrementRaw: (rawmaterial) => {
    set((state) => {
      const rawmaterialExist = state.detailsproduction.find((item) => item.id === rawmaterial.id);
      if (!rawmaterialExist) return state;
      if (rawmaterialExist.amount === 1) {
        const nwDetail = state.detailsproduction.filter((item) => item.id !== rawmaterial.id);
        return {
          detailsproduction: nwDetail,
        };
      }
      const nwDetails = state.detailsproduction.map((item) =>
        item.id === rawmaterial.id
          ? { ...item, amount: item.amount - 1}
          : item
      );
      return {
        detailsproduction: nwDetails,
      };
    });
  },

  eliminarRaw: (rawmaterial) => {
    set((state) => {
      const nwDetails = state.detailsproduction.filter((item) => item.id !== rawmaterial.id);
      return {
        detailsproduction: nwDetails,
      };
    });
  },

  clearRecip: () => {
    set({
      name: "",
      amount: 0,
      detailsproduction: [],
      product: null,
    });
  },

  seterProduct: (process) => {
    set({
      product: process.product,
      name: process.name,
      amount: process.amount,
    });
  },
}));

export default RecipProductionStore;

