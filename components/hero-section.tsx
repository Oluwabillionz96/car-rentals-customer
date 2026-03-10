import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      {/* Mobile Hero View */}
      <div className="md:hidden relative w-full h-[450px] sm:h-[500px] rounded-4xl overflow-hidden px-6 pb-8 flex flex-col justify-end shadow-xl">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_QK0kx2BslWSdWDHAwtXOmMUrWPXeUeQlEyBZvmEVOSaEe_uT3SUTDoU9QM3mx4GmIBCH1A7md6y7WNUAlGQVzAWPrzPtTmokRW1HNYo4yAA4E9yCJIkO4HJaXo8kbDnhcthG2uDHozh5TVQZyfhy5YW4zbCPyoDNMVTyZhgiU3_vlpHKM9iCt0ajtX460j2ergWq5CEbu_jMmgHnvCQiHpEvOfpNrZ8EFlrqimbSGftMrOGy-DUYoXD8kyYeZMvWu4r5fLtILg"
          alt="Rent a car in  Nigeria"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        <div className="relative  space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white leading-[1.1] tracking-tight">
              Rent a car in Nigeria
            </h1>
            <p className="text-white/90 text-lg leading-relaxed max-w-[280px]">
              Easy, professional, and trustworthy car rentals.
            </p>
          </div>

          <Link
            href="/our-cars"
            className="flex items-center justify-center gap-2 bg-[#59C1F5] text-[#0F172A] py-5 rounded-2xl w-full font-bold text-xl transition-all active:scale-[0.98] shadow-lg"
          >
            Find Your Car
            <Search size={26} strokeWidth={2.5} />
          </Link>
          <Link
            href="/how-it-works"
            className="flex items-center justify-center gap-2  border-2 border-border-100 text-white py-5 rounded-2xl w-full font-bold text-xl transition-all active:scale-[0.98] shadow-lg"
          >
            How It works
          </Link>
        </div>
      </div>

      {/* Desktop Hero View */}
      <section className="hidden md:flex flex-row gap-12 px-0">
        <div className="w-1/2 space-y-6">
          <p className="w-fit uppercase rounded-full text-primary text-xs font-bold tracking-widest bg-primary/10 px-4 py-1.5">
            Premium Service in Nigeria
          </p>
          <h1 className="text-7xl font-black text-text-100 leading-[1.1]">
            Rent a Car in <span className="text-primary">Nigeria</span>
          </h1>
          <p className="text-xl text-text-200 max-w-xl">
            Experience seamless mobility with Nigeria's most trusted fleet.
            Easy, professional, and reliable.
          </p>
          <div className="flex flex-row gap-4 pt-2">
            <Link
              href="/our-cars"
              className="flex items-center justify-center font-sans gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-primary/20"
            >
              <Search size={18} strokeWidth={3} />
              Our Cars
            </Link>
            <Link
              href="/how-it-works"
              className="flex items-center justify-center font-sans gap-2 border-2 border-border-100 text-text-200 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              How it works
            </Link>
          </div>
        </div>
        <div className="relative flex-1 rounded-4xl overflow-hidden shadow-2xl">
          <Image
            src={
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCE-I2RHlo_mOiI7LPw9Q1MktVBcFnv8ltmHQJQkHgWz7DrQm7oj-AFY4EJ1bLfGsOp-U0YcmKF2gVJUpWbAirV9LRiLrGLH6eWFEpDwV-nIc1ughKkI19k6I3-or2rqyWsmW679UE5E2DZZHiOfHdxAcpW2WEFpRkx-tOQ63aEpfG_iL7eAWqG3_gHKmyjKoszTzz2dGnH6smUV_aNpVMcV7hnJvIaFz_ksmaMUJ6DgkZQWcic-OedlSJBh-owRCWSIBZoLWmGKg"
            }
            alt="Premium car rental Nigeria"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
