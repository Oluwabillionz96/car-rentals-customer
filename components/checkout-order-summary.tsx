"use client";

import { CreditCard } from "lucide-react";
import { BookingDetails } from "@/lib/types";
import { calculateDays, calculatePrice } from "@/lib/utils";
import { Control, useWatch } from "react-hook-form";
import { BookingFormValues } from "@/lib/validations";

interface CheckoutOrderSummaryProps {
  booking: BookingDetails | null;
  control: Control<BookingFormValues>;
}

export default function CheckoutOrderSummary({
  booking,
  control,
}: CheckoutOrderSummaryProps) {
  const timeQuery = booking?.service.pricing === "hourly" ? "hour" : "days";
  const totalPrice = booking && calculatePrice(booking);
  const pickupDate = useWatch({ control, name: "schedule.pickupDate" });
  const dropoffDate = useWatch({ control, name: "schedule.dropoffDate" });
  const hours = useWatch({ control, name: "schedule.hours" });
  return (
    <div className="bg-primary/5 rounded-3xl p-6 my-2 border border-primary/10 space-y-4">
      <h3 className="font-bold text-primary flex items-center gap-2">
        <CreditCard size={18} />
        Order Summary
      </h3>

      {totalPrice && totalPrice > 0 && (
        <div className="space-y-3 py-4 border-y border-primary/10">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-text-300">Total Unit Rate</span>
            <span className="text-text-100 font-bold">
              ₦{" "}
              {booking?.selectedCars
                .reduce(
                  (acc, car) =>
                    acc +
                    car[timeQuery === "hour" ? "pricePerHour" : "pricePerDay"],
                  0,
                )
                .toLocaleString()}{" "}
              / {timeQuery}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-text-300">Duration ({timeQuery})</span>
            <span className="text-text-100 font-bold">
              {booking?.schedule?.type === "hourly"
                ? hours
                : calculateDays(pickupDate, dropoffDate)}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <p className="text-text-300 text-sm font-medium">Total Payable</p>
        <div className="text-right">
          <p className="text-3xl font-black text-primary">
            ₦{totalPrice ? totalPrice.toLocaleString() : "..."}
          </p>
          {!totalPrice && (
            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mt-1">
              Pending Selection
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
