"use client";

import { Control, Controller, UseFormWatch } from "react-hook-form";
import DatePicker from "./date-picker";
import { DailyBookingSchedule } from "@/lib/types";
import { getLocalDateString } from "@/lib/utils";

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
            selectedDate={field.value ? new Date(field.value + "T00:00:00") : null}
            onDateSelect={(d) => field.onChange(getLocalDateString(d))}
            endDate={
              watch("dropoffDate") ? new Date(watch("dropoffDate") + "T00:00:00") : undefined
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
            selectedDate={field.value ? new Date(field.value + "T00:00:00") : null}
            onDateSelect={(d) => field.onChange(getLocalDateString(d))}
            startDate={
              watch("pickupDate") ? new Date(watch("pickupDate") + "T00:00:00") : undefined
            }
            className="max-w-none"
          />
        )}
      />
    </div>
  );
}
