"use client";

import useBookingStore from "@/store/booking-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const booking = useBookingStore((state) => state.booking);
  const { id, bookingId } = useParams();
  const verifiedBooking = useBookingStore(
    (state) => state.verifiedBooking,
  )?.find((booking) => booking.bookingId === bookingId);
  console.log({ verifiedBooking });
  useEffect(() => {
    if (!booking && !verifiedBooking) {
      router.push(`/cars/${id}/booking`);
    }
  }, [booking, id, router, verifiedBooking]);

  return <>{children}</>;
};

export default PaymentLayout;
