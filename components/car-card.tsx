"use client";

import { getCar } from "@/constants/cars";
import useGlobalStore from "@/store/global-store";
import {
  Users,
  Settings,
  ShoppingCart,
  Plus,
  Check,
  Info,
  Fuel,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CarCardProps {
  id: string;
  isSelect?: boolean;
  selectType?: "single" | "multiple";
  isSelfDrive?: boolean;
}

const CarCard = ({ id, isSelect, selectType, isSelfDrive }: CarCardProps) => {
  const globalStore = useGlobalStore((state) => state);
  const car = getCar(id);
  const isSelected = globalStore.selectedCarsId.includes(id);
  const router = useRouter();
  return (
    <div
      className={`${isSelected ? "border-primary border-2" : ""} w-full cursor-pointer max-w-[400px] bg-white border border-neutral-100 rounded-lg md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full`}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={car?.images[0] ?? ""}
          alt={`${car?.name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
          <span className="text-primary font-bold text-[10px] tracking-widest px-3 py-1">
            {car?.category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-1">
        {/* Header - Desktop & Mobile Divergence */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg md:text-xl font-bold text-text-100">
            {car?.name}
          </h3>
          {/* Mobile Only Price */}
          <div className="md:hidden flex flex-col items-end">
            <span className="text-primary text-lg font-bold">
              ₦
              {isSelfDrive
                ? car?.pricePerDay.toLocaleString()
                : car?.pricePerHour.toLocaleString()}
            </span>
            <span className="text-text-400 text-nowrap text-xs font-bold uppercase tracking-wider">
              Per {isSelfDrive ? "Day" : "Hour"}
            </span>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2 md:font-semibold text-slate-500">
            <Users size={18} className="text-slate-400" />
            <span className="text-xs md:text-sm">{car?.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2 md:font-semibold text-slate-500">
            <Settings size={18} className="text-slate-400" />
            <span className="text-xs md:text-sm">{car?.transmission}</span>
          </div>
          <div className="flex items-center gap-2 md:font-semibold text-slate-500">
            <Fuel size={18} className="text-slate-400" />
            <span className="text-xs md:text-sm">{car?.fuel}</span>
          </div>
        </div>

        {/* Desktop View Bottom Section */}
        <div className="hidden md:block">
          <div className="h-px bg-slate-100 w-full mb-6" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-text-400 text-xs font-bold uppercase tracking-widest mb-1">
                Per {isSelfDrive ? "Day" : "Hour"}
              </span>
              <span className="text-text-100 text-xl font-black">
                ₦
                {isSelfDrive
                  ? car?.pricePerDay.toLocaleString()
                  : car?.pricePerHour.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-primary/10 hover:bg-primary/20 p-4 rounded-2xl transition-colors group/btn"
                onClick={() => {
                  if (!isSelect) {
                    router.push(`/services?car=${car?.id}&select=true`);
                    return;
                  }
                  if (isSelected) {
                    globalStore.removeCar(id);
                    return;
                  }
                  globalStore.addCar(id, selectType ?? "single");
                }}
              >
                <div className="relative flex">
                  {isSelect && isSelected ? (
                    <>
                      <Check size={20} className="text-primary" />
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} className="text-primary" />
                      <Plus
                        size={10}
                        className="absolute -top-1 -right-1 text-primary stroke-3"
                      />
                    </>
                  )}
                </div>
              </button>
              {!isSelect && (
                <Link
                  href={`/cars/${id}`}
                  className="bg-primary/10 hover:bg-primary/20 p-4 rounded-2xl transition-colors group/btn"
                >
                  <Info />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View Button */}
        <div className="md:hidden mt-auto flex gap-2">
          <button
            className={`w-full border-2 py-3 rounded-lg font-bold text-text-100 active:scale-[0.98] transition-all hover:bg-slate-50 text-sm text-center ${
              isSelected
                ? "border-primary bg-primary text-white"
                : "border-border-100"
            }`}
            onClick={() => {
              if (!isSelect) {
                router.push(`/services/car=${id}&select=true`);
                return;
              }

              if (isSelected) {
                globalStore.removeCar(id);
                return;
              }
              globalStore.addCar(id, selectType ?? "single");
            }}
          >
            {isSelect ? (isSelected ? "Selected" : "Select Car") : "Book Now"}
          </button>
          {!isSelect && (
            <Link
              href={`/cars/${car?.id}`}
              className="bg-primary/10 hover:bg-primary/20 p-4 rounded-2xl transition-colors group/btn"
            >
              <Info />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
