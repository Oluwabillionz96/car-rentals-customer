import { BookingDetails } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BookingCardLeft = ({
  booking,
}: {
  booking: BookingDetails;
}) => {
  const router = useRouter();
  const timeQuery = booking.service.pricing === "hourly" ? "hour" : "days";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xl font-bold text-text-100">Selected Vehicles</h3>
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
      <div className="space-y-4">
        {booking.selectedCars.map((car, index) => (
          <div 
            key={car.id + index}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-2"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden group touch-pan-y shadow-inner bg-slate-100">
               <Image
                  src={car.images[0]}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-text-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                  Vehicle {index + 1}
                </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-text-100">
                    {car.name}
                  </h2>
                  <p className="text-text-400 text-xs font-medium uppercase tracking-wider">
                    {car.category} • {car.transmission}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {booking.service.name}
                </span>
                <span className="bg-slate-100 text-text-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  ₦{car[timeQuery === "hour" ? "pricePerHour" : "pricePerDay"].toLocaleString()} / {timeQuery}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCardLeft;
