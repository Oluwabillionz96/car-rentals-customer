import { generateBookingId } from "@/constants/cars";
import { BookingDetails, Car, Service } from "@/lib/types";
import { loadBookings, now, persistVerifiedBookings } from "@/lib/utils";
import { create } from "zustand";

export type BookingStatus = "Past" | "Future" | "Ongoing" | "Cancelled";

export interface BookingStore {
  bookings: BookingDetails[];
  startBooking: (service: Service | null, selectedCars: Car[] | null) => string | null;
}

const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: loadBookings(),
  startBooking(service, selectedCars) {
    if (!selectedCars || !service) return null;
    const draft: BookingDetails = {
      bookingId: generateBookingId(),
      service: service,
      selectedCars: selectedCars,
      schedule: null,
      customer: null,
      extensions: [],
      status: "draft",
      createdAt: now(),
    };
    const { bookings } = get();
    persistVerifiedBookings([...bookings, draft]);
    set((state) => ({
      bookings: [...state.bookings, draft],
    }));
    return draft.bookingId;
  },
}));

export default useBookingStore;
