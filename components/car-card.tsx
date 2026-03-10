"use client";

import { Users, Settings, ShoppingCart, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CarCardProps {
  id: string;
  name: string;
  year: number;
  type: string;
  seats: number;
  transmission: string;
  price: number;
  image?: string;
}

const CarCard = ({
  id,
  name = "Toyota Camry",
  year = 2022,
  type = "SEDAN",
  seats = 5,
  transmission = "Automatic",
  price = 25000,
  image = "https://lh3.googleusercontent.com/aida-public/AB6AXuCE-I2RHlo_mOiI7LPw9Q1MktVBcFnv8ltmHQJQkHgWz7DrQm7oj-AFY4EJ1bLfGsOp-U0YcmKF2gVJUpWbAirV9LRiLrGLH6eWFEpDwV-nIc1ughKkI19k6I3-or2rqyWsmW679UE5E2DZZHiOfHdxAcpW2WEFpRkx-tOQ63aEpfG_iL7eAWqG3_gHKmyjKoszTzz2dGnH6smUV_aNpVMcV7hnJvIaFz_ksmaMUJ6DgkZQWcic-OedlSJBh-owRCWSIBZoLWmGKg",
}: CarCardProps) => {
  return (
    <Link
      href={`/cars/${id}`}
      className="block h-full transition-transform active:scale-[0.98]"
    >
      <div className="w-full cursor-pointer max-w-[400px] bg-white border border-[#F1F5F9] rounded-lg md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-4/3 w-full overflow-hidden">
          <Image
            src={image}
            alt={`${name} ${year}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            <span className="text-primary font-bold text-[10px] tracking-widest px-3 py-1">
              {type}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col flex-1">
          {/* Header - Desktop & Mobile Divergence */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg md:text-xl font-bold text-text-100">
              {name} {year}
            </h3>
            {/* Mobile Only Price */}
            <div className="md:hidden flex flex-col items-end">
              <span className="text-primary text-lg font-bold">
                ₦{price.toLocaleString()}
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
              <span className="text-xs md:text-sm">{seats} Seats</span>
            </div>
            <div className="flex items-center gap-2 md:font-semibold text-slate-500">
              <Settings size={18} className="text-slate-400" />
              <span className="text-xs md:text-sm">
                {transmission === "Automatic" ? "Auto" : transmission}
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
                  ₦{price.toLocaleString()}
                </span>
              </div>
              <div className="bg-primary/10 hover:bg-primary/20 p-4 rounded-2xl transition-colors group/btn">
                <div className="relative flex">
                  <ShoppingCart size={20} className="text-primary" />
                  <Plus
                    size={10}
                    className="absolute -top-1 -right-1 text-primary stroke-3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View Button */}
          <div className="md:hidden mt-auto">
            <div className="w-full border-2 border-border-100 py-3 rounded-lg font-bold text-text-100 active:scale-[0.98] transition-all hover:bg-slate-50 text-sm text-center">
              Book Now
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
