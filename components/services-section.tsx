import { ChevronRight } from "lucide-react";
import ServiceCard from "./service-card";
import { services } from "@/lib/data/services";
import Link from "next/link";
import SeeMoreButton from "./see-more-btn";

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
      <SeeMoreButton href="/services" content="See more services" />
    </section>
  );
};

export default ServicesSection;
