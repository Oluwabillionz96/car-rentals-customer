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

const useBookingStore = create<BookingStore>((set) => ({
  booking: {
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
    set((state) => ({ booking: bookingDetails }));
  },
}));

export default useBookingStore;
