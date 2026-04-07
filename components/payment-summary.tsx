import { BookingDetails } from "@/lib/types";
import { calculateDays } from "@/lib/utils";
import { CreditCard, Shield, Sparkles, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const PaymentSummary = ({
  booking,
  totalPrice,
  onPay,
}: {
  booking: BookingDetails;
  totalPrice: number;
  onPay: () => void;
}) => {
  const timeQuery = booking.service.pricing === "hourly" ? "hour" : "day";

  const unitRate = booking.selectedCars.reduce(
    (acc, car) =>
      acc + car[timeQuery === "hour" ? "pricePerHour" : "pricePerDay"],
    0,
  );

  const duration =
    booking.schedule?.type === "hourly"
      ? booking.schedule.hours
      : calculateDays(
          booking.schedule?.type === "daily"
            ? booking.schedule.pickupDate
            : "",
          booking.schedule?.type === "daily"
            ? booking.schedule.dropoffDate
            : "",
        );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4 }}
      className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
    >
      <div className="p-6 md:p-8 border-b border-slate-50">
        <h2 className="text-base font-black text-text-100 uppercase italic tracking-tighter flex items-center gap-2">
          <CreditCard size={18} className="text-primary" />
          Order Summary
        </h2>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Line items */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-300 font-medium">
              Vehicles ({booking.selectedCars.length})
            </span>
            <span className="text-text-100 font-bold">
              ₦{unitRate.toLocaleString()} / {timeQuery}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-300 font-medium">
              Duration
            </span>
            <span className="text-text-100 font-bold">
              {duration} {timeQuery === "hour" ? "hrs" : "days"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-300 font-medium">Service Charge</span>
            <span className="text-text-100 font-bold">₦0</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Total */}
        <div className="flex justify-between items-end">
          <p className="text-text-300 text-sm font-medium">Total Payable</p>
          <p className="text-3xl font-black text-primary">
            ₦{totalPrice.toLocaleString()}
          </p>
        </div>

        {/* Paystack Button */}
        <button
          onClick={onPay}
          className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 text-base uppercase tracking-tight italic group active:scale-95"
        >
          <Wallet size={20} />
          Pay with Paystack
        
        </button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="flex items-center gap-1.5 text-[10px] text-text-400 font-bold uppercase tracking-wider">
            <Shield size={12} className="text-green-500" />
            SSL Secured
          </div>
          <span className="text-slate-200">•</span>
          <div className="flex items-center gap-1.5 text-[10px] text-text-400 font-bold uppercase tracking-wider">
            <Sparkles size={12} className="text-primary" />
            Instant Confirmation
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSummary;