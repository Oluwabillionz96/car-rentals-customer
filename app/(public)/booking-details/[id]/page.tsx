"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin, Hash} from "lucide-react";
import useBookingStore from "@/store/booking-store";
import { getCar } from "@/constants/cars";
import { calculateDays } from "@/lib/utils";
import EmptyState from "@/components/empty-state";
import { useCancelBooking } from "@/hooks/use-cancel-booking";
import CancellationCard from "@/components/cancellation-card";

const BookingDetailsPage = () => {
  const { id } = useParams();
  const verifiedBookings = useBookingStore((state) => state.verifiedBooking);

  const booking = verifiedBookings?.find((b) => b.bookingId === id);
  const car = booking ? getCar(booking.carId) : null;

  const { openCancelModal, CancelModal } = useCancelBooking({
    carName: car?.name || "",
    bookingId: booking?.bookingId || "",
  });

  if (!booking || !car) {
    return (
      <EmptyState
        title="Booking Not Found"
        description={`We couldn't find any active booking with the ID: ${id}. Please check your confirmation email.`}
        icon={Hash}
        actionLabel="Return Home"
        actionHref="/"
      />
    );
  }

  const days = calculateDays(booking.pickupDate, booking.dropoffDate);

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "Future":
        return (
          <span className="w-fit px-3 py-1 bg-blue-50 text-blue-500 text-[10px] font-bold rounded-md uppercase tracking-wide border border-blue-100">
            Upcoming
          </span>
        );
      case "Ongoing":
        return (
          <span className="w-fit px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase tracking-wide border border-emerald-100">
            Ongoing
          </span>
        );
      case "Past":
        return (
          <span className="w-fit px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md uppercase tracking-wide border border-slate-200">
            Completed
          </span>
        );
      case "Cancelled":
        return (
          <span className="w-fit px-3 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded-md uppercase tracking-wide border border-red-100">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] pb-20 lg:pb-10 font-[Inter]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
        {/* Left Column: Image & Location */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Hero Image Card */}
          <div className="relative w-full aspect-4/3 md:aspect-video lg:rounded-[24px] overflow-hidden shadow-2xl shadow-slate-200/50 bg-white">
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Pick-up Location Card */}
          <div className="bg-white rounded-[24px] p-3 lg:p-6 shadow-xl shadow-slate-200/40 border border-slate-50">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={18} className="text-primary" />
              <h3 className="text-base font-bold text-[#1e293b]">
                Pick-up Location
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-text-300 text-sm leading-relaxed">
                De-Castle Luxury Home
              </p>

              <div className="w-full h-48 md:h-64 relative rounded-[16px] overflow-hidden border border-slate-100">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                      <MapPin size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Info, Payment & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-4 md:mx-6 lg:mx-0 ">
          {/* Main Booking Summary Card */}
          <div className="bg-white rounded-[24px] p-3 lg:p-6 shadow-xl shadow-slate-200/40 border border-slate-50">
            <div className="flex justify-between items-start mb-4 flex-col gap-6 md:gap-2 md:flex-row">
              <div className="flex flex-col gap-1.5">
                {getStatusBadge(booking.status)}
                <h2 className="text-2xl font-bold text-[#1e293b]">
                  {car.name}
                </h2>
                <p className="text-sm text-slate-400 font-medium">
                  {car.type} • {car.transmission}
                </p>
              </div>
              <div className="md:text-right">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mb-0.5">
                  Booking ID
                </p>
                <p className="text-xs font-bold text-slate-800">
                  {booking.bookingId || "SCR-2026-XXXXX"}
                </p>
              </div>
            </div>

            {/* Date Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-3 py-6 border-y border-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#E1F5FE] rounded-lg text-[#4FBFF8]">
                  <Calendar size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                    Pick-up
                  </span>
                  <span className="text-sm font-bold text-[#1e293b]">
                    {formatDate(booking.pickupDate)}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    10:00 AM
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#E1F5FE] rounded-lg text-[#4FBFF8]">
                  <Calendar size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                    Drop-off
                  </span>
                  <span className="text-sm font-bold text-[#1e293b]">
                    {formatDate(booking.dropoffDate)}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    10:00 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="pt-6 space-y-3.5">
              <h3 className="text-base font-bold text-[#1e293b] mb-3">
                Payment Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium whitespace-nowrap">
                    Rental Fee ({days} {days === 1 ? "day" : "days"})
                  </span>
                  <span className="text-[#1e293b] font-bold">
                    ₦ {booking.totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium whitespace-nowrap">
                    Insurance (Premium)
                  </span>
                  <span className="text-[#1e293b] font-bold">₦0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium whitespace-nowrap">
                    Taxes & Fees
                  </span>
                  <span className="text-[#1e293b] font-bold">₦0.00</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-slate-50">
                <p className="text-base font-bold text-[#1e293b]">Total Paid</p>
                <p className="text-lg md:text-2xl font-bold text-[#4FBFF8] tracking-tight">
                  ₦ {booking.totalPrice.toLocaleString()}
                </p>
              </div>

              {/* <div className="mt-4 p-3.5 bg-[#F1FBF6] rounded-xl flex items-center gap-2.5 border border-green-50">
                <ShieldCheck size={16} className="text-green-500" />
                <p className="text-[11px] font-semibold text-green-700">
                  Paid via Visa ending in 4242
                </p>
              </div> */}
            </div>
          </div>

          {/* Cancellation Policy Card */}
          {booking.status === "Future" && (
            <CancellationCard
              pickupDate={booking.pickupDate}
              onCancel={openCancelModal}
              className="mt-2"
            />
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal via Hook */}
      <CancelModal />
    </div>
  );
};

export default BookingDetailsPage;
