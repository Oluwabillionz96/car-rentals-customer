import { BookingDetails } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BookingCardLeft = ({
  allImages,
  booking,
}: {
  allImages: string[];
  booking: BookingDetails;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length,
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const router = useRouter();
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-2">
        <div className="relative aspect-video rounded-2xl overflow-hidden group touch-pan-y">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;

                if (swipe) {
                  if (offset.x > 0) {
                    prevImage();
                  } else {
                    nextImage();
                  }
                }
              }}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            >
              <Image
                src={allImages[currentImageIndex]}
                alt="Car Preview"
                fill
                className="object-cover pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>

          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="z-10 absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-text-100 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="z-10 absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-text-100 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="z-10 absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-text-100">
                {booking.selectedCars.length > 1
                  ? `${booking.selectedCars.length} Vehicles Selection`
                  : booking.selectedCars[0].name}
              </h2>
              <p className="text-text-200 text-sm italic">
                {booking.selectedCars.map((c) => c.name).join(", ")}
              </p>
            </div>
            <button
              onClick={() =>
                router.push(
                  `/our-fleet?service=${booking.service.id}&select=true&selectType=${booking.service.selectType}&booking=${booking.bookingId}`,
                )
              }
              className="text-primary text-sm font-bold underline hover:no-underline"
            >
              Modify
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
              {booking.service.name}
            </span>
            <span className="bg-slate-100 text-text-300 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
              {booking.service.pricing} basis
            </span>
          </div>
        </div>
      </div>

      {/* Price Summary Miniature */}
      <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
        <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
          <CreditCard size={18} />
          Estimated Total
        </h3>
        <div className="flex justify-between items-end">
          <p className="text-text-300 text-sm">
            Amount will be finalized based on your schedule
          </p>
          <p className="text-3xl font-black text-primary">
            ₦...
            <span className="text-sm font-normal text-text-200 ml-1">
              / TBD
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingCardLeft;
