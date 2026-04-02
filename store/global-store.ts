import { BookingSchedule, Service } from "@/lib/types";
import { create } from "zustand";

export interface GlobalStore {
  selectedCarsId: string[];
  tempSchedule: BookingSchedule | null;
  tempService: Service | null;
  addCar: (carId: string, selectType: "single" | "multiple") => void;
  modifyCars: (carIds: string[]) => void;
  removeCar: (carId: string) => void;
  clearCars: () => void;
  setTempSchedule: (schedule: BookingSchedule | null) => void;
  setTempService: (service: Service | null) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  selectedCarsId: [],
  tempSchedule: null,
  tempService: null,
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
    set((state) => ({
      selectedCarsId: [...new Set([...state.selectedCarsId, ...carIds])],
    }));
  },
  setTempSchedule: (schedule) => set({ tempSchedule: schedule }),
  setTempService: (service) => set({ tempService: service }),
}));

export default useGlobalStore;
