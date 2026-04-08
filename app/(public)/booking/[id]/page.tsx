"use client";
import { useParams, useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import useBookingStore from "@/store/booking-store";

import BookingCardLeft from "@/components/booking-card-left";
import BookingCardRight from "@/components/booking-card-right";

const BookingPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { bookings } = useBookingStore();

  const booking = bookings.find((b) => b.bookingId === id);

 

  return (
    <div>
      {/* Header */}
      <header className="mb-10">
        <button
          onClick={() => router.push("/")}
          className="lg:flex hidden items-center gap-2 text-text-300 hover:text-primary transition-colors mb-4 font-bold"
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <h1 className="text-3xl md:text-5xl font-black text-text-100 tracking-tight">
          Complete Your{" "}
          <span className="text-primary text-nowrap">Booking</span>
        </h1>
        <p className="text-text-200 mt-2">
          Details for your {booking?.service.name} experience
        </p>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start relative">
        {/* Left Column: Form (Sticky on Desktop) */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 w-full">
          <BookingCardRight booking={booking ?? null} />
        </div>

        {/* Right Column: Car Details / Cards */}
        <div className="lg:col-span-5 w-full">
          <BookingCardLeft booking={booking ?? null} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
