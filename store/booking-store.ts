import { generateBookingId } from "@/constants/cars";
import { create } from "zustand";

export type BookingStatus = "Past" | "Future" | "Ongoing";

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
  bookingId?: string | null;
  status?: BookingStatus;
}

export interface BookingStore {
  booking: BookingDetails;
  verifiedBooking: BookingDetails[] | null;
  addBooking: (bookingDetails: BookingDetails) => void;
  completeBooking: () => void;
  updateBookingStatuses: () => void;
}

const calculateStatus = (pickup: Date | null, dropoff: Date | null): BookingStatus => {
  if (!pickup || !dropoff) return "Future";
  const now = new Date();
  
  // Normalize dates to start of day for accurate comparison if needed, 
  // but usually for car rentals time matters. Let's use full time.
  if (now < pickup) return "Future";
  if (now > dropoff) return "Past";
  return "Ongoing";
};

const getBookingFromSessionStorage = () => {
  if (typeof window === "undefined") return null;
  const jsonBooking = sessionStorage.getItem("booking");
  const booking = jsonBooking ? JSON.parse(jsonBooking) : null;
  if (booking !== null) {
    if (booking.pickupDate) booking.pickupDate = new Date(booking.pickupDate);
    if (booking.dropoffDate) booking.dropoffDate = new Date(booking.dropoffDate);
  }
  return booking;
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
        status: calculateStatus(pickupDate, dropoffDate),
      };
    });
  }
  return bookings;
};

const useBookingStore = create<BookingStore>((set) => ({
  booking: getBookingFromSessionStorage() || {
    totalPrice: 0,
    carId: "",
    pickupDate: null,
    dropoffDate: null,
    customer: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    isBooked: false,
    bookingId: null,
  },
  verifiedBooking: getVerifiedBookingsFromLocalStorage(),
  addBooking(bookingDetails) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("booking", JSON.stringify(bookingDetails));
    }
    set((state) => {
      const booking = { ...state.booking, ...bookingDetails };
      return { booking };
    });
  },
  completeBooking() {
    set((state) => {
      const pickupDate = state.booking.pickupDate;
      const dropoffDate = state.booking.dropoffDate;
      const verifiedbooking: BookingDetails = {
        ...state.booking,
        isBooked: true,
        bookingId: generateBookingId(),
        status: calculateStatus(pickupDate, dropoffDate),
      };
      const clearedBooking = {
        totalPrice: 0,
        carId: "",
        pickupDate: null,
        dropoffDate: null,
        customer: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
        isBooked: false,
        bookingId: null,
      };
      const verifiedBookings = state.verifiedBooking
        ? [...state.verifiedBooking, verifiedbooking]
        : [verifiedbooking];

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "verifiedBookings",
          JSON.stringify(verifiedBookings),
        );

        sessionStorage.removeItem("booking");
      }
      return { booking: clearedBooking, verifiedBooking: verifiedBookings };
    });
  },
  updateBookingStatuses() {
    set((state) => {
      if (!state.verifiedBooking) return state;
      const updatedBookings = state.verifiedBooking.map((b) => ({
        ...b,
        status: calculateStatus(b.pickupDate, b.dropoffDate),
      }));
      return { verifiedBooking: updatedBookings };
    });
  },
}));

export default useBookingStore;
