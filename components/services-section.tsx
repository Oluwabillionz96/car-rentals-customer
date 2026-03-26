import { BusFront, CalendarHeart, Plane, UserRound } from "lucide-react";
import ServiceCard from "./service-card";

const ServicesSection = () => {
    return (
      <section className="  py-10">
        <h2 className="text-lg md:text-3xl font-bold md:font-extrabold text-text-100">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {[
            {
              name: "Airport Transfers",
              icon: <Plane />,
              desc: "Reliable airport pickups and drop-offs with professional drivers.",
            },
            {
              name: "Weddings & Events",
              icon: <CalendarHeart />,
              desc: "Elegant vehicles for your special day.",
            },
            {
              name: "City Tours & Group Trips",
              icon: <BusFront />,
              desc: "Explore the city with our comfortable tour buses.",
            },
            {
              name: "Corporate & Executive Use",
              icon: <UserRound />,
              desc: "Professional transportation for business needs.",
            },
          ].map((service, index) => (
            <ServiceCard
              key={index}
              serviceName={service.name}
              serviceIcon={service.icon}
              serviceDescription={service.desc}
            />
          ))}
        </div>
      </section>
    );
};

export default ServicesSection;