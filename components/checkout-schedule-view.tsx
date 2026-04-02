"use client";

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { BookingFormValues } from "@/lib/validations";
import { Calendar, Clock, MapPin, Minus, Plus, ArrowRight, AlertCircle, ChevronLeft,  CheckCircle2 } from "lucide-react";
import Input from "./input";
import Button from "./button";

import { HourlyBookingSchedule, DailyBookingSchedule } from "@/lib/types";

interface CheckoutScheduleViewProps {
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
  isConfirmed: boolean;
  minHours?: number;
  watch: UseFormWatch<BookingFormValues>;
  setValue: UseFormSetValue<BookingFormValues>;
  onBack: () => void;
  onSave: () => void;
  hasConflicts?: boolean;
}

export default function CheckoutScheduleView({
  register,
  errors,
  isConfirmed,
  minHours = 1,
  watch,
  setValue,
  onBack,
  onSave,
  hasConflicts,
}: CheckoutScheduleViewProps) {
  // ... rest of the logic ...
  const scheduleType = watch("schedule.type");
  const startTime = watch("schedule.startTime");
  const hours = (watch("schedule.hours") as number) || 1;

  // Type-safe error narrowing
  const hourlyErrors = errors.schedule as FieldErrors<HourlyBookingSchedule>;
  const dailyErrors = errors.schedule as FieldErrors<DailyBookingSchedule>;

  const calculateEndTime = (start: string, duration: number) => {
    if (!start) return null;
    const [h, m] = start.split(":").map(Number);
    const date = new Date();
    date.setHours(h + duration, m);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const endTime = calculateEndTime(startTime || "", hours);

  return (
    <div className="space-y-6">
      {scheduleType === "hourly" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="date"
              type="date"
              icon={Calendar}
              placeholder="Pickup Date"
              registration={register("schedule.date")}
              error={hourlyErrors?.date?.message}
              disabled={isConfirmed}
            />
            <Input
              id="startTime"
              type="time"
              icon={Clock}
              placeholder="Start Time"
              registration={register("schedule.startTime")}
              error={hourlyErrors?.startTime?.message}
              disabled={isConfirmed}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-text-400 uppercase tracking-widest ml-1">
              For how long? (Minimum {minHours} hours)
            </label>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 w-full h-16 flex items-center justify-between px-6 rounded-2xl border-2 border-slate-100 bg-slate-50/30">
                <button
                  type="button"
                  disabled={isConfirmed}
                  onClick={() =>
                    setValue("schedule.hours", Math.max(minHours, hours - 1))
                  }
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-text-100 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={20} />
                </button>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-text-100 uppercase">
                    {hours}
                  </span>
                  <span className="text-[10px] font-bold text-text-400 uppercase tracking-widest">
                    {hours === 1 ? "Hour" : "Hours"}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={isConfirmed}
                  onClick={() => setValue("schedule.hours", hours + 1)}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-text-100 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={20} />
                </button>
              </div>

              {startTime && (
                <div className="hidden md:flex items-center gap-3 text-text-300">
                  <ArrowRight />
                </div>
              )}

              {startTime && (
                <div className="flex-1 w-full h-16 flex flex-col items-center justify-center px-6 rounded-2xl border-2 border-primary/10 bg-primary/5">
                  <span className="text-sm font-bold text-primary flex items-center gap-1">
                    <Clock size={14} /> Ends at
                  </span>
                  <span className="text-xl font-black text-primary">
                    {endTime}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Input
            id="pickupAddress"
            icon={MapPin}
            placeholder="Pickup Address"
            registration={register("schedule.pickupAddress")}
            error={hourlyErrors?.pickupAddress?.message}
            disabled={isConfirmed}
          />
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-400 uppercase tracking-widest ml-1">
              Destination Notes (Optional)
            </label>
            <textarea
              {...register("schedule.destinationNote")}
              disabled={isConfirmed}
              className="w-full min-h-[100px] p-4 rounded-2xl border border-border-100 outline-none focus:border-primary transition-colors text-text-100 placeholder:text-text-400 disabled:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Where are you heading? Any specific stops?"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="pickupDate"
              type="date"
              icon={Calendar}
              placeholder="Pickup Date"
              registration={register("schedule.pickupDate")}
              error={dailyErrors?.pickupDate?.message}
              disabled={isConfirmed}
            />
            <Input
              id="dropoffDate"
              type="date"
              icon={Calendar}
              placeholder="Drop-off Date"
              registration={register("schedule.dropoffDate")}
              error={dailyErrors?.dropoffDate?.message}
              disabled={isConfirmed}
            />
          </div>
          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex gap-3 text-primary">
            <AlertCircle size={20} className="shrink-0" />
            <p className="text-xs font-medium leading-relaxed">
              Daily rentals are calculated per calendar day. Ensure pickup and
              drop-off are within our business hours.
            </p>
          </div>
        </div>
      )}

      {hasConflicts && !isConfirmed && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 text-red-600 animate-in fade-in slide-in-from-bottom-2">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-xs font-bold uppercase italic tracking-tight">
            Vehicle conflict detected for this slot. Please choose another time.
          </p>
        </div>
      )}

      <div className="pt-6 flex flex-col-reverse md:flex-row gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-2 border-slate-100 flex items-center justify-center gap-2 rounded-xl font-bold py-4 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={20} />
          Cancel Tweak
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={hasConflicts}
          className="flex-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 uppercase text-sm md:text-base group active:scale-95"
        >
          Confirm Modification
          <CheckCircle2 size={20} />
        </button>
      </div>
    </div>
  );
}
