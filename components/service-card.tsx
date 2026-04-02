"use client";

import { CheckCircle2, ChevronRight } from "lucide-react";
import { Service } from "@/lib/types";
import { Icon } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

const ServiceCard = ({
  service,
  isPage,
  isSelect,
  selectedService,
  setSelectedService,
  onBookNow,
}: {
  service: Service;
  isPage?: boolean;
  isSelect?: boolean;
  selectedService?: string | null;
  setSelectedService?: Dispatch<SetStateAction<string | null>>;
  onBookNow?: (service: Service) => void;
}) => {
  const ServiceIcon = Icon[service.id as keyof typeof Icon] || Icon.corporate_and_executive_use;
  const isSelected = selectedService === service.id;
  return (
    <article
      className={`group p-8 bg-white  ${isSelected ? "border-primary border-2" : "border-border-100 border"}  ${isSelect ? "cursor-pointer" : ""} rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between`}
      onClick={() => {
        if (!isSelect || !setSelectedService) return;

        if (isSelected) {
          setSelectedService(null);
        } else {
          setSelectedService(service.id);
        }
      }}
    >
      <div>
        <div className="flex justify-between">
          <div
            className={`w-16 h-16 rounded-2xl ${isSelected ? "bg-primary text-white" : "bg-primary/10 text-primary"} flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300`}
          >
            <ServiceIcon size={32} />
          </div>
          {isSelected && (
            <CheckCircle2 size={32} fill="#4fbff8" className="text-white" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-text-100 mb-3 group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        <p className="text-text-200 leading-relaxed mb-6">
          {service.description}
        </p>

        {isPage && (
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm text-text-300">
              <CheckCircle2 size={16} className="text-green-500" />
              {service.hasChauffeur
                ? "Professional Chauffeur included"
                : "Available for Self-Drive"}
            </li>
            <li className="flex items-center gap-2 text-sm text-text-300">
              <CheckCircle2 size={16} className="text-green-500" />
              {service.pricing === "hourly"
                ? "Flexible Hourly Rates"
                : "Standard Daily Rates"}
            </li>
            {service.minHours && (
              <li className="flex items-center gap-2 text-sm text-text-300">
                <CheckCircle2 size={16} className="text-green-500" />
                Minimum {service.minHours} hours booking
              </li>
            )}
          </ul>
        )}
      </div>

      {!isSelect && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookNow?.(service);
          }}
          className="inline-flex items-center gap-2 font-bold text-primary group/link text-left w-fit"
        >
          Book this Service
          <ChevronRight
            size={20}
            className="group-hover/link:translate-x-1 transition-transform"
          />
        </button>
      )}
    </article>
  );
};

export default ServiceCard;
