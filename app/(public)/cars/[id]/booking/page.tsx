"use client";

import DateSelection from "@/components/date-selection";
import DesktopCheckoutCard from "@/components/desktop-checkout-card";
import Input from "@/components/input";
import NavigationMap from "@/components/navigation-map";
import { getCar } from "@/constants/cars";
import { ArrowRight, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useBookingStore from "@/store/booking-store";
import MobileCarCard from "@/components/mobile-car-card";
import Button from "@/components/button";

export const calculateDays = (start: Date | null, end: Date | null) => {
  if (!start || !end) return 0;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  pickupDate: z.date("Please select a pickup date"),
  dropoffDate: z.date("Please select a drop-off date"),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

const CarBookingPage = () => {
  const { id } = useParams();
  const car = getCar(id);
  const router = useRouter();
  const booking = useBookingStore((state) => state.booking);
  const [pickupDate, setPickupDate] = useState<Date | null>(booking.pickupDate );
  const [dropoffDate, setDropoffDate] = useState<Date | null>(booking.dropoffDate);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: booking.customer.firstName,
      lastName: booking.customer.lastName,
      email: booking.customer.email,
      phone: booking.customer.phone,
    },
  });

  // Sync external date state with form state
  useEffect(() => {
    if (pickupDate) {
      setValue("pickupDate", pickupDate);
      trigger("pickupDate");
    }
    if (dropoffDate) {
      setValue("dropoffDate", dropoffDate);
      trigger("dropoffDate");
    }
  }, [pickupDate, dropoffDate, setValue, trigger]);

  const totalDays = calculateDays(pickupDate, dropoffDate);
  const totalPrice = totalDays * (car?.price ?? 0);

  const addBooking = useBookingStore((state) => state.addBooking);

  const onSubmit = (data: BookingFormValues) => {
    addBooking({
      totalPrice,
      carId: car?.id || "",
      pickupDate: data.pickupDate,
      dropoffDate: data.dropoffDate,
      customer: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
    });

    router.push(`/cars/${car?.id}/payment`);
  };

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
          <MobileCarCard car={car} />
          <div className="space-y-2">
            <DateSelection
              car={car}
              pickupDate={pickupDate}
              setPickupDate={setPickupDate}
              dropoffDate={dropoffDate}
              setDropoffDate={setDropoffDate}
            />
            {(errors.pickupDate || errors.dropoffDate) && (
              <p className="text-xs text-red-500 font-medium px-4">
                {errors.pickupDate?.message || errors.dropoffDate?.message}
              </p>
            )}
          </div>
          <section className="space-y-6 lg:bg-white lg:rounded-xl lg:p-8">
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
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1.5 ">
                <label
                  htmlFor="first-name"
                  className="text-sm font-semibold text-label"
                >
                  First Name
                </label>
                <Input
                  icon={User}
                  placeholder="John"
                  id="first-name"
                  registration={register("firstName")}
                  error={errors.firstName?.message}
                />
              </div>
              <div className="flex flex-col gap-1.5 ">
                <label
                  htmlFor="last-name"
                  className="text-sm font-semibold text-label"
                >
                  Last Name
                </label>
                <Input
                  icon={User}
                  placeholder="Doe"
                  id="last-name"
                  registration={register("lastName")}
                  error={errors.lastName?.message}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email-address"
                  className="text-sm font-semibold text-label"
                >
                  Email Address
                </label>
                <Input
                  icon={Mail}
                  placeholder="johndoe@example.com"
                  id="email-address"
                  type="email"
                  registration={register("email")}
                  error={errors.email?.message}
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
                  registration={register("phone")}
                  error={errors.phone?.message}
                />
              </div>
            </form>
            <div className="space-y-3 lg:hidden">
              <Button type="submit" form="user-info">
                Proceed to Payment
                <ArrowRight />
              </Button>
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
