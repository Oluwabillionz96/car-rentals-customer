import { BookingSchedule, Service, SelectedCar } from "@/lib/types";
import { create } from "zustand";

export interface GlobalStore {
  selectedCars: SelectedCar[];
  tempSchedule: BookingSchedule | null;
  tempService: Service | null;
  addCar: (carId: string, selectType: "single" | "multiple") => void;
  updateCarQuantity: (carId: string, quantity: number) => void;
  modifyCars: (cars: SelectedCar[]) => void;
  removeCar: (carId: string) => void;
  clearCars: () => void;
  setTempSchedule: (schedule: BookingSchedule | null) => void;
  setTempService: (service: Service | null) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  selectedCars: [],
  tempSchedule: null,
  tempService: null,
  addCar: (carId, selectType) => {
    if (selectType === "single") {
      set(() => ({ selectedCars: [{ carId, quantity: 1 }] }));
    } else {
      set((state) => {
        const existing = state.selectedCars.find((sc) => sc.carId === carId);
        if (existing) {
          // Already selected, increment quantity
          return {
            selectedCars: state.selectedCars.map((sc) =>
              sc.carId === carId ? { ...sc, quantity: sc.quantity + 1 } : sc,
            ),
          };
        }
        // New selection
        return {
          selectedCars: [...state.selectedCars, { carId, quantity: 1 }],
        };
      });
    }
  },
  updateCarQuantity: (carId, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        // Remove if quantity is 0
        return {
          selectedCars: state.selectedCars.filter((sc) => sc.carId !== carId),
        };
      }
      const existing = state.selectedCars.find((sc) => sc.carId === carId);
      if (existing) {
        // Update existing
        return {
          selectedCars: state.selectedCars.map((sc) =>
            sc.carId === carId ? { ...sc, quantity } : sc,
          ),
        };
      }
      // Add new
      return {
        selectedCars: [...state.selectedCars, { carId, quantity }],
      };
    });
  },
  removeCar: (carId) => {
    set((state) => ({
      selectedCars: state.selectedCars.filter((sc) => sc.carId !== carId),
    }));
  },
  clearCars: () => {
    set(() => ({ selectedCars: [] }));
  },
  modifyCars(cars) {
    set(() => ({ selectedCars: cars }));
  },
  setTempSchedule: (schedule) => set({ tempSchedule: schedule }),
  setTempService: (service) => set({ tempService: service }),
}));

export default useGlobalStore;
