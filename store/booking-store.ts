import { generateBookingId } from "@/constants/cars";
import { BookingDetails,  Car, Service } from "@/lib/types";
import { loadBookings, now, persistVerifiedBookings } from "@/lib/utils";
import { create } from "zustand";



export interface BookingStore {
  bookings: BookingDetails[];
  startBooking: (service: Service | null, selectedCars: Car[] | null) => string | null;
  updateBooking: (partial: Partial<BookingDetails> & { bookingId: string }) => void;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatuses: () => void;
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
  updateBooking(partial) {
    set((state) => {
      const updated = state.bookings.map((b) =>
        b.bookingId === partial.bookingId ? { ...b, ...partial, updatedAt: now() } : b,
      );
      persistVerifiedBookings(updated);
      return { bookings: updated };
    });
  },
  cancelBooking(bookingId) {
    set((state) => {
      const updated = state.bookings.map((b) =>
        b.bookingId === bookingId
          ? ({ ...b, status: "cancelled" } as BookingDetails)
          : b,
      );
      persistVerifiedBookings(updated);
      return { bookings: updated };
    });
  },
  updateBookingStatuses() {
    set({ bookings: loadBookings() });
  },
}));


export default useBookingStore;
