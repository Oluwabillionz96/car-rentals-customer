import {
  BusFront,
  CalendarHeart,
  CarFront,
  Plane,
  UserRound,
} from "lucide-react";
import ServiceCard from "./service-card";
import { services } from "@/lib/data/services";
const Icon = {
  wedding: CalendarHeart,
  executive: UserRound,
  airport_transfers: Plane,
  city_tours: CarFront,
  group_trips: BusFront,
  self_drive: UserRound,
};
const ServicesSection = () => {
  return (
    <section className="  py-10">
      <h2 className="text-lg md:text-3xl font-bold md:font-extrabold text-text-100">
        Our Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {services.map((service, index) => {
          const ServiceIcon = Icon[service.id];
          return (
            <ServiceCard
              key={index}
              serviceName={service.name}
              serviceDescription={service.description}
              serviceIcon={<ServiceIcon />}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
