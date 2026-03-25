import { create } from "zustand";

export type BookingStatus = "Past" | "Future" | "Ongoing" | "Cancelled";

export interface BookingDetails {
  totalPrice: number;
  carId: string;
  pickupDate: Date | null;
  dropoffDate: Date | null;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  isBooked?: boolean;
  bookingId: string | null;
  status?: BookingStatus;
}

export interface BookingStore {
  booking: BookingDetails | null;
  verifiedBooking: BookingDetails[] | null;
  addBooking: (bookingDetails: BookingDetails) => void;
  completeBooking: () => void;
  updateBookingStatuses: () => void;
  cancelBooking: (bookingId: string) => void;
}

const calculateStatus = (
  pickup: Date | null,
  dropoff: Date | null,
): BookingStatus => {
  if (!pickup || !dropoff) return "Future";
  const now = new Date();

  // Normalize dates to start of day for accurate comparison if needed,
  // but usually for car rentals time matters. Let's use full time.
  if (now < pickup) return "Future";
  if (now > dropoff) return "Past";
  return "Ongoing";
};

const getVerifiedBookingsFromLocalStorage = () => {
  if (typeof window === "undefined") return [];
  const jsonBooking = localStorage.getItem("verifiedBookings");
  let bookings: BookingDetails[] | null = jsonBooking
    ? JSON.parse(jsonBooking)
    : null;
  if (bookings !== null) {
    bookings = bookings.map((item) => {
      const pickupDate = item.pickupDate ? new Date(item.pickupDate) : null;
      const dropoffDate = item.dropoffDate ? new Date(item.dropoffDate) : null;
      return {
        ...item,
        pickupDate,
        dropoffDate,
        status:
          item.status === "Cancelled"
            ? "Cancelled"
            : calculateStatus(pickupDate, dropoffDate),
      };
    });
  }
  return bookings;
};

const useBookingStore = create<BookingStore>((set) => ({
  booking: null,
  verifiedBooking: getVerifiedBookingsFromLocalStorage(),
  addBooking(bookingDetails) {
    set(() => ({ booking: bookingDetails }));
  },
  completeBooking() {
    set((state) => {
      if (!state.booking) return { verifiedBooking: state.verifiedBooking };
      const pickupDate = state.booking.pickupDate;
      const dropoffDate = state.booking.dropoffDate;
      const verifiedbooking: BookingDetails = {
        ...state.booking,
        isBooked: true,
        status: calculateStatus(pickupDate, dropoffDate),
      };

      const verifiedBookings = state.verifiedBooking
        ? [...state.verifiedBooking, verifiedbooking]
        : [verifiedbooking];

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "verifiedBookings",
          JSON.stringify(verifiedBookings),
        );
      }
      return { verifiedBooking: verifiedBookings, booking: null };
    });
  },
  updateBookingStatuses() {
    set((state) => {
      if (!state.verifiedBooking) return state;
      const updatedBookings = state.verifiedBooking.map((b) => {
        if (b.status === "Cancelled") return b;
        const status = calculateStatus(b.pickupDate, b.dropoffDate);
        return {
          ...b,
          status,
          isBooked: status === "Cancelled" || status === "Past" ? false : true,
        };
      });
      return { verifiedBooking: updatedBookings };
    });
  },
  cancelBooking(bookingId) {
    set((state) => {
      if (!state.verifiedBooking) return state;
      const updatedBookings = state.verifiedBooking.map((b) =>
        b.bookingId === bookingId
          ? { ...b, status: "Cancelled" as const, isBooked: false }
          : b,
      );

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "verifiedBookings",
          JSON.stringify(updatedBookings),
        );
      }
      return { verifiedBooking: updatedBookings };
    });
  },
}));

export default useBookingStore;
