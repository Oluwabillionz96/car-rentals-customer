"use client";

import { getCar } from "@/constants/cars";
import useGlobalStore from "@/store/global-store";
import { Users, Settings, ShoppingCart, Plus, Check } from "lucide-react";
import Image from "next/image";

interface CarCardProps {
  id: string;
  isSelect?: boolean;
  selectType?: "single" | "multiple";
}

const CarCard = ({ id, isSelect, selectType }: CarCardProps) => {
  const globalStore = useGlobalStore((state) => state);
  const car = getCar(id);
  const isSelected = globalStore.selectedCarsId.includes(id);
  return (
    <div
      className={`${isSelected ? "border-primary border-2" : ""} w-full cursor-pointer max-w-[400px] bg-white border border-neutral-100 rounded-lg md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full`}
      onClick={() => {
        if (!isSelect) return;

        if (isSelected) {
          globalStore.removeCar(id);
          return;
        }
        globalStore.addCar(id, selectType ?? "single");
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={car?.image ?? ""}
          alt={`${car?.name} ${car?.year}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
          <span className="text-primary font-bold text-[10px] tracking-widest px-3 py-1">
            {car?.type}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-1">
        {/* Header - Desktop & Mobile Divergence */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg md:text-xl font-bold text-text-100">
            {car?.name} {car?.year}
          </h3>
          {/* Mobile Only Price */}
          <div className="md:hidden flex flex-col items-end">
            <span className="text-primary text-lg font-bold">
              ₦{car?.price.toLocaleString()}
            </span>
            <span className="text-text-400 text-xs font-bold uppercase tracking-wider">
              Per Day
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
            <span className="text-xs md:text-sm">
              {car?.transmission === "Automatic" ? "Auto" : car?.transmission}
            </span>
          </div>
        </div>

        {/* Desktop View Bottom Section */}
        <div className="hidden md:block">
          <div className="h-px bg-slate-100 w-full mb-6" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-text-400 text-xs font-bold uppercase tracking-widest mb-1">
                Per Day
              </span>
              <span className="text-text-100 text-xl font-black">
                ₦{car?.price.toLocaleString()}
              </span>
            </div>
            <div className="bg-primary/10 hover:bg-primary/20 p-4 rounded-2xl transition-colors group/btn">
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
            </div>
          </div>
        </div>

        {/* Mobile View Button */}
        <div className="md:hidden mt-auto">
          <div
            className={`w-full border-2 py-3 rounded-lg font-bold text-text-100 active:scale-[0.98] transition-all hover:bg-slate-50 text-sm text-center ${
              isSelected
                ? "border-primary bg-primary text-white"
                : "border-border-100"
            }`}
          >
            {isSelect ? (isSelected ? "Selected" : "Select Car") : "Book Now"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
