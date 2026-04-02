import { BookingDetails, BookingSchedule } from "@/lib/types";
import { BookingFormValues, bookingSchema } from "@/lib/validations";
import useBookingStore from "@/store/booking-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./input";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  User,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import Button from "./button";
import { useRouter } from "next/navigation";
import { calculateDays, calculatePrice } from "@/lib/utils";

const BookingCardRight = ({ booking }: { booking: BookingDetails }) => {
  const [step, setStep] = useState(1);
  const { updateBooking } = useBookingStore();
  const existingSchedule = booking?.schedule;
  const isConfirmed = booking.status !== "draft";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customer: {
        firstName: booking.customer?.firstName || "",
        lastName: booking.customer?.lastName || "",
        email: booking.customer?.email || "",
        phone: booking.customer?.phone || "",
      },
      schedule:
        booking?.service.pricing === "hourly"
          ? {
              type: "hourly",
              date:
                existingSchedule?.type === "hourly"
                  ? existingSchedule.date
                  : "",
              startTime:
                existingSchedule?.type === "hourly"
                  ? existingSchedule.startTime
                  : "",
              hours:
                (existingSchedule?.type === "hourly"
                  ? existingSchedule.hours
                  : booking.service.minHours) || 1,
              pickupAddress:
                existingSchedule?.type === "hourly"
                  ? existingSchedule.pickupAddress
                  : "",
            }
          : {
              type: "daily",
              pickupDate:
                existingSchedule?.type === "daily"
                  ? existingSchedule.pickupDate
                  : "",
              dropoffDate:
                existingSchedule?.type === "daily"
                  ? existingSchedule.dropoffDate
                  : "",
            },
    },
  });

  const router = useRouter();

  const onSubmit = (data: BookingFormValues) => {
    if (booking.status !== "draft") {
      router.push(`/booking/${booking.bookingId}/payment`);
      return;
    }
    updateBooking({
      bookingId: booking.bookingId,
      customer: data.customer,
      schedule: data.schedule as BookingSchedule,
      status: "confirmed", // Assuming confirming after details added
    });
    router.push(`/booking/${booking.bookingId}/payment`);
  };

  const nextStep = async () => {
    // Basic validation for the first step if needed, or just let handleSubmit handle it
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const scheduleType = watch("schedule.type");
  const startTime = watch("schedule.startTime");
  const hours = (watch("schedule.hours") as number) || 1;

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

  const endTime = calculateEndTime(startTime, hours);
  const totalPrice = calculatePrice(booking);
  const timeQuery = booking.service.pricing === "hourly" ? "hour" : "days";

  return (
    <>
      {" "}
      <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <div
            className={`flex-1 py-6 text-center font-bold text-sm transition-colors relative ${step === 1 ? "text-primary" : "text-text-400"}`}
          >
            1. Customer Details
            {step === 1 && (
              <motion.div
                layoutId="step-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
              />
            )}
          </div>
          <div
            className={`flex-1 py-6 text-center font-bold text-sm transition-colors relative ${step === 2 ? "text-primary" : "text-text-400"}`}
          >
            2. Schedule & Preferences
            {step === 2 && (
              <motion.div
                layoutId="step-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
              />
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          id="booking-form"
          className="p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="firstName"
                    icon={User}
                    placeholder="First Name"
                    registration={register("customer.firstName")}
                    error={errors.customer?.firstName?.message}
                    disabled={isConfirmed}
                  />
                  <Input
                    id="lastName"
                    icon={User}
                    placeholder="Last Name"
                    registration={register("customer.lastName")}
                    error={errors.customer?.lastName?.message}
                    disabled={isConfirmed}
                  />
                </div>
                <Input
                  id="email"
                  type="email"
                  icon={Mail}
                  placeholder="Email Address"
                  registration={register("customer.email")}
                  error={errors.customer?.email?.message}
                  disabled={isConfirmed}
                />
                <Input
                  id="phone"
                  type="tel"
                  icon={Phone}
                  placeholder="Phone Number"
                  registration={register("customer.phone")}
                  error={errors.customer?.phone?.message}
                  disabled={isConfirmed}
                />

                {booking.service.id === "self_drive" && (
                  <div className="mt-8 space-y-6 pt-6 border-t border-slate-100">
                    <h3 className="font-bold text-text-100 flex items-center gap-2">
                      <ShieldCheck className="text-primary" size={20} />
                      Driver Verification
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        id="license"
                        icon={CreditCard}
                        placeholder="License Number"
                        registration={register(
                          "customer.verification.licenseNumber",
                        )}
                        error={
                          errors.customer?.verification?.licenseNumber?.message
                        }
                        disabled={isConfirmed}
                      />
                      <Input
                        id="expiry"
                        type="date"
                        icon={Calendar}
                        placeholder="License Expiry"
                        registration={register(
                          "customer.verification.licenseExpiry",
                        )}
                        error={
                          errors.customer?.verification?.licenseExpiry?.message
                        }
                        disabled={isConfirmed}
                      />
                      <Input
                        id="nin"
                        icon={CheckCircle2}
                        placeholder="NIN (11 Digits)"
                        registration={register("customer.verification.nin")}
                        error={errors.customer?.verification?.nin?.message}
                        disabled={isConfirmed}
                      />
                      <Input
                        id="bvn"
                        icon={CheckCircle2}
                        placeholder="BVN (11 Digits)"
                        registration={register("customer.verification.bvn")}
                        error={errors.customer?.verification?.bvn?.message}
                        disabled={isConfirmed}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <Button
                    type="button"
                    className="disabled:opacity-50 disabled:cursor-not-allowed
                        "
                    onClick={nextStep}
                    disabled={
                      !watch("customer.firstName") ||
                      !watch("customer.lastName") ||
                      !watch("customer.email") ||
                      !watch("customer.phone")
                    }
                  >
                    Continue <ChevronRight size={20} />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {scheduleType === "hourly" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        id="date"
                        type="date"
                        icon={Calendar}
                        placeholder="Pickup Date"
                        registration={register("schedule.date")}
                        error={(errors.schedule as any)?.date?.message}
                        disabled={isConfirmed}
                      />
                      <Input
                        id="startTime"
                        type="time"
                        icon={Clock}
                        placeholder="Start Time"
                        registration={register("schedule.startTime")}
                        error={(errors.schedule as any)?.startTime?.message}
                        disabled={isConfirmed}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-text-400 uppercase tracking-widest ml-1">
                        For how long? (Minimum {booking.service.minHours || 1}{" "}
                        hours)
                      </label>
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 w-full h-16 flex items-center justify-between px-6 rounded-2xl border-2 border-slate-100 bg-slate-50/30">
                          <button
                            type="button"
                            disabled={isConfirmed}
                            onClick={() =>
                              setValue(
                                "schedule.hours",
                                Math.max(
                                  booking.service.minHours || 1,
                                  hours - 1,
                                ),
                              )
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
                            onClick={() =>
                              setValue("schedule.hours", hours + 1)
                            }
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

                      {(errors.schedule as any)?.hours && (
                        <p className="text-xs text-red-500 ml-1">
                          {(errors.schedule as any).hours.message}
                        </p>
                      )}
                    </div>
                    <Input
                      id="pickupAddress"
                      icon={MapPin}
                      placeholder="Pickup Address"
                      registration={register("schedule.pickupAddress")}
                      error={(errors.schedule as any)?.pickupAddress?.message}
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
                        error={(errors.schedule as any)?.pickupDate?.message}
                        disabled={isConfirmed}
                      />
                      <Input
                        id="dropoffDate"
                        type="date"
                        icon={Calendar}
                        placeholder="Drop-off Date"
                        registration={register("schedule.dropoffDate")}
                        error={(errors.schedule as any)?.dropoffDate?.message}
                        disabled={isConfirmed}
                      />
                    </div>
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex gap-3 text-primary">
                      <AlertCircle size={20} className="shrink-0" />
                      <p className="text-xs font-medium leading-relaxed">
                        Daily rentals are calculated per calendar day. Ensure
                        pickup and drop-off are within our business hours.
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-6 flex flex-col-reverse md:flex-row gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 border-2 border-slate-100 flex items-center justify-center gap-2  rounded-xl font-bold py-4 hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>
                  <Button
                    type="submit"
                    form="booking-form"
                    className="flex-2 py-4  "
                  >
                    {booking.status === "draft"
                      ? "Proceed to Payment"
                      : "View Payment Details"}
                    <ChevronRight size={20} />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
      <div className="bg-primary/5 rounded-3xl p-6 my-2 border border-primary/10 space-y-4">
        <h3 className="font-bold text-primary flex items-center gap-2">
          <CreditCard size={18} />
          Order Summary
        </h3>

        {totalPrice > 0 && (
          <div className="space-y-3 py-4 border-y border-primary/10">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-text-300">Total Unit Rate</span>
              <span className="text-text-100 font-bold">
                ₦{" "}
                {booking.selectedCars
                  .reduce(
                    (acc, car) =>
                      acc +
                      car[
                        timeQuery === "hour" ? "pricePerHour" : "pricePerDay"
                      ],
                    0,
                  )
                  .toLocaleString()}{" "}
                / {timeQuery}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-text-300">Duration ({timeQuery}s)</span>
              <span className="text-text-100 font-bold">
                {booking.schedule?.type === "hourly"
                  ? booking.schedule.hours
                  : calculateDays(
                      booking.schedule?.pickupDate || "",
                      booking.schedule?.dropoffDate || "",
                    )}{" "}
                {timeQuery}s
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-end">
          <p className="text-text-300 text-sm font-medium">Total Payable</p>
          <div className="text-right">
            <p className="text-3xl font-black text-primary">
              ₦{totalPrice ? totalPrice.toLocaleString() : "..."}
            </p>
            {!totalPrice && (
              <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mt-1">
                Pending Selection
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCardRight;
