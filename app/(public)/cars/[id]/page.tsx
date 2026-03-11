"use client";

import { useParams, useRouter } from "next/navigation";
import { MOCK_CARS } from "@/constants/cars";
import Image from "next/image";
import {
  ArrowLeft,
  Share2,
  Heart,
  Users,
  Settings,
  Fuel,
  CheckCircle2,
  MapPin,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import CarInfo from "@/components/car-info";
import DesktopBookingCard from "@/components/desktop-booking-card";

const CarDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isReadMore, setIsReadMore] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const car = MOCK_CARS.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold text-text-100">Car not found</h2>
        <button
          onClick={() => router.back()}
          className="bg-primary text-white px-6 py-2 rounded-xl font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32 md:pb-20">
      {/* Desktop Breadcrumbs */}
      <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 mb-8 max-w-7xl mx-auto px-4">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link href="/our-cars" className="hover:text-primary transition-colors">
          Rentals
        </Link>
        <ChevronRight size={14} />
        <span className="text-text-100 font-medium">
          {car.name} {car.year}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-0 md:px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Images & Info */}
        <div className="md:col-span-8 space-y-8">
          {/* Main Image Slider/Gallery */}
          <div className="relative group">
            <div className="relative aspect-16/10 md:rounded-3xl overflow-hidden shadow-sm">
              <Image
                src={car.gallery[activeImage] || car.image}
                alt={car.name}
                fill
                className="object-cover"
              />
              {/* Mobile Heart Button */}
              {/* <button className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-lg md:hidden">
                <Heart
                  size={20}
                  className="text-slate-400 group-hover:text-red-500 transition-colors"
                />
              </button> */}

              {/* Mobile Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
                {car.gallery.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${activeImage === i ? "w-6 bg-white" : "w-2 bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Gallery Thumbnails */}
            <div className="hidden md:grid grid-cols-4 gap-4 mt-6">
              {car.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-video rounded-2xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-primary ring-4 ring-primary/10" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <Image
                    src={img}
                    alt={`${car.name} ${i}`}
                    fill
                    className="object-cover"
                  />
                  {i === 3 && car.gallery.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold">
                        +{car.gallery.length - 4}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Car Header Info */}
          <CarInfo
            id={id}
            isReadMore={isReadMore}
            setIsReadMore={setIsReadMore}
          />
        </div>

        {/* Right Column: Desktop Booking Sidebar */}
        <DesktopBookingCard car={car} />
      </div>

      {/* Mobile Floating Bottom Bar */}
      <div className="md:hidden fixed  bottom-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-xl border-t border-border-100 px-6 flex items-center justify-between z-50">
        <div>
          <p className="text-xs text-text-300 font-medium ">Total Price</p>
          <p className="text-text-100 text-lg font-bold">
            ₦{car.price.toLocaleString()}
            <span className="text-xs text-text-400 "> / day</span>
          </p>
        </div>
        <button className="bg-primary text-white px-5 h-14 rounded-xl font-bold text-base shadow-xl  flex items-center gap-2 active:scale-95 transition-all">
          Book
          <ArrowLeft size={20} className="rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default CarDetailsPage;
