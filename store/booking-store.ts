import { generateBookingId } from "@/constants/cars";
import { BookingDetails, BookingSchedule, Car, Service } from "@/lib/types";
import { loadBookings, now, persistVerifiedBookings } from "@/lib/utils";
import { create } from "zustand";



export interface BookingStore {
  bookings: BookingDetails[];
  startBooking: (
    service: Service | null,
    selectedCars: Car[] | null,
    schedule?: BookingSchedule | null
  ) => string | null;
  updateBooking: (
    partial: Partial<BookingDetails> & { bookingId: string }
  ) => void;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatuses: () => void;
  completeBooking: () => void;
  extendBooking: (bookingId: string, hours: number, amount: number) => void;
}

const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: loadBookings(),
  startBooking(service, selectedCars, schedule = null) {
    if (!selectedCars || !service) return null;
    const draft: BookingDetails = {
      bookingId: generateBookingId(),
      service: service,
      selectedCars: selectedCars,
      schedule: schedule ?? null,
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
  completeBooking() {
    // This is a stub or would handle finalizing the check-in/out process
  },
  extendBooking(bookingId: string, hours: number, amount: number) {
    set((state) => {
      const updated = state.bookings.map((b) =>
        b.bookingId === bookingId
          ? {
              ...b,
              extensions: [
                ...b.extensions,
                { addedHours: hours, addedAt: now(), additionalAmount: amount },
              ],
            }
          : b,
      );
      persistVerifiedBookings(updated);
      return { bookings: updated };
    });
  },
}));


export default useBookingStore;
