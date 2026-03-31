"use client";
import Button from "@/components/button";
import EmptyState from "@/components/empty-state";
import ServiceCard from "@/components/service-card";
import { getCar } from "@/constants/cars";
import { services } from "@/lib/data/services";
import { AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Features = [
  {
    title: "Professional Etiquette",
    description:
      "Our chauffeurs are trained in formal etiquette, defensive driving, and local navigation to ensure you arrive safely and gracefully.",
  },
  {
    title: "Verified Fleet",
    description:
      "Every vehicle in our collection undergoes rigorous maintenance and a 50-point safety check before every booking.",
  },
  {
    title: "24/7 Concierge",
    description:
      "Our support team is always available to handle any adjustments to your schedule or specific requests during your rental period.",
  },
];

const FeaturesCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="space-y-4 border-2 border-border-100 p-4 rounded-2xl">
      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
        <CheckCircle2 size={24} />
      </div>
      <h4 className="text-xl font-bold text-text-100">{title}</h4>
      <p className="text-text-200">{description}</p>
    </div>
  );
};

const ServicesPage = () => {
  const queryParams = useSearchParams();
  const carId = queryParams.get("car");
  const isSelect =
    queryParams.get("select") === "true" && (carId ? carId?.length > 0 : false);

  const car = carId ? getCar(carId) : null;

  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (isSelect && !car) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Vehicle Not Found"
        description="We couldn't find the specific vehicle you're looking to book. Please choose a car from our fleet first."
        actionLabel="Explore Our Fleet"
        actionHref="/our-fleet"
      />
    );
  }
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-text-100 mb-6 tracking-tight">
            {isSelect ? (
              <>
                Choose Your <span className="text-primary">Service</span> Type
              </>
            ) : (
              <>
                Our Premium <span className="text-primary">Chauffeur</span>{" "}
                Services
              </>
            )}
          </h1>
          <p className=" md:text-lg text-text-200 max-w-2xl mx-auto mb-10">
            {isSelect
              ? "Please select the service that best matches your travel requirements to proceed with your booking."
              : "From luxury wedding convoys to seamless airport transfers, we provide professional chauffeur services tailored to your specific needs."}
          </p>

          {!isSelect && (
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/our-fleet"
                className="bg-primary text-white px-8 py-4 rounded-2xl w-full md:w-fit font-bold hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95"
              >
                Explore Our Fleet
              </Link>
              <Link
                href="/how-it-works"
                className="border-2 border-border-100 text-text-200 w-full md:w-fit px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
              >
                How it Works
              </Link>
            </div>
          )}
        </div>

        {/* Background Decorative Elements */}
        {/* <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10" /> */}
      </section>

      {/* Main Services Grid */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service) => {
            return (
              <ServiceCard
                key={service.id}
                service={service}
                isPage={true}
                isSelect={isSelect}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />
            );
          })}
        </div>
      </section>

      {isSelect ? (
        <div className="flex justify-center  mx-auto">
          <Button
            className="w-fit disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedService}
          >
            Continue <ChevronRight />
          </Button>
        </div>
      ) : (
        <>
          {" "}
          {/* Why Choose Our Services */}
          <section className="bg-slate-50 py-12 md:py-24 px-2 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-text-100 mb-4">
                  Why Our Services Stand Out
                </h2>
                <p className="text-text-200 max-w-xl mx-auto">
                  We go beyond just car rentals. We provide an experience built
                  on reliability, comfort, and professional service.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {Features.map((feature) => (
                  <FeaturesCard
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
          </section>
          {/* Final CTA */}
          <section className="">
            <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                  Ready to Experience Premium?
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                  Join thousands of satisfied clients who trust us for their
                  luxury transportation needs in Nigeria.
                </p>
                <Link
                  href="/our-fleet"
                  className="inline-block bg-white text-primary py-4 px-2 rounded-2xl font-black text-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                >
                  Browse Our Fleet
                </Link>
              </div>

              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ServicesPage;
