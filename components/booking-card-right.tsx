"use client";

import { BookingDetails, BookingSchedule } from "@/lib/types";
import { BookingFormValues, bookingSchema } from "@/lib/validations";
import useBookingStore from "@/store/booking-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { calculatePrice } from "@/lib/utils";

// Optimized Sub-components
import CheckoutCustomerForm from "./checkout-customer-form";
import CheckoutScheduleView from "./checkout-schedule-view";
import CheckoutOrderSummary from "./checkout-order-summary";

const BookingCardRight = ({ booking }: { booking: BookingDetails }) => {
  const [step, setStep] = useState(1);
  const { updateBooking } = useBookingStore();
  const existingSchedule = booking?.schedule;
  const isConfirmed = booking.status !== "draft";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customer: {
        firstName: booking.customer?.firstName || "",
        lastName: booking.customer?.lastName || "",
        email: booking.customer?.email || "",
        phone: booking.customer?.phone || "",
      },
      schedule:
        booking?.service.pricing === "hourly"
          ? {
              type: "hourly",
              date: existingSchedule?.type === "hourly" ? existingSchedule.date : "",
              startTime: existingSchedule?.type === "hourly" ? existingSchedule.startTime : "",
              hours: (existingSchedule?.type === "hourly" ? existingSchedule.hours : booking.service.minHours) || 1,
              pickupAddress: existingSchedule?.type === "hourly" ? existingSchedule.pickupAddress : "",
            }
          : {
              type: "daily",
              pickupDate: existingSchedule?.type === "daily" ? existingSchedule.pickupDate : "",
              dropoffDate: existingSchedule?.type === "daily" ? existingSchedule.dropoffDate : "",
            },
    },
  });

  const router = useRouter();

  const onSubmit = (data: BookingFormValues) => {
    if (booking.status !== "draft") {
      router.push(`/booking/${booking.bookingId}/payment`);
      return;
    }
    updateBooking({
      bookingId: booking.bookingId,
      customer: data.customer,
      schedule: data.schedule as BookingSchedule,
      status: "confirmed",
    });
    router.push(`/booking/${booking.bookingId}/payment`);
  };

  const totalPrice = calculatePrice(booking);

  return (
    <>
      <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Step Indicators */}
        <div className="flex border-b border-slate-100">
          <div
            className={`flex-1 py-6 text-center font-bold text-sm transition-colors relative ${step === 1 ? "text-primary" : "text-text-400"}`}
          >
            1. Customer Details
            {step === 1 && (
              <motion.div
                layoutId="step-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
              />
            )}
          </div>
          <div
            className={`flex-1 py-6 text-center font-bold text-sm transition-colors relative ${step === 2 ? "text-primary" : "text-text-400"}`}
          >
            2. Schedule & Preferences
            {step === 2 && (
              <motion.div
                layoutId="step-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
              />
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          id="booking-form"
          className="p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CheckoutCustomerForm
                  register={register}
                  errors={errors}
                  isConfirmed={isConfirmed}
                  serviceId={booking.service.id}
                  watch={watch}
                  onNext={() => setStep(2)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CheckoutScheduleView
                  register={register}
                  errors={errors}
                  isConfirmed={isConfirmed}
                  minHours={booking.service.minHours}
                  watch={watch}
                  setValue={setValue}
                  onBack={() => setStep(1)}
                  isDraft={booking.status === "draft"}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      <CheckoutOrderSummary booking={booking} totalPrice={totalPrice} />
    </>
  );
};

export default BookingCardRight;
