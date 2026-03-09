import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="flex gap-12">
      <div className="w-1/2 space-y-4">
        <p className="w-fit uppercase rounded-full text-primary text-xs font-bold tracking-widest bg-primary/10 px-4 py-1.5">
          Premium Service in Nigeria
        </p>
        <h1 className="text-7xl font-black text-text-100">
          Rent a Car in <span className="text-primary">Nigeria</span>
        </h1>
        <p className="text-xl text-text-200">
          Experience seamless mobility with Nigeria's most trusted fleet. Easy,
          professional, and reliable.
        </p>
        <div className="flex gap-4">
          <Link
            href="#"
            className="flex items-center w-full justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium text-sm transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
          >
            <Search size={18} />
            See Cars
          </Link>
          <Link
            href="#"
            className="flex items-center w-full justify-center gap-2 border-2 border-[#E2E8F0] text-[#334155] px-6 py-3 rounded-xl font-medium text-sm transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
          >
            How it works
          </Link>
        </div>
      </div>
      <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl">
        <Image src={"/hero-car.png"} alt="" fill className="object-cover" />
      </div>
    </section>
  );
};

export default HeroSection;
