import ServicesPage from "@/components/services-page";
import { Suspense } from "react";


const Services = () => {
  return (
    <Suspense fallback={null}>
      <ServicesPage />
    </Suspense>
  );
};

export default Services;
