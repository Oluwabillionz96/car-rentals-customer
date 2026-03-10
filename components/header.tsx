"use client";
import { ArrowLeft, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", pathname: "/" },
  { name: "Our Cars", pathname: "/our-cars" },
  { name: "How It Works", pathname: "/how-it-works" },
  { name: "Find My Booking", pathname: "/find-my-booking" },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header>
      <nav className="bg-white/90 p-4 md:py-6 md:px-20 fixed w-full top-0 left-0 flex justify-between z-50 shadow-sm backdrop-blur-md">
        {pathname !== "/" && (
          <button
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft />
          </button>
        )}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={25} height={25} />
          <p className="text-text-100 font-bold text-sm md:font-extrabold md:text-xl">
            Solution <span className="hidden md:inline">Car Rentals</span>
          </p>
        </Link>
        <div className="flex gap-10 text-text-200">
          {navLinks.map((item) => (
            <Link
              href={item.pathname}
              key={item.pathname}
              className={`uppercase hidden md:block font-medium hover:text-primary transition-colors ${pathname === item.pathname ? "text-primary underline" : ""}`}
            >
              {item.name}
            </Link>
          ))}
          <button>
            <Menu />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
