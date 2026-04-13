import { GET_CAR_PROPS } from "@/constants/cars";
import { Car } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";
import IconCard from "./icon-card";
import Link from "next/link";

const DesktopBookingCard = ({ car }: { car: Car }) => {
  return (
    <div className="hidden lg:block lg:col-span-4">
      <div className="top-44 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8 relative overflow-hidden">
          <p className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full w-fit">
            {car?.category}
          </p>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-text-100">
              {car?.name}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {GET_CAR_PROPS(car).map((spec, i) => (
              <IconCard
                key={i}
                text={spec.label ?? ""}
                icon={spec.icon}
                title={spec.title}
              />
            ))}
          </div>

          <div className="flex  flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-text-300 font-medium">Price per hour </p>
              <p className="text-text-100 font-bold">
                ₦{car.pricePerHour.toLocaleString()}{" "}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-text-300 font-medium">Price Per Day</p>
              <p className="text-text-100 font-bold">
                {" "}
                ₦{car.pricePerDay.toLocaleString()}{" "}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href={`/services?car=${car.id}&select=true`}
              className={`w-full py-4 rounded-xl font-black text-base  hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 bg-primary text-white`}
            >
              Book This Car
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-green-500 mt-0.5" />
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                Free cancellation up to 20 hours before pickup.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Ads or Info could go here */}
      </div>
    </div>
  );
};

export default DesktopBookingCard;
