import { create } from "zustand";

interface GlobalStore {
  selectedCarsId: string[];
  addCar: (carId: string, selectType: "single" | "multiple") => void;
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
}));

export default useGlobalStore;
