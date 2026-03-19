"use client";

import useBookingStore from "@/store/booking-store";
import { ArrowRight, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

export default function BookingStatusCard() {
  const bookings = useBookingStore((state) => state.verifiedBooking);
  const updateBookingStatuses = useBookingStore((state) => state.updateBookingStatuses);

  useEffect(() => {
    // Update statuses on mount to ensure "Ongoing" vs "Past" is accurate
    updateBookingStatuses();
  }, [updateBookingStatuses]);

  const activeBooking = useMemo(() => {
    if (!bookings) return null;
    
    // Filter for Ongoing or Future bookings and pick the most recent one (last in array)
    const filtered = bookings.filter(b => b.status === "Ongoing" || b.status === "Future");
    return filtered.length > 0 ? filtered[filtered.length - 1] : null;
  }, [bookings]);

  if (!activeBooking) return null;

  const name = activeBooking.customer.firstName;
  const dateObj = activeBooking.pickupDate ? new Date(activeBooking.pickupDate) : null;
  const today = new Date();
  
  const isToday =
    dateObj &&
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear();

  const bookingDateText = isToday
    ? "today"
    : dateObj
      ? dateObj.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })
      : "your scheduled date";

  return (
    <div className="w-full mx-auto p-4 md:p-6 bg-primary/5 md:bg-white border border-primary/20 rounded-xl shadow-sm flex items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="hidden md:flex p-3 bg-primary/10 rounded-full">
          <CalendarCheck size={24} color="#4FBFF8" />
        </div>

        <div className="flex flex-col min-w-0">
          <h2 className="text-text-100 text-sm md:text-lg font-bold flex items-center md:gap-2 truncate">
            Welcome back, {name} <span className="md:text-xl">👋</span>
          </h2>
          <p className="text-text-300 text-xs md:text-base truncate">
            {isToday ? "You have a booking today" : `You have a booking on ${bookingDateText}`}
          </p>
        </div>
      </div>

      {/* View Details Link/Button */}
      <div className="shrink-0">
        <Link
          href={`/booking-details/${activeBooking.bookingId}`}
          className="flex items-center gap-1 w-fit md:gap-2 text-primary md:bg-primary md:text-white md:px-6 md:py-3 md:rounded-xl font-semibold md:font-medium md:text-sm text-xs transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
        >
          <span className="hidden md:inline">View Details</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
