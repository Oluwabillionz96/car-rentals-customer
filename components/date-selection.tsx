import { useState } from "react";
import DatePicker from "./date-picker";
import { ArrowLeft } from "lucide-react";
import { Car } from "@/constants/cars";

const DateSelection = ({ car }: { car?: Car }) => {
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const calculateDays = (start: Date | null, end: Date | null) => {
    if (!start || !end) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };
  const totalDays = calculateDays(pickupDate, dropoffDate);
  const totalPrice = totalDays * (car?.price ?? 0);
  return (
    <section className="space-y-4">
      <header className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-text-100">Rental Dates</h3>
        {pickupDate && dropoffDate && (
          <p className="bg-primary rounded-full text-white py-1 px-3 w-fit text-xs font-semibold">
            {totalDays} {totalDays === 1 ? "Day" : "Days"} Selected
          </p>
        )}
      </header>

      {pickupDate && (
        <button
          onClick={() => {
            setPickupDate(null);
            setDropoffDate(null);
          }}
          className="md:hidden flex items-center gap-2 text-primary font-bold text-sm"
        >
          <ArrowLeft size={16} />
          Change Pickup Date
        </button>
      )}

      <div className="flex gap-8 flex-col md:flex-row">
        <DatePicker
          label="Pickup Date"
          selectedDate={pickupDate}
          onDateSelect={setPickupDate}
          startDate={pickupDate}
          endDate={dropoffDate}
          className={`${pickupDate ? "hidden" : "flex"} md:flex`}
        />
        <DatePicker
          label="Drop-off Date"
          selectedDate={dropoffDate}
          onDateSelect={setDropoffDate}
          startDate={pickupDate}
          endDate={dropoffDate}
          className={`${!pickupDate ? "hidden" : "flex"} md:flex`}
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
