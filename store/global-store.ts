import { create } from "zustand";

interface GlobalStore {
  selectedCarsId: string[];
  addCar: (carId: string, selectType: "single" | "multiple") => void;
  modifyCars: (carIds: string[]) => void;
  removeCar: (carId: string) => void;
  clearCars: () => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  selectedCarsId: [],
  addCar: (carId, selectType) => {
    if (selectType === "single") {
      set(() => ({ selectedCarsId: [carId] }));
    } else {
      set((state) => ({ selectedCarsId: [...state.selectedCarsId, carId] }));
    }
  },
  removeCar: (carId) => {
    set((state) => ({
      selectedCarsId: state.selectedCarsId.filter((id) => id !== carId),
    }));
  },
  clearCars: () => {
    set(() => ({ selectedCarsId: [] }));
  },
  modifyCars(carIds) {
    set((state) => ({ selectedCarsId: [...new Set([...state.selectedCarsId, ...carIds])] }));
  },
}));

export default useGlobalStore;
