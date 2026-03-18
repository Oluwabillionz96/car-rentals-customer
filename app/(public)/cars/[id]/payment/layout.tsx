"use client";

import useBookingStore from "@/store/booking-store";
import { useParams, useRouter } from "next/navigation";

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const booking = useBookingStore((state) => state.booking);
  const verifiedBookings = useBookingStore((state) => state.verifiedBooking);
  const { id } = useParams();
  if (
    (!booking.pickupDate || !booking.dropoffDate) &&
    verifiedBookings === null
  ) {
    router.push(`/cars/${id}/booking`);
  }
  return <>{children}</>;
};

export default PaymentLayout;
