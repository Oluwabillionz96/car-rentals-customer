const ServiceCard = ({
  serviceName,
  serviceDescription,
  serviceIcon,
}: {
  serviceName: string;
  serviceDescription: string;
  serviceIcon: React.ReactNode;
}) => {
  return (
    <article className="group relative p-6 bg-white rounded-2xl border border-border-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 flex flex-col items-start gap-4 h-full">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        <span className="[&>svg]:w-7 [&>svg]:h-7 transition-all duration-300 group-hover:scale-110">
          {serviceIcon}
        </span>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-text-100 group-hover:text-primary transition-colors duration-300">
          {serviceName}
        </h3>
        <p className="text-sm leading-relaxed text-text-200/90">
          {serviceDescription}
        </p>
      </div>

      {/* <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      </div> */}
    </article>
  );
};

export default ServiceCard;

