"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Car } from "lucide-react";

import useBookingStore from "@/store/booking-store";
import { calculatePrice } from "@/lib/utils";
import PaymentWarningModal from "@/components/payment-warning-modal";
import { VehicleCard } from "@/components/car-card";
import CustomerInfo from "@/components/customer-info";
import ScheduleInfo from "@/components/schedule-info";
import PaymentSummary from "@/components/payment-summary";

// ─── Main Payment Page ───────────────────────────────────────────────────────
const PaymentPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { bookings, updateBooking } = useBookingStore();
  const [showWarning, setShowWarning] = useState(false);

  const booking = bookings.find((b) => b.bookingId === id);

  useEffect(() => {
    if (!booking?.customer || !booking?.schedule) {
      router.push(`/booking/${booking?.bookingId}`);
    }
  }, [booking, router]);

  if (!booking?.customer || !booking?.schedule) return null;

  const totalPrice = calculatePrice(booking);

  const handlePayClick = () => {
    setShowWarning(true);
  };

  const handleConfirmPayment = () => {
    setShowWarning(false);
    // Update booking status to confirmed
    updateBooking({
      bookingId: booking.bookingId,
      status: "confirmed",
    });
    router.push(`/booking-details/${booking.bookingId}`);
  };

  return (
    <div>
      {/* Header */}
      <header className="mb-10">
        <button
          onClick={() => router.push(`/booking/${booking.bookingId}`)}
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
          <h1 className="text-3xl md:text-5xl font-black text-text-100 tracking-tight">
            Review & <span className="text-primary text-nowrap">Payment</span>
          </h1>
          <p className="text-text-200 mt-2">
            Confirm your booking details and complete payment below
          </p>
        </motion.div>
      </header>

      {/* Two-Column Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cars (their own lane) */}
        <div className="lg:col-span-7 w-full order-2 lg:order-1">
          <div className="flex items-center gap-2 mb-4 px-1">
            <Car size={18} className="text-primary" />
            <h3 className="text-lg font-black text-text-100 uppercase italic tracking-tighter">
              Selected Vehicles ({booking.selectedCars.reduce((sum, sc) => sum + sc.quantity, 0)})
            </h3>
          </div>
          <div className="space-y-4">
            {booking.selectedCars.map((selectedCar, index) => (
              <VehicleCard
                key={selectedCar.carId + index}
                car={selectedCar}
                index={index}
                booking={booking}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary (sticky) + Customer + Schedule */}
        <div className="lg:col-span-5 w-full space-y-8 order-1 lg:order-2">
          <div className="space-y-8">
            <PaymentSummary
              booking={booking}
              totalPrice={totalPrice}
              onPay={handlePayClick}
              bookingId={booking.bookingId}
            />

            {/* Customer Info */}
            <CustomerInfo booking={booking} />

            {/* Schedule Info */}
            <ScheduleInfo booking={booking} />
          </div>
        </div>
      </div>

      {/* Payment Warning Modal */}
      <PaymentWarningModal
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
};

export default PaymentPage;
