"use client";

import {
  Mail,
  Ticket,
  ArrowRight,
  HelpCircle,
  Headphones,
  MessageSquare,
} from "lucide-react";
import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const findBookingSchema = z.object({
  email: z.email("Please enter a valid email address"),
  bookingId: z.string().min(14, "Booking ID must be 14 characters"),
});

type FindBookingFormValues = z.infer<typeof findBookingSchema>;

export default function FindMyBookingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FindBookingFormValues>({
    resolver: zodResolver(findBookingSchema),
    mode: "onChange",
    defaultValues: { email: "", bookingId: "" },
  });

  const onSubmit = async (data: FindBookingFormValues) => {
    console.log("Searching for booking:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center md:py-20 overflow-x-hidden">
      {/* Unified Card Container */}
      <div className="w-full max-w-sm md:max-w-medium lg:max-w-2xl lg:bg-white md:rounded-[40px] md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] md:border md:border-slate-100 overflow-hidden">
        <div className="w-full p-4 md:p-16 flex flex-col items-center text-center">
          {/* Header Content */}
          <div className="w-full mb-8 md:mb-12">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f0f9ff] rounded-2xl md:rounded-[24px] flex items-center justify-center mb-6 md:mb-8 mx-auto relative group">
              <div className="absolute inset-0 bg-blue-400/10 blur-xl rounded-full scale-75 group-hover:scale-90 transition-transform" />
              <Ticket
                className="text-[#3b82f6] relative"
                size={32}
                strokeWidth={1.5}
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-text-100 mb-3 md:mb-4">
              Find My Booking
            </h1>
            <p className="text-text-300 text-[15px] md:text-lg max-w-sm mx-auto leading-relaxed text-left lg:text-center">
              Enter your details to retrieve your rental information and manage
              your trip.
            </p>
          </div>

          {/* Single Unified Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-5 md:space-y-6 text-left"
          >
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-text-100 ml-1"
                htmlFor="email-search"
              >
                Email Address
              </label>
              <Input
                icon={Mail}
                id="email-search"
                placeholder="e.g. name@example.com"
                registration={register("email")}
                error={errors.email?.message}
                showIconDesktop
                className="bg-[#f8fafc] md:bg-[#f8fafc] border-slate-100"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-bold text-text-100 ml-1"
                htmlFor="booking-id-search"
              >
                Booking ID
              </label>
              <Input
                icon={Ticket}
                id="booking-id-search"
                placeholder="e.g. SCR-123456"
                registration={register("bookingId")}
                error={errors.bookingId?.message}
                showIconDesktop
                className="bg-[#f8fafc] md:bg-[#f8fafc] border-slate-100"
              />
              <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5 ml-1">
                <HelpCircle size={14} />
                Check your confirmation email for the Booking ID
              </p>
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full bg-[#4facfe] hover:bg-[#3b82f6] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] mt-4"
            >
              {isSubmitting ? "Searching..." : "Find Booking"}
              <ArrowRight size={22} strokeWidth={2.5} />
            </button>

            {/* Responsive Support Section */}
            <div className="flex items-center justify-center gap-4 md:gap-6 pt-8 md:pt-10 border-t border-slate-100 mt-8 md:mt-10 mb-2 md:mb-0">
              <p className="hidden md:block text-sm text-slate-400 font-medium shrink-0">
                Need help?
              </p>
              <button
                type="button"
                className="text-[#3b82f6] font-bold text-[13px] md:text-sm hover:underline transition-all"
              >
                Contact Support
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#3b82f6] border border-slate-100 transition-colors"
                >
                  <Headphones size={18} />
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#3b82f6] border border-slate-100 transition-colors"
                >
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Support Card for Mobile only - matching the "User Contact Form" patterns if applicable */}
      <div className="md:hidden w-full max-w-sm mt-8">
        <div className="bg-[#f0f9ff] rounded-[32px] p-8 border border-blue-50 relative overflow-hidden">
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-blue-100/50 flex items-center justify-center text-[#3b82f6]">
              <HelpCircle size={24} />
            </div>
            <p className="text-slate-600 font-semibold text-[15px] leading-relaxed">
              Can&apos;t find your booking ID? Check your confirmation email or
              contact support.
            </p>
            <button className="text-[#3b82f6] font-bold text-[15px] hover:underline">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
