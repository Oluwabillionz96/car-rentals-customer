"use client";
import MobileCarCard from "@/components/mobile-car-card";
import { getCar } from "@/constants/cars";
import useBookingStore from "@/store/booking-store";
import { useParams, useRouter } from "next/navigation";
import { calculateDays } from "@/lib/utils";
import { Wallet } from "lucide-react";
import Button from "@/components/button";
import NavigationMap from "@/components/navigation-map";
import DesktopCarPaymentCard from "@/components/desktop-car-payment-card";

const PaymentPage = () => {
  const { id, bookingId } = useParams();
  const router = useRouter();
  const car = getCar(id);
  const bookingStore = useBookingStore(state => state)
  const verifiedBookings =  bookingStore?.verifiedBooking?.find(
      (booking) => booking.bookingId === bookingId,
  );
  const currentBooking = bookingStore.booking
  const booking = verifiedBookings || currentBooking
   
  const totalDays = calculateDays(
    booking?.pickupDate ?? null,
    booking?.dropoffDate || null,
  );
  const completeBooking = useBookingStore((state) => state.completeBooking);

  const onPayment = () => {
    completeBooking();
    router.push(`/cars/${car?.id}/booking/${booking?.bookingId}/confirmation`);
  };
  return (
    <section>
      <header className="hidden lg:block">
        <NavigationMap
          routes={[
            { href: "/", label: "Home" },
            { href: "/our-cars", label: "Our Cars" },
            { href: `/cars/${car?.id}`, label: car?.name ?? "" },
            { href: `/cars/${car?.id}/booking`, label: "Booking" },
            { href: `/cars/${car?.id}/payment`, label: "Checkout" },
          ]}
        />
        <h1 className="text-4xl font-extrabold text-text-500 mt-4 mb-2">
          Secure Payment
        </h1>
        <p className="text-text-300">Complete your purchase securely.</p>
      </header>

      <div className="lg:hidden text-sm">
        <NavigationMap
          routes={[
            { href: `/cars/${car?.id}`, label: car?.name ?? "" },
            { href: `/cars/${car?.id}/booking`, label: "Booking" },
            { href: `/cars/${car?.id}/payment`, label: "Checkout" },
          ]}
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-8 mt-6 lg:mt-10">
        <div className="lg:hidden flex-1">
          <h1 className="text-xl font-bold text-text-100 mb-4 lg:hidden">
            Order Summary
          </h1>
          <MobileCarCard car={car} isPayment totalDays={totalDays} />

          <div className="bg-white my-6 p-5 rounded-xl lg:hidden">
            <div className="flex flex-col gap-3 py-3">
              <div className="flex justify-between">
                <p className="text-sm text-text-300">
                  Rental Fees (₦ {car?.price.toLocaleString() || 0} x{" "}
                  {totalDays})
                </p>
                <p className="text-sm font-medium text-text-100">
                  ₦{booking?.totalPrice?.toLocaleString() ?? "0.00"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-text-300">Service Charge</p>
                <p className="text-sm font-medium text-text-100">₦ 0</p>
              </div>
            </div>
            <div className="pt-3 border-t border-neutral-100 flex justify-between">
              <p className="text-text-100 font-bold">Total Amount</p>
              <p className="text-lg font-bold text-primary">
                ₦ {booking?.totalPrice?.toLocaleString() || "0.00"}
              </p>
            </div>
          </div>

          <div className="lg:hidden">
            <Button
              onClick={onPayment}
              className="disabled:opacity-50 cursor-not-allowed"
              disabled={booking?.isBooked}
            >
              <Wallet />
              {!booking?.isBooked ? "Pay with Paystack" : "Paid"}
            </Button>
          </div>
        </div>

        <DesktopCarPaymentCard
          car={car}
          totalDays={totalDays}
          totalPrice={booking?.totalPrice ?? 0.0}
          onPayment={onPayment}
        />
      </div>
    </section>
  );
};

export default PaymentPage;
