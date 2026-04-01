"use client";

import useGlobalStore from "@/store/global-store";
import { ArrowRight } from "lucide-react";

const SelectionBar = ({
  selectType,
  selectedCars,
  handleBooking,
  isModify,
}: {
  selectType: "single" | "multiple";
  handleBooking: () => void;
  selectedCars: number;
  isModify?: boolean;
}) => {
  const { clearCars } = useGlobalStore();

  if (selectedCars === 0) return null;

  return (
    <div className="z-60 fixed bg-white/95 p-4 md:py-6 md:px-20 w-full bottom-0 left-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-xl border-t border-slate-100 animate-in slide-in-from-bottom-full duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {selectType === "multiple" ? (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20">
              {selectedCars}
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-text-100 text-sm md:text-lg leading-tight uppercase tracking-tight">
                {selectedCars} {selectedCars ? "Cars" : "Car"} Selected
              </p>

              <button
                onClick={clearCars}
                className="text-text-400 text-[10px] md:text-sm font-bold text-left hover:text-primary transition-colors underline decoration-slate-200"
              >
                Clear Selection
              </button>
            </div>
          </div>
        ) : (
          <p className="font-bold text-text-100 text-sm md:text-lg leading-tight uppercase tracking-tight">
            {selectedCars} {selectedCars > 1 ? "Cars" : "Car"} Selected
          </p>
        )}

        {/* Next Step Action */}
        <div
          className={`flex items-center gap-3 ${selectType === "single" ? "w-full justify-end" : ""}`}
        >
          <button
            className="flex items-center gap-2 px-8 md:px-12 py-3.5 md:py-4 rounded-xl bg-primary text-white font-black text-sm md:text-base shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
            onClick={handleBooking}
          >
            <span>
              {selectType === "single" ? (
                !isModify ? (
                  "Book Now"
                ) : (
                  <span>
                    Contiue <span className="hidden md:inline">Booking</span>
                  </span>
                )
              ) : (
                "Next"
              )}
            </span>
            <ArrowRight
              size={18}
              className={`${selectType === "multiple" ? "hidden sm:inline-block" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Safe Area Support for iOS and Android notches */}
      <div className="h-[env(safe-area-inset-bottom,0px)] bg-transparent md:hidden" />
    </div>
  );
};

export default SelectionBar;
