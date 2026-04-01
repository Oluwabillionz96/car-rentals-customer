"use client";

import { useEffect } from "react";
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

  // Collect all images from all selected cars
  const allImages = booking?.selectedCars.flatMap((car) => car.images) || [];

  useEffect(() => {
    if (!booking) {
      router.push("/our-fleet");
    }
  }, [booking, router]);

  if (!booking) return null;

  return (
    <div>
      {/* Header */}
      <header className="mb-10">
        <button
          onClick={() => router.back()}
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
          Details for your {booking.service.name} experience
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Car Preview */}
        <BookingCardLeft allImages={allImages} booking={booking} />

        {/* Right Column: Form */}
        <BookingCardRight booking={booking}/>
      </div>
    </div>
  );
};

export default BookingPage;
