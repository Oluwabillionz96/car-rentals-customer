import { Car } from "@/constants/cars";
import { CheckCircle2 } from "lucide-react";
import { ActionButtons, BookingShortSummary, SupportTooltip } from "./util-components";

export default function ConfirmationMobileView({
  car,
  onBackHome,
  days,
  customerName,
  pickupDate,
  dropoffDate,
  bookingId,
}: {
  car: Car;
  onBackHome: () => void;
  days: number;
  customerName: string;
  pickupDate: string;
  dropoffDate: string;
  bookingId: string;
}) {
  return (
    <div className="md:hidden flex flex-col items-center pt-4">
      <div className="w-full rounded-lg py-4 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-[#e6fcf5] rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 size={36} className="text-[#38d9a9]" />
        </div>

        <h1 className="text-2xl font-extrabold text-[#111827] mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-slate-500 text-[13px] leading-relaxed mb-6 px-2">
          We&apos;ve reserved your ride. Please check your email for the full
          rental agreement and pickup instructions.
        </p>

        <div className="w-full bg-white rounded-xl border border-border-100 p-4 text-left">
          <BookingShortSummary
            car={car}
            days={days}
            customerName={customerName}
            pickupDate={pickupDate}
            dropoffDate={dropoffDate}
            bookingId={bookingId}
          />
        </div>

        <div className="w-full flex flex-col gap-3 mt-6">
          <ActionButtons onBackHome={onBackHome} mobile />
        </div>
      </div>

      <div className="mt-4 w-full">
        <SupportTooltip mobile />
      </div>
    </div>
  );
}