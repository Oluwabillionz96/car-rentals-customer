"use client";

import { CreditCard, Car } from "lucide-react";
import { BookingDetails } from "@/lib/types";
import { calculateDays, calculatePrice, getUnitRate } from "@/lib/utils";
import { Control, useWatch } from "react-hook-form";
import { BookingFormValues } from "@/lib/validations";
import { getCar } from "@/constants/cars";

interface CheckoutOrderSummaryProps {
  booking: BookingDetails | null;
  control: Control<BookingFormValues>;
}

export default function CheckoutOrderSummary({
  booking,
  control,
}: CheckoutOrderSummaryProps) {
  const timeQuery = booking?.service.pricing === "hourly" ? "hour" : "days";
  const formSchedule = useWatch({ control, name: "schedule" });
  const totalPrice = booking && calculatePrice(booking, formSchedule);

  return (
    <div className="bg-primary/5 rounded-3xl p-6 my-2 border border-primary/10 space-y-4">
      <h3 className="font-bold text-primary flex items-center gap-2">
        <CreditCard size={18} />
        Order Summary
      </h3>

      {totalPrice && totalPrice > 0 && (
        <div className="space-y-3 py-4 border-y border-primary/10">
          {/* Vehicle List */}
          <div className="space-y-2 pb-2">
            <p className="text-[10px] font-bold text-text-400 uppercase tracking-widest flex items-center gap-1">
              <Car size={10} /> Selected Vehicles
            </p>
            <div className="space-y-1.5 text-text-200">
              {booking?.selectedCars.map((sc) => {
                const car = getCar(sc.carId);
                return (
                  <div key={sc.carId} className="flex justify-between items-center text-[13px]">
                    <span className="font-bold italic">
                      {sc.quantity}x {car?.name}
                    </span>
                    <span className="font-medium">
                      ₦{((timeQuery === "hour" ? car?.pricePerHour : car?.pricePerDay) || 0).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm font-medium pt-2 border-t border-primary/5">
            <span className="text-text-300">Total Unit Rate</span>
            <span className="text-text-100 font-bold">
              ₦{" "}
              {getUnitRate(booking!, timeQuery)
                .toLocaleString()}{" "}
              / {timeQuery}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-text-300">Duration ({timeQuery})</span>
            <span className="text-text-100 font-bold">
              {formSchedule?.type === "hourly"
                ? formSchedule.hours || 0
                : calculateDays(
                    formSchedule?.type === "daily"
                      ? formSchedule.pickupDate
                      : null,
                    formSchedule?.type === "daily"
                      ? formSchedule.dropoffDate
                      : null,
                  ) || 0}
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
