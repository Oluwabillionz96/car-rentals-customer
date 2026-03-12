"use client";
import MobileCarCard from "@/components/mobile-car-card";
import { getCar } from "@/constants/cars";
import useBookingStore from "@/store/booking-store";
import { useParams } from "next/navigation";
import { calculateDays } from "../booking/page";
import { Wallet } from "lucide-react";
import Button from "@/components/button";

const PaymentPage = () => {
  const { id } = useParams();
  const car = getCar(id);
  const booking = useBookingStore((state) => state.booking);
  const totalDays = calculateDays(booking.pickupDate, booking.dropoffDate);
  return (
    <section>
      <h1 className="text-xl font-bold text-text-100 mb-4">Order Summary</h1>
      <MobileCarCard car={car} isPayment totalDays={totalDays} />
      <div className="bg-white my-6 p-5 rounded-xl">
        <div className="flex flex-col gap-3 py-3">
          <div className="flex  justify-between">
            <p className="text-sm text-text-300">
              Rental Fees (₦ {car?.price.toLocaleString() || 0} x {totalDays})
            </p>
            <p className="text-sm font-medium text-text-100">
              ₦{booking.totalPrice.toLocaleString()}
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
            ₦ {booking.totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
      <Button>
        <Wallet />
        Pay with Paystack
      </Button>
    </section>
  );
};

export default PaymentPage;
