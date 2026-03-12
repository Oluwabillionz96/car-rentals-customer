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

const getBookingFromLocalStorage = () => {
  const jsonBooking = localStorage.getItem("booking");
  const booking = jsonBooking ? JSON.parse(jsonBooking) : null;
  if (booking !== null) {
    booking.pickupDate = new Date(booking.pickupDate);
    booking.dropoffDate = new Date(booking.dropoffDate);
  }
  return booking;
};

const useBookingStore = create<BookingStore>((set) => ({
  booking: getBookingFromLocalStorage() || {
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
    localStorage.setItem("booking", JSON.stringify(bookingDetails));
    set((state) => ({ booking: bookingDetails }));
  },
}));

export default useBookingStore;
