import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Service } from "@/lib/types";
import { Icon } from "@/lib/utils";

const ServiceCard = ({
  service,
  isPage,
}: {
  service: Service;
  isPage: boolean;
}) => {
  const ServiceIcon = Icon[service.id as keyof typeof Icon] || Icon.executive;
  return (
    <article className="group p-8 bg-white border border-border-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between">
      <div>
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <ServiceIcon size={32} />
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

      <Link
        href={`/our-fleet?service=${service.id}&select=true&selectType=${service.selectType}`}
        className="inline-flex items-center gap-2 font-bold text-primary group/link"
      >
        Book this Service
        <ChevronRight
          size={20}
          className="group-hover/link:translate-x-1 transition-transform"
        />
      </Link>
    </article>
  );
};

export default ServiceCard;
