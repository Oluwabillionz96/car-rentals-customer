import {
  BusFront,
  CalendarHeart,
  CarFront,
  ChevronRight,
  Plane,
  Search,
  UserRound,
} from "lucide-react";
import ServiceCard from "./service-card";
import { services } from "@/lib/data/services";
import { Icon } from "@/lib/utils";
import Link from "next/link";

const ServicesSection = () => {
  return (
    <section className="  py-10">
      <h2 className="text-lg md:text-3xl font-bold md:font-extrabold text-text-100">
        Our Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {services.slice(0, 3).map((service) => {
          return (
            <ServiceCard key={service.id} service={service} isPage={false} />
          );
        })}
      </div>
      <Link
        href="/services"
        className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl w-fit font-bold text-xl transition-all active:scale-[0.98] mx-auto mt-6 shadow-lg"
      >
        See more services
        <ChevronRight size={26} strokeWidth={2.5} />
      </Link>
    </section>
  );
};

export default ServicesSection;
