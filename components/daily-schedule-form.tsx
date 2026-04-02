"use client";

import { Control, Controller, UseFormWatch } from "react-hook-form";
import DatePicker from "./date-picker";
import { DailyBookingSchedule } from "@/lib/types";

interface DailyScheduleFormProps {
  control: Control<DailyBookingSchedule>;
  watch: UseFormWatch<DailyBookingSchedule>;
}

export default function DailyScheduleForm({
  control,
  watch,
}: DailyScheduleFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <Controller
        name="pickupDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="When are we picking you up?"
            selectedDate={field.value ? new Date(field.value) : null}
            onDateSelect={(d) => field.onChange(d?.toISOString() || "")}
            endDate={
              watch("dropoffDate") ? new Date(watch("dropoffDate")) : undefined
            }
            className="max-w-none"
          />
        )}
      />
      <Controller
        name="dropoffDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="When is the drop-off?"
            selectedDate={field.value ? new Date(field.value) : null}
            onDateSelect={(d) => field.onChange(d?.toISOString() || "")}
            startDate={
              watch("pickupDate") ? new Date(watch("pickupDate")) : undefined
            }
            className="max-w-none"
          />
        )}
      />
    </div>
  );
}
