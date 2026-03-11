"use client";

import DateSelection from "@/components/date-selection";
import DesktopCheckoutCard from "@/components/desktop-checkout-card";
import Input from "@/components/input";
import NavigationMap from "@/components/navigation-map";
import { getCar } from "@/constants/cars";
import { ArrowRight, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export const calculateDays = (start: Date | null, end: Date | null) => {
  if (!start || !end) return 0;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const CarBookingPage = () => {
  const { id } = useParams();
  const car = getCar(id);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);

  const totalDays = calculateDays(pickupDate, dropoffDate);
  const totalPrice = totalDays * (car?.price ?? 0);
  return (
    <section className="space-y-6">
      <header className="hidden lg:block">
        <NavigationMap
          routes={[
            { href: "/", label: "Home" },
            { href: "/our-cars", label: "Our Cars" },
            { href: `/cars/${car?.id}`, label: car?.name ?? "" },
            { href: `/cars/${car?.id}/booking`, label: "Checkout" },
          ]}
        />
        <h1 className="text-4xl font-extrabold text-text-500 mt-4 mb-2">
          Complete your Booking
        </h1>
        <p className="text-text-300">
          Secure your premium vehicle in just a few steps.
        </p>
      </header>
      <section className="flex gap-8">
        <section className="space-y-8 flex-1">
          <div className="flex items-start gap-4 lg:hidden bg-primary/10 border border-primary/20 p-4 rounded-xl">
            <div className="w-20 aspect-square relative rounded-lg overflow-hidden">
              <Image src={car?.image ?? ""} alt={car?.name ?? ""} fill />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-100">
                {car?.name} {car?.year}
              </h3>
              <p className="text-sm text-text-300">
                ₦{car?.price.toLocaleString()} / day
              </p>
            </div>
          </div>
          <DateSelection
            car={car}
            pickupDate={pickupDate}
            setPickupDate={setPickupDate}
            dropoffDate={dropoffDate}
            setDropoffDate={setDropoffDate}
          />
          <section className="space-y-6 lg:bg-white lg:rounded-xl lg:p-8">
            {" "}
            <h3 className="text-lg lg:hidden font-bold text-text-100">
              Customer Details
            </h3>
            <header className="lg:flex gap-3 hidden ">
              <span className="text-sm text-white font-bold px-3 py-1.5 bg-primary rounded-full">
                2
              </span>
              <p className="text-xl font-bold text-text-100">
                Personal Details
              </p>
            </header>
            <form
              className="space-y-4 lg:grid grid-cols-2 gap-6 "
              id="user-info"
            >
              <div className="flex flex-col gap-1.5 lg:hidden">
                <label
                  htmlFor="full-name"
                  className="text-sm font-semibold text-label"
                >
                  Full Name
                </label>
                <Input icon={User} placeholder="John Doe" id="full-name" />
              </div>
              <div className="flex flex-col gap-1.5 ">
                <label
                  htmlFor="first-name"
                  className="text-sm font-semibold text-label"
                >
                  First Name
                </label>
                <Input icon={User} placeholder="John" id="first-name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="last-name"
                  className="text-sm font-semibold text-label"
                >
                  Last Name
                </label>
                <Input icon={User} placeholder="Doe" id="last-name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email-address"
                  className="text-sm font-semibold text-label"
                >
                  Email Adress
                </label>
                <Input
                  icon={Mail}
                  placeholder="johndoe@example.com"
                  id="email-address"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone-number"
                  className="text-sm font-semibold text-label"
                >
                  Phone Number
                </label>
                <Input
                  icon={Phone}
                  placeholder="+234 700 000 0000"
                  id="phone-number"
                />
              </div>
            </form>
            <div className="space-y-3 lg:hidden">
              <button className="bg-primary text-white justify-center px-5 h-14 rounded-xl font-bold text-base shadow-xl  flex items-center gap-2 active:scale-95 transition-all w-full">
                Proceed to Payment
                <ArrowRight />
              </button>
              <p className="text-xs text-center text-text-400">
                By proceeding, you agree to Solution Car Rentals' Terms of
                Service .
              </p>
            </div>
          </section>
        </section>
        <DesktopCheckoutCard
          totalDays={totalDays}
          totalPrice={totalPrice}
          car={car}
        />
      </section>
    </section>
  );
};

export default CarBookingPage;
