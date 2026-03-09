import BookingStatusCard from "@/components/booking-status-card";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <section className="min-h-screen bg-slate-50">
      <Header />

      <main className="pt-32 flex flex-col gap-10 md:px-20">
        <BookingStatusCard name="John" bookingDate="March 15" />
        <HeroSection />
      </main>
    </section>
  );
}
