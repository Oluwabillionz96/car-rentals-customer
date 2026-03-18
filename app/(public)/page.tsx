import AvailableCars from "@/components/available-cars";
import BookingStatusCard from "@/components/booking-status-card";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <>
      <BookingStatusCard />
      <HeroSection />
      <AvailableCars />
    </>
  );
}
