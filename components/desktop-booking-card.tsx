import { Car, GET_CAR_PROPS } from "@/constants/cars";
import { ArrowLeft, CheckCircle2, Fuel, Settings, Users } from "lucide-react";
import IconCard from "./icon-card";
import Link from "next/link";

const DesktopBookingCard = ({ car }: { car: Car }) => {
  return (
    <div className="hidden md:block md:col-span-4">
      <div className="top-44 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8 relative overflow-hidden">
          <p className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full w-fit">
            {car?.type}
          </p>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-text-100">
              {car?.name} {car?.year}
            </h1>
            <p className="text-primary  text-2xl font-bold ">
              ₦{car.price.toLocaleString()}{" "}
              <span className="text-based font-medium text-text-300">
                / day
              </span>
            </p>
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

          <div className="space-y-4">
            <Link href={`/cars/${car.id}/booking`} className="w-full bg-primary text-white py-4 rounded-xl font-black text-base  hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
              Book This Car
            </Link>
            <button className="w-full bg-slate-50 text-text-100 py-4 rounded-xl font-black text-base border border-slate-100 hover:bg-white transition-all">
              Add to Favorites
            </button>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-green-500 mt-0.5" />
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                Free cancellation up to 48 hours before pickup.
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
