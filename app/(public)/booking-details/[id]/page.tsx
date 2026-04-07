"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Hash,
  Car,
  CreditCard,
  MapPin,
  Copy,
  Check,
} from "lucide-react";

import useBookingStore from "@/store/booking-store";
import { calculatePrice, calculateDays } from "@/lib/utils";
import { BookingStatus } from "@/lib/types";
import EmptyState from "@/components/empty-state";
import { useCancelBooking } from "@/hooks/use-cancel-booking";
import CancellationCard from "@/components/cancellation-card";
import Map from "@/components/map";
import { VehicleCard } from "@/components/car-card";
import CustomerInfo from "@/components/customer-info";
import ScheduleInfo from "@/components/schedule-info";

// ─── Status Badge ────────────────────────────────────────────────────────────
const getStatusBadge = (status: BookingStatus) => {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    confirmed: {
      bg: "bg-blue-50 border-blue-100",
      text: "text-blue-500",
      label: "Upcoming",
    },
    ongoing: {
      bg: "bg-emerald-50 border-emerald-100",
      text: "text-emerald-600",
      label: "Ongoing",
    },
    past: {
      bg: "bg-slate-100 border-slate-200",
      text: "text-slate-500",
      label: "Completed",
    },
    cancelled: {
      bg: "bg-red-50 border-red-100",
      text: "text-red-500",
      label: "Cancelled",
    },
    draft: {
      bg: "bg-amber-50 border-amber-100",
      text: "text-amber-500",
      label: "Draft",
    },
  };

  if (!status) return null;
  const c = config[status];
  if (!c) return null;

  return (
    <span
      className={`w-fit px-3 py-1 ${c.bg} ${c.text} text-[10px] font-bold rounded-md uppercase tracking-wide border`}
    >
      {c.label}
    </span>
  );
};

// ─── Payment Summary Section ─────────────────────────────────────────────────
const BookingPaymentSummary = ({
  totalPrice,
  durationLabel,
}: {
  totalPrice: number;
  durationLabel: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.4 }}
    className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
  >
    <div className="p-6 md:p-8 border-b border-slate-50">
      <h2 className="text-base font-black text-text-100 uppercase italic tracking-tighter flex items-center gap-2">
        <CreditCard size={18} className="text-primary" />
        Payment Summary
      </h2>
    </div>

    <div className="p-6 md:p-8 space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-text-300 font-medium">
          Rental Fee ({durationLabel})
        </span>
        <span className="text-text-100 font-bold">
          ₦{totalPrice.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-text-300 font-medium">Insurance (Premium)</span>
        <span className="text-text-100 font-bold">₦0</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-text-300 font-medium">Taxes & Fees</span>
        <span className="text-text-100 font-bold">₦0</span>
      </div>

      <div className="pt-4 flex justify-between items-center border-t border-slate-100">
        <p className="text-base font-bold text-text-100">Total Paid</p>
        <p className="text-2xl font-black text-primary tracking-tight">
          ₦{totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  </motion.div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────
const BookingDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { bookings } = useBookingStore();
  const [copied, setCopied] = useState(false);

  const booking = bookings.find((b) => b.bookingId === id);

  const { openCancelModal, CancelModal } = useCancelBooking({
    carName: booking?.selectedCars[0]?.name || "",
    bookingId: booking?.bookingId || "",
  });

  if (!booking || booking.selectedCars.length === 0) {
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

  const totalPrice = calculatePrice(booking);

  // Build duration label
  const getDurationLabel = () => {
    if (booking.schedule?.type === "hourly") {
      return `${booking.schedule.hours} ${booking.schedule.hours === 1 ? "hour" : "hours"}`;
    }
    if (booking.schedule?.type === "daily") {
      const days = calculateDays(
        booking.schedule.pickupDate,
        booking.schedule.dropoffDate,
      );
      return `${days} ${days === 1 ? "day" : "days"}`;
    }
    return "N/A";
  };

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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-2">
            <h1 className="text-3xl md:text-5xl font-black text-text-100 tracking-tight">
              Booking <span className="text-primary text-nowrap">Details</span>
            </h1>
            {getStatusBadge(booking.status)}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="text-text-200">{booking.service.name} experience</p>
            <span className="hidden sm:inline text-slate-200">•</span>
            <div className="flex items-center gap-2">
              <p className="text-base text-text-100 font-bold uppercase tracking-wider">
                ID: {booking.bookingId}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(booking.bookingId);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-text-300 hover:text-text-100"
                title="Copy Booking ID"
              >
                {copied ? (
                  <Check size={16} className="text-emerald-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Two-Column Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cars */}
        <div className="lg:col-span-7 w-full order-2 lg:order-1">
          <div className="flex items-center gap-2 mb-4 px-1">
            <Car size={18} className="text-primary" />
            <h3 className="text-lg font-black text-text-100 uppercase italic tracking-tighter">
              Selected Vehicles ({booking.selectedCars.length})
            </h3>
          </div>
          <div className="space-y-4">
            {booking.selectedCars.map((car, index) => (
              <VehicleCard
                key={car.id + index}
                car={car}
                index={index}
                booking={booking}
              />
            ))}
          </div>

          {/* Pick-up Location */}
          {booking?.service?.id === "self_drive" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mt-8"
            >
              <div className="p-6 md:p-8 border-b border-slate-50">
                <h2 className="text-base font-black text-text-100 uppercase italic tracking-tighter flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  Pick-up Location
                </h2>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <p className="text-text-300 text-sm leading-relaxed">
                  De-Castle Luxury Home
                </p>
                <div className="w-full h-48 md:h-64 relative rounded-2xl overflow-hidden border border-slate-100">
                  <Map />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Summary + Details */}
        <div className="lg:col-span-5 w-full space-y-8 order-1 lg:order-2">
          {/* Payment Summary */}
          <BookingPaymentSummary
            totalPrice={totalPrice}
            durationLabel={getDurationLabel()}
          />

          {/* Schedule Info */}
          <ScheduleInfo booking={booking} />

          {/* Customer Info */}
          <CustomerInfo booking={booking} />

          {/* Cancellation Card (only for upcoming bookings) */}
          {booking.status === "confirmed" && (
            <CancellationCard
              schedule={booking.schedule}
              onCancel={openCancelModal}
            />
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <CancelModal />
    </div>
  );
};

export default BookingDetailsPage;
