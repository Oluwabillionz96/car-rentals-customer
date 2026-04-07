"use client";

import { Calendar, Clock, MapPin, Edit2 } from "lucide-react";
import { BookingSchedule } from "@/lib/types";

interface CheckoutScheduleSummaryProps {
  schedule: BookingSchedule;
  onEdit: () => void;
  isDraft: boolean;
}

export default function CheckoutScheduleSummary({
  schedule,
  onEdit,
  isDraft,
}: CheckoutScheduleSummaryProps) {
  const isDaily = schedule.type === "daily";

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-8 group relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 italic">
            Confirmed Schedule
          </h4>
          <p className="text-sm text-text-300 font-medium italic">
            We've locked in your requested time.
          </p>
        </div>
        {isDraft && (
          <button
            type="button"
            onClick={onEdit}
            className="bg-white hover:bg-primary hover:text-white p-2.5 rounded-xl shadow-sm border border-slate-100 transition-all active:scale-95 group/btn"
          >
            <div className="flex items-center gap-2 px-1">
              <Edit2
                size={14}
                className="group-hover/btn:rotate-12 transition-transform"
              />
              <span className="text-xs font-bold uppercase tracking-tight">
                Modify
              </span>
            </div>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Calendar size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-1">
              {isDaily ? "Rental Period" : "Pickup Date"}
            </p>
            <p className="text-sm font-black text-text-100 italic uppercase">
              {isDaily ? (
                <div className="flex items-center gap-2">
                  <span>
                    {new Date(schedule.pickupDate).toLocaleDateString()}
                  </span>
                  -
                  <span>
                    {new Date(schedule.dropoffDate).toLocaleDateString()}
                  </span>
                </div>
              ) : (
                new Date(schedule.date).toLocaleDateString()
              )}
            </p>
          </div>
        </div>

        {!isDaily && (
          <>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Clock size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-1">
                  Time & Hours
                </p>
                <p className="text-sm font-black text-text-100 italic uppercase">
                  {schedule.startTime} • {schedule.hours} HRS
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <MapPin size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-1">
                  Location
                </p>
                <p className="text-sm font-black text-text-100 italic uppercase truncate max-w-[120px]">
                  {schedule.pickupAddress}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl" />
    </div>
  );
}
