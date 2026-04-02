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
import { ArrowRight } from "lucide-react";

// Optimized Sub-components
import CheckoutCustomerForm from "./checkout-customer-form";
import CheckoutScheduleView from "./checkout-schedule-view";
import CheckoutOrderSummary from "./checkout-order-summary";
import CheckoutScheduleSummary from "./checkout-schedule-summary";

const BookingCardRight = ({ booking }: { booking: BookingDetails }) => {
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
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
              date:
                existingSchedule?.type === "hourly"
                  ? existingSchedule.date
                  : "",
              startTime:
                existingSchedule?.type === "hourly"
                  ? existingSchedule.startTime
                  : "",
              hours:
                (existingSchedule?.type === "hourly"
                  ? existingSchedule.hours
                  : booking.service.minHours) || 1,
              pickupAddress:
                existingSchedule?.type === "hourly"
                  ? existingSchedule.pickupAddress
                  : "",
            }
          : {
              type: "daily",
              pickupDate:
                existingSchedule?.type === "daily"
                  ? existingSchedule.pickupDate
                  : "",
              dropoffDate:
                existingSchedule?.type === "daily"
                  ? existingSchedule.dropoffDate
                  : "",
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
      <div className="lg:col-span-7 bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Modal-like logic without forcing steps */}
        <div className="p-8 md:p-10 border-b border-slate-50 bg-slate-50/10">
          <h2 className="text-xl font-black text-text-100 uppercase italic tracking-tighter">
            Finalize Your Reservation
          </h2>
          <p className="text-sm text-text-300 font-medium italic">
            Please provide your details below. You can still modify your
            schedule if needed.
          </p>
        </div>

        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            {!isEditingSchedule ? (
              <motion.div
                key="customer-details"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                {/* Non-intrusive Schedule Summary */}
                {watch("schedule") && (
                  <CheckoutScheduleSummary
                    schedule={watch("schedule") as any}
                    onEdit={() => setIsEditingSchedule(true)}
                    isDraft={booking.status === "draft"}
                  />
                )}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  id="booking-form"
                  className="space-y-8"
                >
                  <CheckoutCustomerForm
                    register={register}
                    errors={errors}
                    isConfirmed={isConfirmed}
                    serviceId={booking.service.id}
                    watch={watch}
                  />

                  <div className="pt-4 border-t border-slate-50">
                    <button
                      type="submit"
                      disabled={
                        !watch("customer.firstName") ||
                        !watch("customer.lastName") ||
                        !watch("customer.email") ||
                        !watch("customer.phone")
                      }
                      className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 text-base md:text-lg uppercase group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed tracking-tight italic"
                    >
                      {booking.status === "draft"
                        ? "Continue to Payment"
                        : "Payment Details"}
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="schedule-edit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 mb-2">
                  <h3 className="text-sm font-black text-primary uppercase italic tracking-widest">
                    Modify Chosen Schedule
                  </h3>
                </div>

                <CheckoutScheduleView
                  register={register}
                  errors={errors}
                  isConfirmed={isConfirmed}
                  minHours={booking.service.minHours}
                  watch={watch}
                  setValue={setValue}
                  onBack={() => setIsEditingSchedule(false)}
                  onSave={() => setIsEditingSchedule(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CheckoutOrderSummary booking={booking} totalPrice={totalPrice} />
    </>
  );
};

export default BookingCardRight;
