"use client";

import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CreditCard,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { BookingFormValues } from "@/lib/validations";
import Input from "./input";

interface CheckoutCustomerFormProps {
  isConfirmed: boolean;
  serviceId?: string;
}

export default function CheckoutCustomerForm({
  isConfirmed,
  serviceId,
}: CheckoutCustomerFormProps) {
  const isSelfDrive = serviceId === "self_drive";
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingFormValues>();

  return (
    <div className="space-y-6">
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

      {isSelfDrive && (
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
              registration={register("customer.verification.licenseNumber")}
              error={errors.customer?.verification?.licenseNumber?.message}
              disabled={isConfirmed}
            />
            <Input
              id="expiry"
              type="date"
              icon={Calendar}
              placeholder="License Expiry"
              registration={register("customer.verification.licenseExpiry")}
              error={errors.customer?.verification?.licenseExpiry?.message}
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
    </div>
  );
}
