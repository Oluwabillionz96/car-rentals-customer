import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "./date-picker";
import { ArrowLeft } from "lucide-react";
import { Car } from "@/constants/cars";
import { calculateDays } from "@/app/(public)/cars/[id]/booking/page";

const DateSelection = ({
  car,
  pickupDate,
  dropoffDate,
  setPickupDate,
  setDropoffDate,
}: {
  car?: Car;
  pickupDate: Date | null;
  dropoffDate: Date | null;
  setPickupDate: Dispatch<SetStateAction<Date | null>>;
  setDropoffDate: Dispatch<SetStateAction<Date | null>>;
}) => {
  const totalDays = calculateDays(pickupDate, dropoffDate);
  const totalPrice = totalDays * (car?.price ?? 0);
  return (
    <section className="space-y-4 lg:bg-white lg:border border-primary/10 lg:rounded-xl lg:p-8">
      <header className="flex justify-between lg:gap-3 lg:justify-start items-center">
        <h3 className="text-lg font-bold text-text-100 lg:hidden">
          Rental Dates
        </h3>
        {pickupDate && dropoffDate && (
          <p className="bg-primary lg:hidden rounded-full text-white py-1 px-3 w-fit text-xs font-semibold">
            {totalDays} {totalDays === 1 ? "Day" : "Days"} Selected
          </p>
        )}
        <span className="text-sm text-white hidden lg:block font-bold px-3 py-1.5 bg-primary rounded-full">
          1
        </span>
        <p className="text-xl font-bold hidden lg:block text-text-100">
          Select Dates
        </p>
      </header>

      {pickupDate && (
        <button
          onClick={() => {
            setPickupDate(null);
            setDropoffDate(null);
          }}
          className="lg:hidden flex items-center gap-2 text-primary font-bold text-sm"
        >
          <ArrowLeft size={16} />
          Change Pickup Date
        </button>
      )}

      <div className="flex gap-8 flex-col lg:flex-row">
        <DatePicker
          label="Pickup Date"
          selectedDate={pickupDate}
          onDateSelect={setPickupDate}
          startDate={pickupDate}
          endDate={dropoffDate}
          className={`${pickupDate ? "hidden" : "flex"} lg:flex`}
        />
        <DatePicker
          label="Drop-off Date"
          selectedDate={dropoffDate}
          onDateSelect={setDropoffDate}
          startDate={pickupDate}
          endDate={dropoffDate}
          className={`${!pickupDate ? "hidden" : "flex"} lg:flex`}
        />
      </div>

      {!dropoffDate && (
        <div className="flex justify-center pt-2">
          <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 w-fit">
            <p className="text-[10px] leading-tight text-primary font-bold text-center">
              Maximum rental duration is 30 days from pickup.
            </p>
          </div>
        </div>
      )}

      {pickupDate && dropoffDate && (
        <div className="space-y-1 p-4 bg-primary/5 border border-primary/10 rounded-xl">
          <div className="flex justify-between">
            <p className="text-sm text-text-300">
              {totalDays} {totalDays === 1 ? "Day" : "Days"} x ₦
              {car?.price.toLocaleString()}
            </p>
            <p className="font-medium text-text-100">
              ₦ {totalPrice.toLocaleString()}{" "}
            </p>
          </div>
          <div className="flex justify-between border-t border-border-100 ">
            <p className="font-bold text-text-100">Total Price</p>
            <p className="font-bold text-xl text-primary">
              ₦ {totalPrice.toLocaleString()}{" "}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DateSelection;
