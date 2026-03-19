"use client";

import { useParams, useRouter } from "next/navigation";
import { getCar } from "@/constants/cars";
import Image from "next/image";
import { ArrowLeft} from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import CarInfo from "@/components/car-info";
import DesktopBookingCard from "@/components/desktop-booking-card";
import NavigationMap from "@/components/navigation-map";
import EmptyState from "@/components/empty-state";
import { AlertCircle } from "lucide-react";

const CarDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isReadMore, setIsReadMore] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      if (index !== activeImage) {
        setActiveImage(index);
      }
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const car = getCar(id);

  if (!car) {
    return (
      <EmptyState
        title="Car Model Not Found"
        description={`We couldn't find the car model with ID: ${id}. It might have been recently removed from our fleet.`}
        icon={AlertCircle}
        actionLabel="View Other Cars"
        actionHref="/"
      />
    );
  }

  return (
    <div className="min-h-screen pb-32 lg:pb-20">
      {/* Desktop Breadcrumbs */}
      <NavigationMap
        routes={[
          { href: "/", label: "Home" },
          { href: "/our-cars", label: "Our Cars" },
          { href: `/cars/${car.id}`, label: car.name + " " + car.year },
        ]}
      />

      <div className="max-w-7xl mx-auto px-0 md:px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Images & Info */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Image Slider/Gallery */}
          <div className="relative group">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar md:rounded-3xl shadow-sm"
            >
              {[...(car.gallery.length > 0 ? car.gallery : [car.image])].map(
                (img, i) => (
                  <div
                    key={i}
                    className="relative aspect-16/10 min-w-full snap-center"
                  >
                    <Image
                      src={img}
                      alt={`${car.name} ${i}`}
                      fill
                      priority={i === 0}
                      className="object-cover"
                    />
                  </div>
                ),
              )}
            </div>

            {/* Mobile Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
              {(car.gallery.length > 0 ? car.gallery : [car.image]).map(
                (_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${activeImage === i ? "w-6 bg-white" : "w-2 bg-white/50"}`}
                  />
                ),
              )}
            </div>
          </div>

          {/* Desktop Gallery Thumbnails */}
          <div className="hidden md:grid grid-cols-4 gap-4 mt-6">
            {car.gallery.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => scrollToImage(i)}
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-xl border-t border-border-100 px-6 flex items-center justify-between z-50">
        <div>
          <p className="text-xs text-text-300 font-medium ">Total Price</p>
          <p className="text-text-100 text-lg font-bold">
            ₦{car.price.toLocaleString()}
            <span className="text-xs text-text-400 "> / day</span>
          </p>
        </div>
        <Link
          href={`/cars/${car.id}/booking`}
          className="bg-primary text-white px-5 h-14 rounded-xl font-bold text-base shadow-xl  flex items-center gap-2 active:scale-95 transition-all"
        >
          Book
          <ArrowLeft size={20} className="rotate-180" />
        </Link>
      </div>
    </div>
  );
};

export default CarDetailsPage;
