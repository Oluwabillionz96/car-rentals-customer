import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="bg-white/90 p-4 md:py-6 md:px-20 fixed w-full top-0 left-0 flex justify-between z-50 shadow-sm backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={25} height={25} />
          <p className="text-text-100 font-bold text-sm md:font-extrabold md:text-xl">
            Solution <span className="hidden md:inline">Car Rentals</span>
          </p>
        </Link>
        <div className="md:flex gap-10 hidden text-text-200">
          <Link
            href={"#"}
            className="uppercase font-medium hover:text-[#38BDF8] transition-colors"
          >
            Our Cars
          </Link>
          <Link
            href={"#"}
            className="uppercase font-medium hover:text-[#38BDF8] transition-colors"
          >
            Find my Booking
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
