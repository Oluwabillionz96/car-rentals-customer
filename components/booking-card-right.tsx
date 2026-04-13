"use client";

import { BookingDetails, BookingSchedule } from "@/lib/types";
import { BookingFormValues} from "@/lib/validations";
import useBookingStore from "@/store/booking-store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { isCarAvailable} from "@/lib/utils";
import { AlertCircle, ArrowRight } from "lucide-react";

// Optimized Sub-components
import CheckoutCustomerForm from "./checkout-customer-form";
import CheckoutScheduleView from "./checkout-schedule-view";
import CheckoutOrderSummary from "./checkout-order-summary";
import CheckoutScheduleSummary from "./checkout-schedule-summary";
import { getCar } from "@/constants/cars";
import useGlobalStore from "@/store/global-store";

const BookingCardRight = ({ booking }: { booking: BookingDetails | null }) => {
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const { updateBooking, bookings } = useBookingStore();
  const isLocked = booking?.status !== "draft" && booking?.status !== null;
  const { handleSubmit, watch, setValue, control } =
    useFormContext<BookingFormValues>();

  const [originalSchedule, setOriginalSchedule] =
    useState<BookingSchedule | null>(watch("schedule"));

  const router = useRouter();

  // Availability Check Logic
  const currentSchedule = watch("schedule") as BookingSchedule;
  const carsWithConflicts = booking?.selectedCars.filter((selectedCar) => {
    const car = getCar(selectedCar.carId);
    return (
      car &&
      !isCarAvailable(car, bookings, currentSchedule, selectedCar.quantity)
    );
  });
  const hasConflicts = carsWithConflicts && carsWithConflicts.length > 0;
  const { clearAll } = useGlobalStore();

  const onSubmit = (data: BookingFormValues) => {
    if (booking?.status !== null && booking?.status !== "draft") {
      router.push(`/booking-details/${booking?.bookingId}`);
      return;
    }
    updateBooking({
      bookingId: booking?.bookingId,
      customer: data.customer,
      schedule: data.schedule as BookingSchedule,
      status: "draft",
    });
    clearAll();
    router.push(`/booking/${booking.bookingId}/payment`);
  };

  const schedule = useWatch({ control, name: "schedule" });

  return (
    <>
      <div className="lg:col-span-7 bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Header */}
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
                {schedule && (
                  <CheckoutScheduleSummary
                    schedule={schedule}
                    onEdit={() => {
                      setOriginalSchedule(schedule);
                      setIsEditingSchedule(true);
                    }}
                    isDraft={!isLocked}
                  />
                )}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  id="booking-form"
                  className="space-y-8"
                >
                  <CheckoutCustomerForm
                    isConfirmed={isLocked}
                    serviceId={booking?.service.id}
                  />

                  {hasConflicts && !isLocked && (
                    <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex gap-4 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <AlertCircle
                        className="text-red-500 shrink-0"
                        size={24}
                      />
                      <div>
                        <h4 className="text-sm font-black text-red-600 uppercase italic tracking-tight mb-1">
                          Scheduling Conflict Detected
                        </h4>
                        <p className="text-xs text-red-500 font-medium leading-relaxed italic">
                          Some of your selected vehicles (
                          {carsWithConflicts
                            .map((c) => getCar(c.carId)?.name)
                            .join(", ")}
                          ) are already reserved for this period. Please
                          re-adjust your schedule or select different vehicles.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-50">
                    <button
                      type="submit"
                      disabled={
                        !watch("customer.firstName") ||
                        !watch("customer.lastName") ||
                        !watch("customer.email") ||
                        !watch("customer.phone") ||
                        (hasConflicts && !isLocked)
                      }
                      form="booking-form"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 text-base md:text-lg uppercase group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed tracking-tight italic"
                    >
                      Confirm Booking
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
                  isConfirmed={isLocked}
                  minHours={booking?.service.minHours}
                  onBack={() => {
                    if (originalSchedule) {
                      setValue("schedule", originalSchedule);
                    }
                    setIsEditingSchedule(false);
                  }}
                  onSave={() => setIsEditingSchedule(false)}
                  hasConflicts={hasConflicts}
                  originalSchedule={originalSchedule}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CheckoutOrderSummary booking={booking} />
    </>
  );
};

export default BookingCardRight;
