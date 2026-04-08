"use client";

import EmptyState from "@/components/empty-state";
import useBookingStore from "@/store/booking-store";
import { CarFront } from "lucide-react";
import { useParams } from "next/navigation";

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
  const { id: bookingId } = useParams();
  const { bookings } = useBookingStore();
  const booking = bookings.find((booking) => booking.bookingId === bookingId);

  if (!booking) {
    return (
      <EmptyState
        title="Oops! We Couldn't Find This Booking."
        description="The link might be broken or your booking session may have expired. Don't worry, you can easily start a fresh reservation."
        actionLabel="Explore Our Fleet"
        actionHref="/our-fleet"
      />
    );
  }

  if (booking?.status !== "draft" && booking?.status !== null) {
    return (
      <EmptyState
        title="Booking Already Confirmed!"
        description="Great news, this booking has already been successfully processed. You can view your complete itinerary securely from your booking dashboard."
        actionLabel="View Booking Details"
        actionHref={`/booking-details/${booking.bookingId}`}
        icon={CarFront}
      />
    );
  }

  return <>{children}</>;
};

export default BookingLayout;
