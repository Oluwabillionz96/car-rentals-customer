"use client";

import DateSelection from "@/components/date-selection";
import Input from "@/components/input";
import { getCar } from "@/constants/cars";
import { ArrowRight, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const CarBookingPage = () => {
  const { id } = useParams();
  const car = getCar(id);
  return (
    <section className="space-y-6">
      <div className="flex items-start gap-4 bg-primary/10 border border-primary/20 p-4 rounded-xl">
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
      <DateSelection car={car} />
      <section className="space-y-6">
        {" "}
        <h3 className="text-lg font-bold text-text-100">Customer Details</h3>
        <form className="space-y-4" id="user-info">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="full-name"
              className="text-sm font-semibold text-label"
            >
              Full Name
            </label>
            <Input icon={User} placeholder="John Doe" id="full-name" />
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
        <div className="space-y-3">
          <button className="bg-primary text-white justify-center px-5 h-14 rounded-xl font-bold text-base shadow-xl  flex items-center gap-2 active:scale-95 transition-all w-full">
            Proceed to Payment
            <ArrowRight />
          </button>
          <p className="text-xs text-center text-text-400">
            By proceeding, you agree to Solution Car Rentals' Terms of Service .
          </p>
        </div>
      </section>
    </section>
  );
};

export default CarBookingPage;
