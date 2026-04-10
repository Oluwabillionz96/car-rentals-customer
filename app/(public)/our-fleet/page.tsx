import OurFleetPage from "@/components/our-fleet-page";
import { Suspense } from "react";

const OurFleet = () => {
  return (
    <Suspense fallback={null}>
      <OurFleetPage />
    </Suspense>
  );
};

export default OurFleet;
