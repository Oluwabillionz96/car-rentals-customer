"use client";

import { getCar } from "@/constants/cars";
import { useParams, useRouter } from "next/navigation";
import useBookingStore from "@/store/booking-store";
import ConfirmationMobileView from "@/components/confirmation-components/confirmation-mobile-view";
import ConfirmationDesktopView from "@/components/confirmation-components/confirmation-desktop-view";
import { useCancelBooking } from "@/hooks/use-cancel-booking";
import EmptyState from "@/components/empty-state";
import { Hash } from "lucide-react";

export default function ConfirmationPage() {
  const { id, bookingId } = useParams();
  const car = getCar(id);
  const router = useRouter();
  const verifiedBookings = useBookingStore((state) => state.verifiedBooking);
  const booking = verifiedBookings?.find(
    (booking) =>
      booking.bookingId === bookingId &&
      booking.carId === (id as string) &&
      booking.isBooked === true,
  );
  const pickupDate = booking?.pickupDate || null;
  const dropoffDate = booking?.dropoffDate || null;

  const { openCancelModal, CancelModal } = useCancelBooking({
    carName: car?.name || "",
    bookingId: (bookingId as string) || "",
  });

  if (!booking || !car) {
    return (
      <EmptyState
        title="Booking Not Found"
        description={`We couldn't find a confirmed booking with the ID: ${bookingId}. Please check your booking history.`}
        icon={Hash}
        actionLabel="Find My Booking"
        actionHref="/find-my-booking"
      />
    );
  }

  const duration =
    (dropoffDate ? dropoffDate.getTime() : 0) -
    (pickupDate ? pickupDate.getTime() : 0);
  const days = Math.ceil(duration / (1000 * 60 * 60 * 24)) || 0;

  const customer = booking?.customer;
  const customerName =
    customer?.firstName && customer?.lastName
      ? `${customer.firstName} ${customer.lastName}`
      : "Valued Customer";
  const customerEmail = customer?.email || "your email";
  const customerPhone = customer?.phone || "Contact support";

  const formatDate = (date: Date | null) => {
    if (!date) return "Not scheduled";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!car) {
    return <div className="p-20 text-center">Car not found</div>;
  }

  const handleBackHome = () => {
    router.push("/");
  };

  //   const bookingId = booking?.bookingId || "SRC-2026-XXXXX";

  if (!booking?.isBooked) {
    router.push(`/cars/${id}/booking`);
  }

  return (
    <div className="max-w-6xl mx-auto md:py-10 pb-20 px-3 md:px-0">
      <ConfirmationMobileView
        car={car}
        onBackHome={handleBackHome}
        days={days}
        customerName={customerName}
        pickupDate={formatDate(pickupDate)}
        dropoffDate={formatDate(dropoffDate)}
        bookingId={bookingId as string}
        onCancel={openCancelModal}
        rawPickupDate={pickupDate}
      />
      <ConfirmationDesktopView
        car={car}
        onBackHome={handleBackHome}
        userEmail={customerEmail}
        userName={customerName}
        userPhone={customerPhone}
        pickupDateStr={formatDate(pickupDate)}
        dropoffDateStr={formatDate(dropoffDate)}
        bookingId={bookingId as string}
        onCancel={openCancelModal}
        rawPickupDate={pickupDate}
      />

      {/* Cancel Confirmation Modal via Hook */}
      <CancelModal />
    </div>
  );
}
