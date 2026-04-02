"use client";

import {
  X,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Service,
  BookingSchedule,
  DailyBookingSchedule,
  HourlyBookingSchedule,
} from "@/lib/types";
import { useState, useEffect } from "react";
import { useForm, Control, UseFormWatch, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useGlobalStore from "@/store/global-store";
import { motion, AnimatePresence } from "framer-motion";
import { hourlyScheduleSchema, dailyScheduleSchema } from "@/lib/validations";

// Sub-components
import DailyScheduleForm from "./daily-schedule-form";
import HourlyScheduleForm from "./hourly-schedule-form";
import BookingSummaryCard from "./booking-summary-card";

interface BookingScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export default function BookingScheduleModal({
  isOpen,
  onClose,
  service,
}: BookingScheduleModalProps) {
  const router = useRouter();
  const setTempSchedule = useGlobalStore((state) => state.setTempSchedule);
  const [step, setStep] = useState<1 | 2>(1);
  const isDaily = service?.pricing === "daily";

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<BookingSchedule>({
    resolver: zodResolver(isDaily ? dailyScheduleSchema : hourlyScheduleSchema),
    mode: "onChange",
    defaultValues: isDaily
      ? { type: "daily", pickupDate: "", dropoffDate: "" }
      : {
          type: "hourly",
          date: "",
          startTime: "",
          hours: service?.minHours || 1,
          pickupAddress: "",
        },
  });

  const formValues = watch();

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      reset(
        isDaily
          ? { type: "daily", pickupDate: "", dropoffDate: "" }
          : {
              type: "hourly",
              date: "",
              startTime: "",
              hours: service?.minHours || 1,
              pickupAddress: "",
            },
      );
    }
  }, [isOpen, reset, isDaily, service]);

  const onConfirm = (data: BookingSchedule) => {
    setTempSchedule(data);
    router.push(
      `/our-fleet?service=${service?.id}&select=true&selectType=${service?.selectType}`,
    );
    onClose();
  };

  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center p-0 md:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl bg-white md:rounded-[40px] rounded-t-[40px] shadow-2xl flex flex-col max-h-[95vh] md:max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-4">
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all active:scale-90"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md">
                      Step {step === 1 ? "1: Details" : "2: Review"}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-text-100 italic uppercase">
                    {step === 1
                      ? "Choose a Schedule"
                      : "Confirm Booking Details"}
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8 custom-scrollbar space-y-10">
              {step === 1 ? (
                <div className="space-y-10">
                  <div className="bg-primary/5 border border-primary/10 p-6 rounded-3xl flex gap-4 items-start">
                    <div className="bg-primary text-white p-2 rounded-xl shrink-0">
                      <CheckCircle2 size={24} />
                    </div>
                    <p className="text-sm md:text-base text-text-100 font-medium leading-relaxed">
                      We only show cars available for your specific time.
                    </p>
                  </div>
                  {isDaily ? (
                    <DailyScheduleForm
                      control={
                        control as unknown as Control<DailyBookingSchedule>
                      }
                      watch={
                        watch as unknown as UseFormWatch<DailyBookingSchedule>
                      }
                    />
                  ) : (
                    <HourlyScheduleForm
                      control={
                        control as unknown as Control<HourlyBookingSchedule>
                      }
                      errors={
                        errors as unknown as FieldErrors<HourlyBookingSchedule>
                      }
                      minHours={service.minHours}
                    />
                  )}
                </div>
              ) : (
                <BookingSummaryCard
                  formValues={formValues}
                  onEdit={() => setStep(1)}
                />
              )}

              {Object.keys(errors).length > 0 && step === 1 && (
                <p className="text-center text-red-500 text-xs font-bold bg-red-50 p-4 rounded-2xl border border-red-100">
                  Please fix the errors above to continue.
                </p>
              )}
            </div>

            <div className="p-6 md:p-8 bg-white border-t border-slate-50 flex flex-col md:flex-row gap-4 sticky bottom-0 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
              <button
                onClick={onClose}
                type="button"
                className="flex-1 px-8 py-5 text-text-300 font-bold hover:bg-slate-50 hover:text-text-100 border border-slate-200 rounded-2xl transition-all uppercase text-sm md:text-base active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(
                  step === 1 ? () => setStep(2) : onConfirm,
                )}
                disabled={step === 1 && !isValid}
                className="flex-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary hover:bg-primary/90 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 text-base md:text-lg uppercase group active:scale-95"
              >
                {step === 1 ? "Review Schedule" : "Confirm"}
                {step === 1 ? (
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ChevronRight />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
