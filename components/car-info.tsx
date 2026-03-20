import { GET_CAR_PROPS, getCar } from "@/constants/cars";
import { CheckCircle2, ChevronDown, MapPin } from "lucide-react";
import { ParamValue } from "next/dist/server/request/params";
import { Dispatch, SetStateAction } from "react";
import IconCard from "./icon-card";
import Link from "next/link";

const CarInfo = ({
  id,
  setIsReadMore,
  isReadMore,
}: {
  id: ParamValue;
  setIsReadMore: Dispatch<SetStateAction<boolean>>;
  isReadMore: boolean;
}) => {
  const car = getCar(id);
  return (
    <div className="px-6 md:p-0 space-y-6">
      <div className="justify-between flex items-start gap-2">
        <div className="flex-1">
          <div className="flex gap-2 flex-wrap lg:hidden">
            <p className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full">
              {car?.type}
            </p>
            <p className="bg-[#DCFCE7] text-[#166534] text-xs font-medium px-2 py-1 rounded-full">
              Available
            </p>
          </div>
        </div>
        <div className="lg:hidden text-right">
          <p className="text-primary text-xl font-bold">
            ₦{car?.price.toLocaleString()}
          </p>
          <p className="text-xs text-text-300 font-bold uppercase tracking-widest">
            Per Day
          </p>
        </div>
      </div>
      <div className="space-y-2 lg:hidden">
        <h1 className="text-2xl md:text-4xl font-bold text-text-100 truncate">
          {car?.name} {car?.year}
        </h1>
        <p className="text-text-300 text-sm ">
          Managed by Solution Car Rentals
        </p>
      </div>

      {/* Quick Specs Boxes */}
      <div className="grid grid-cols-2 lg:hidden gap-4">
        {GET_CAR_PROPS(car).map((spec, i) => (
          <IconCard key={i} text={spec.label ?? ""} icon={spec.icon} />
        ))}
      </div>

      {/* About Section */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-text-100 ">
          Description
        </h2>
        <div className="relative">
          <p
            className={`text-text-200 text-sm md:text-lg leading-relaxed  transition-all duration-300 ${!isReadMore && "line-clamp-4 md:line-clamp-5"}`}
          >
            {car?.description}
          </p>
          <button
            onClick={() => setIsReadMore(!isReadMore)}
            className="text-primary lg:hidden text-sm font-bold mt-2 flex items-center gap-1 hover:underline active:scale-95 transition-all"
          >
            {isReadMore ? "Read less" : "Read more"}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isReadMore ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Top Features */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-text-100">Top Features</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4">
          {car?.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-green-500" />
              <span className="text-text-200 font-bold text-sm tracking-tight">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pickup Location */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-bold text-text-100">Pickup Location</h2>
          <Link
            href={
              "https://www.google.com/maps?ll=5.020473,7.946645&z=14&t=m&hl=en&gl=NG&mapclient=embed&cid=2943027075063025104"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-sm font-bold hover:underline"
          >
            View map
          </Link>
        </div>
        <div className="w-full py-4 px-2 md:px-4 rounded-xl bg-neutral-100 border border-slate-100 flex items-center gap-4 transition-all hover:bg-white hover:shadow-md group">
          <div className="bg-primary/20 text-primary p-3 rounded-2xl group-hover:scale-110 transition-transform">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-text-100 font-semibold text-sm ">
              Solution Car rental Services
            </p>
            <p className="text-text-300 text-xs">Ewet Housing Estate, Uyo</p>
          </div>
        </div>
        {/* Map Placeholder */}
        <div className="block relative h-64 md:rounded-3xl rounded-xl overflow-hidden shadow-inner bg-slate-200">
          {/* <div className="absolute inset-0 flex items-center justify-center"> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7949.0530107938785!2d7.939429724739661!3d5.0179854185323105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d57dd42e2ce85%3A0x28d7bb882d7d0dd0!2sSolution%20Car%20Rental%20Services%20uyo!5e0!3m2!1sen!2sng!4v1774015313487!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
