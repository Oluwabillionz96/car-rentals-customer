"use client";

import useBookingStore from "@/store/booking-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
  const { id: bookingId } = useParams();
  const router = useRouter();
  const { bookings } = useBookingStore();
  const booking = bookings.find((booking) => booking.bookingId === bookingId);
  useEffect(() => {
    if (!booking) {
      router.push("/our-fleet");
    }

    if (booking?.status !== "draft" && booking?.status !== null) {
      router.push(`/booking-details/${booking?.bookingId}`);
    }
  }, [booking, router]);

  if (!booking) return null;

  return <>{children}</>;
};

export default BookingLayout;
