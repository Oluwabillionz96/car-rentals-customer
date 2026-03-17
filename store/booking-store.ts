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
}

export interface BookingStore {
  booking: BookingDetails;
  addBooking: (bookingDetails: BookingDetails) => void;
}

const getBookingFromSessionStorage = () => {
  if (typeof window === "undefined") return null;
  const jsonBooking = sessionStorage.getItem("booking");
  const booking = jsonBooking ? JSON.parse(jsonBooking) : null;
  if (booking !== null) {
    booking.pickupDate = new Date(booking.pickupDate);
    booking.dropoffDate = new Date(booking.dropoffDate);
  }
  return booking;
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
  },
  addBooking(bookingDetails) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("booking", JSON.stringify(bookingDetails));
    }
    set(() => ({ booking: bookingDetails }));
  },
}));

export default useBookingStore;
