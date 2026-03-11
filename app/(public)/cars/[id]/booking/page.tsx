"use client";

import DateSelection from "@/components/date-selection";
import { getCar } from "@/constants/cars";
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
    </section>
  );
};

export default CarBookingPage;
