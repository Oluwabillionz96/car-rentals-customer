import AvailableCars from "@/components/available-cars";
import BookingStatusCard from "@/components/booking-status-card";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";

export default function Home() {
  return (
    <>
      <BookingStatusCard />
      <HeroSection />
      <ServicesSection />
      <AvailableCars />
    </>
  );
}
