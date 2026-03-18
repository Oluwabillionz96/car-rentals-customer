import { generateBookingId } from "@/constants/cars";
import { create } from "zustand";

interface BookingDetails {
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
}

export interface BookingStore {
  booking: BookingDetails;
  verifiedBooking: BookingDetails[] | null;
  addBooking: (bookingDetails: BookingDetails) => void;
  completeBooking: () => void;
}

const getBookingFromSessionStorage = () => {
  if (typeof window === "undefined") return null;
  const jsonBooking = sessionStorage.getItem("booking");
  const booking = jsonBooking ? JSON.parse(jsonBooking) : null;
  if (booking !== null) {
    booking.pickupDate = booking.pickupDate ? new Date(booking.pickupDate) : null;
    booking.dropoffDate = booking.dropoffDate ? new Date(booking.dropoffDate) : null;
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
    bookings = bookings.map((item) => ({
      ...item,
      pickupDate: item.pickupDate ? new Date(item.pickupDate) : null,
      dropoffDate: item.dropoffDate ? new Date(item.dropoffDate) : null,
    }));
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
      const verifiedbooking = {
        ...state.booking,
        isBooked: true,
        bookingId: generateBookingId(),
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
}));

export default useBookingStore;
