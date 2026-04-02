"use client";

import { Calendar, Clock, MapPin, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import { BookingSchedule } from "@/lib/types";

interface BookingSummaryCardProps {
  formValues: BookingSchedule;
  onEdit: () => void;
  isSelect?: boolean;
  isCarBusy?: boolean;
  carName?: string;
}

export default function BookingSummaryCard({
  formValues,
  onEdit,
  isSelect,
  isCarBusy,
  carName,
}: BookingSummaryCardProps) {
  const isDaily = formValues.type === "daily";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto space-y-6"
    >
      <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 space-y-8">
        <div className="flex justify-between items-start">
          <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Booking Summary
          </h4>
          <button
            onClick={onEdit}
            className="text-primary flex items-center gap-2 text-xs font-bold hover:underline transition-all"
          >
            <Edit2 size={14} /> Edit Details
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                Rental Period
              </p>
              <p className="text-base font-black text-text-100 italic uppercase">
                {isDaily
                  ? `${new Date(formValues.pickupDate).toLocaleDateString()} - ${new Date(formValues.dropoffDate).toLocaleDateString()}`
                  : new Date(formValues.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {!isDaily && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                    Time & Duration
                  </p>
                  <p className="text-base font-black text-text-100 italic uppercase">
                    {formValues.startTime} • {formValues.hours} hrs
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                    Pickup At
                  </p>
                  <p className="text-base font-black text-text-100 italic uppercase truncate max-w-[150px]">
                    {formValues.pickupAddress}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Availability Status Card */}
      <div
        className={`p-6 rounded-[30px] border transition-all ${isCarBusy ? "bg-red-50 border-red-100" : "bg-primary/5 border-primary/10 shadow-sm"}`}
      >
        <p
          className={`text-sm md:text-base font-bold text-center leading-relaxed ${isCarBusy ? "text-red-600" : "text-text-200 uppercase tracking-tight italic"}`}
        >
          {isSelect
            ? isCarBusy
              ? `Oops! This ${carName} is already reserved for this slot. Please try another schedule or car.`
              : `Great! This ${carName} is available. Click below to finalize your booking.`
            : "One last step: Click below to browse cars available for this schedule."}
        </p>
      </div>
    </motion.div>
  );
}
