"use client";

import { Calendar, Clock, MapPin, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import { BookingSchedule } from "@/lib/types";

interface BookingSummaryCardProps {
  formValues: BookingSchedule;
  onEdit: () => void;
}

export default function BookingSummaryCard({
  formValues,
  onEdit,
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

      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-center">
        <p className="text-xs text-text-300 font-medium">
          One last step: Click below to browse cars available for this schedule.
        </p>
      </div>
    </motion.div>
  );
}
