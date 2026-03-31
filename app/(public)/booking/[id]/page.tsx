"use client";

import useBookingStore from "@/store/booking-store";
import { useParams, useRouter } from "next/navigation";

const BookingPage = () => {
  const { id } = useParams();
  const booking = useBookingStore((state) =>
    state.bookings.find((b) => b.bookingId === id),
  );
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() =>
          router.push(
            `/our-fleet?service=${booking?.service.id}&select=true&selectType=${booking?.service.selectType}&booking=${booking?.bookingId}`,
          )
        }
      >
        {booking?.service.selectType === "multiple" ? "Add Cars" : "Change Car"}
      </button>
    </div>
  );
};

export default BookingPage;
