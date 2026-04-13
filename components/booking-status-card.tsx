"use client";

import useBookingStore from "@/store/booking-store";
import { ArrowRight, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { BookingDetails } from "@/lib/types";

export default function BookingStatusCard() {
  const { bookings, updateBookingStatuses } = useBookingStore();
  const router = useRouter();

  useEffect(() => {
    // Update statuses on mount to ensure "ongoing" vs "past" is accurate
    updateBookingStatuses();
  }, [updateBookingStatuses]);

  const activeBooking = useMemo((): BookingDetails | null => {
    if (!bookings || bookings.length === 0) return null;

    // Filter for ongoing or confirmed (upcoming) bookings
    const filtered = bookings.filter(
      (b) => b.status === "ongoing" || b.status === "confirmed",
    );

    if (filtered.length === 0) return null;

    // Sort by schedule start date (earliest first)
    const sorted = filtered.sort((a, b) => {
      const getStartTime = (booking: BookingDetails) => {
        if (!booking.schedule) return Infinity;
        if (booking.schedule.type === "daily") {
          return new Date(booking.schedule.pickupDate).getTime();
        }
        return new Date(`${booking.schedule.date}T${booking.schedule.startTime}`).getTime();
      };
      return getStartTime(a) - getStartTime(b);
    });

    return sorted[0];
  }, [bookings]);

  if (!activeBooking || !activeBooking.customer) return null;

  const name = activeBooking.customer.firstName;

  const getPickupDate = (): Date | null => {
    if (!activeBooking.schedule) return null;
    if (activeBooking.schedule.type === "daily") {
      return new Date(activeBooking.schedule.pickupDate);
    }
    return new Date(activeBooking.schedule.date);
  };

  const dateObj = getPickupDate();
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
    <div
      onClick={() => router.push(`/booking-details/${activeBooking.bookingId}`)}
      className="w-full mx-auto p-4 md:p-6 bg-primary/5 md:bg-white border border-primary/20 rounded-xl shadow-sm flex items-start md:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="hidden md:flex p-3 bg-primary/10 rounded-full">
          <CalendarCheck size={24} color="#4FBFF8" />
        </div>

        <div className="flex flex-col min-w-0">
          <h2 className="text-text-100 text-sm md:text-lg font-bold flex items-center md:gap-2 truncate">
            Hello, {name} <span className="md:text-xl">👋</span>
          </h2>
          <p className="text-text-300 text-xs md:text-base truncate">
            {isToday
              ? "You have a booking today"
              : `You have a booking on ${bookingDateText}`}
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
