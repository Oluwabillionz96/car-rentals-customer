"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import Input from "./input";
import DatePicker from "./date-picker";
import { HourlyBookingSchedule } from "@/lib/types";

interface HourlyScheduleFormProps {
  control: Control<HourlyBookingSchedule>;
  errors: FieldErrors<HourlyBookingSchedule>;
  minHours?: number;
}

export default function HourlyScheduleForm({
  control,
  errors,
  minHours,
}: HourlyScheduleFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-8">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Pickup Date"
              selectedDate={field.value ? new Date(field.value) : null}
              onDateSelect={(d) => field.onChange(d?.toISOString() || "")}
              className="max-w-none"
            />
          )}
        />
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-text-300 text-[10px] font-black uppercase tracking-widest px-1">
              Start Time
            </label>
            <div
              className={`relative flex items-center h-14 bg-white border ${errors.startTime ? "border-red-500" : "border-border-100"} rounded-xl px-4 gap-2 transition-all hover:border-primary group`}
            >
              <Clock className="text-text-400 group-hover:text-primary transition-colors h-5 w-5 shrink-0" />
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full h-full bg-transparent outline-none text-sm font-bold text-text-100 cursor-pointer appearance-none pr-4"
                  >
                    <option value="" disabled>
                      Select Time
                    </option>
                    {Array.from({ length: 15 }).map((_, hour) =>
                      ["00", "30"].map((minute) => {
                        const time = `${(hour + 7)
                          .toString()
                          .padStart(2, "0")}:${minute}`;
                        return (
                          <option key={time} value={time}>
                            {time} {hour + 7 >= 12 ? "PM" : "AM"}
                          </option>
                        );
                      }),
                    )}
                  </select>
                )}
              />
            </div>
            {errors.startTime && (
              <p className="text-[10px] text-red-500 font-medium px-1">
                {errors.startTime.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-text-300 text-[10px] font-black uppercase tracking-widest px-1">
              Hours
            </label>
            <Controller
              name="hours"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  icon={Calendar}
                  type="number"
                  placeholder="Duration"
                  id="hours"
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  error={errors.hours?.message}
                  showIconDesktop
                  className="h-14"
                />
              )}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-text-300 text-[10px] font-black uppercase tracking-widest px-1">
            Pickup Address
          </label>
          <Controller
            name="pickupAddress"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                icon={MapPin}
                placeholder="e.g., Victoria Island, Lagos"
                id="pickupAddress"
                error={errors.pickupAddress?.message}
                showIconDesktop
                className="h-14"
              />
            )}
          />
        </div>
        {minHours && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
            <Clock className="text-primary" size={18} />
            <p className="text-xs font-bold text-text-200 uppercase tracking-tight">
              Minimum {minHours} hours booking required
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
