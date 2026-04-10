"use client";

import { getCar } from "@/constants/cars";
import useGlobalStore from "@/store/global-store";
import useBookingStore from "@/store/booking-store";
import { getAvailableQuantity } from "@/lib/utils";
import { Users, Settings, Plus, Check, Info, Fuel } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookingDetails } from "@/lib/types";
import QuantitySelector from "./quantity-selector";

interface CarCardProps {
  id: string;
  isSelect?: boolean;
  selectType?: "single" | "multiple";
  isSelfDrive?: boolean;
}

export const VehicleCard = ({
  car,
  index,
  booking,
}: {
  car: BookingDetails["selectedCars"][number];
  index: number;
  booking: BookingDetails;
}) => {
  const timeQuery = booking.service.pricing === "hourly" ? "hour" : "day";
  const currentCar = getCar(car.carId);
  const unitPrice =
    timeQuery === "hour" ? currentCar?.pricePerHour : currentCar?.pricePerDay;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-2"
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
        <Image
          src={currentCar?.images[0] || ""}
          alt={currentCar?.name || ""}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-text-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
          Vehicle {index + 1}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-text-100">{currentCar?.name}</h3>
            <p className="text-text-400 text-xs font-medium uppercase tracking-wider">
              {currentCar?.category} • {currentCar?.transmission} • {currentCar?.seats}{" "}
              seats
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
            {booking.service.name}
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
            Quantity: {car.quantity}
          </span>
          <span className="bg-slate-100 text-text-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
            ₦{unitPrice?.toLocaleString() ?? 0} / {timeQuery}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const CarCard = ({ id, isSelect, selectType, isSelfDrive }: CarCardProps) => {
  const globalStore = useGlobalStore((state) => state);
  const { bookings } = useBookingStore();
  const car = getCar(id);
  const router = useRouter();

  // Check if car is selected and get quantity
  const selectedCar = globalStore.selectedCars.find((sc) => sc.carId === id);
  const isSelected = !!selectedCar;
  const currentQuantity = selectedCar?.quantity || 0;

  // Calculate available quantity
  const availableQty = getAvailableQuantity(
    id,
    globalStore.tempSchedule,
    bookings,
  );
  const showAvailability = isSelect && globalStore.tempSchedule;

  const handleQuantityChange = (newQuantity: number) => {
    globalStore.updateCarQuantity(id, newQuantity);
  };

  return (
    <div
      className={`${isSelected && isSelect ? "border-primary border-2" : ""} w-full cursor-pointer max-w-[400px] bg-white border border-neutral-100 rounded-lg md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full`}
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
        {/* Availability Badge */}
        {showAvailability && selectType === "multiple" && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            <span
              className={`${availableQty > 0 ? "text-green-600" : "text-red-600"} font-bold text-[10px] tracking-widest px-3 py-1`}
            >
              {availableQty > 0 ? `${availableQty} available` : "Not available"}
            </span>
          </div>
        )}
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
            <div className="flex gap-4 items-center">
              {/* Quantity Selector for Multiple Select */}
              {isSelect && selectType === "multiple" && (
                <QuantitySelector
                  quantity={currentQuantity}
                  max={availableQty}
                  onQuantityChange={handleQuantityChange}
                  disabled={availableQty === 0}
                />
              )}

              {/* Select/Book Button */}
              <button
                className="bg-primary/10 hover:bg-primary/20 p-4 rounded-2xl transition-colors group/btn"
                onClick={() => {
                  if (!isSelect) {
                    router.push(`/services?car=${car?.id}&select=true`);
                    return;
                  }
                  if (selectType === "single") {
                    if (isSelected) {
                      globalStore.removeCar(id);
                    } else {
                      globalStore.addCar(id, selectType);
                    }
                  } else {
                    // For multiple, just add one
                    if (currentQuantity === 0) {
                      globalStore.addCar(id, selectType ?? "multiple");
                    }
                  }
                }}
                disabled={isSelect && availableQty === 0}
              >
                <div className="relative flex">
                  {isSelect && isSelected ? (
                    <div className="flex items-center gap-2">
                      <p className="text-primary font-bold text-sm">Selected</p>
                      <Check size={20} className="text-primary" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-primary font-bold text-sm">
                        {isSelect ? "Select" : "Book"}
                      </p>
                      <Plus size={20} className="text-primary" />
                    </div>
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
        <div className="md:hidden mt-auto">
          {/* Quantity Selector for Multiple Select */}
          {isSelect && selectType === "multiple" && (
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-text-300">
                Quantity:
              </span>
              <QuantitySelector
                quantity={currentQuantity}
                max={availableQty}
                onQuantityChange={handleQuantityChange}
                disabled={availableQty === 0}
              />
            </div>
          )}

          <div className="flex gap-2">
            <button
              className={`w-full border-2 py-3 rounded-lg font-bold text-text-100 active:scale-[0.98] transition-all hover:bg-slate-50 text-sm text-center ${
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-border-100"
              }`}
              onClick={() => {
                if (!isSelect) {
                  router.push(`/services?car=${id}&select=true`);
                  return;
                }

                if (selectType === "single") {
                  if (isSelected) {
                    globalStore.removeCar(id);
                  } else {
                    globalStore.addCar(id, selectType);
                  }
                } else {
                  // For multiple, just add one
                  if (currentQuantity === 0) {
                    globalStore.addCar(id, selectType ?? "multiple");
                  }
                }
              }}
              disabled={isSelect && availableQty === 0}
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
    </div>
  );
};

export default CarCard;
