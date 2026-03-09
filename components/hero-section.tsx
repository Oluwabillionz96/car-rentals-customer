import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-12 px-4 md:px-0">
      <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
        <p className="w-fit uppercase rounded-full text-primary text-[10px] md:text-xs font-bold tracking-widest bg-primary/10 px-4 py-1.5 mx-auto md:mx-0">
          Premium Service in Nigeria
        </p>
        <h1 className="text-4xl md:text-7xl font-black text-text-100 text-center md:text-left leading-[1.1]">
          Rent a Car in <span className="text-primary">Nigeria</span>
        </h1>
        <p className="text-lg md:text-xl text-text-200 text-center md:text-left max-w-xl mx-auto md:mx-0">
          Experience seamless mobility with Nigeria's most trusted fleet. Easy,
          professional, and reliable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link
            href="#"
            className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-primary/20"
          >
            <Search size={18} strokeWidth={3} />
            See Cars
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center gap-2 border-2 border-[#E2E8F0] text-text-200 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            How it works
          </Link>
        </div>
      </div>
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-auto md:flex-1 rounded-2xl overflow-hidden shadow-2xl">
        <Image src={"/hero-car.png"} alt="Premium car rental Nigeria" fill className="object-cover" priority />
      </div>
    </section>
  );
};

export default HeroSection;
