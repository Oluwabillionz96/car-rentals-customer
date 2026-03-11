"use client";
import { ArrowLeft, Menu, Share2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MobileNavbar from "./mobile-navbar";
import { useEffect, useState } from "react";

export const navLinks = [
  { name: "Home", pathname: "/" },
  { name: "Our Cars", pathname: "/our-cars" },
  { name: "How It Works", pathname: "/how-it-works" },
  { name: "Find My Booking", pathname: "/find-my-booking" },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const isDetailsPage = pathname.startsWith("/cars");
  const isBooking = isDetailsPage && pathname.includes("/booking");

  return (
    <header className="z-50 fixed bg-white/90 p-4  md:py-6 md:px-20 w-full top-0 left-0  shadow-sm backdrop-blur-md">
      <nav className=" flex justify-between   ">
        {pathname !== "/" && (
          <button
            onClick={() => {
              router.back();
            }}
            className={"md:hidden"}
          >
            <ArrowLeft />
          </button>
        )}

        <p className="font-bold text-lg text-text-100 lg:hidden">
          {isBooking ? "Book Your Ride" : "Car Details"}
        </p>

        <Link
          href="/"
          className={`flex items-center gap-2 ${isDetailsPage ? "hidden md:flex" : ""}`}
        >
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
          <button
            onClick={
              isDetailsPage && !isBooking
                ? () => {}
                : () => setIsSidebarOpen(!isSidebarOpen)
            }
            className="md:hidden"
          >
            {isDetailsPage && !isBooking ? (
              <Share2 />
            ) : (
              <>{isSidebarOpen ? <X /> : <Menu />}</>
            )}
          </button>
        </div>
      </nav>
      <MobileNavbar isNavOpen={isSidebarOpen} />
    </header>
  );
};

export default Header;
