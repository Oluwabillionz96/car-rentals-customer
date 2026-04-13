"use client";
import { ArrowLeft, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import MobileNavbar from "./mobile-navbar";
import { useState } from "react";

export const navLinks = [
  { name: "Home", pathname: "/" },
  { name: "Services", pathname: "/services" },
  { name: "Fleet", pathname: "/our-fleet" },
  { name: "How It Works", pathname: "/how-it-works" },
  { name: "Find My Booking", pathname: "/find-my-booking" },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const queryParams = useSearchParams();
  const isDetailsPage = pathname.startsWith("/cars");
  const showBackIcon =
    pathname !== "/" && !pathname.startsWith("/booking-details");
  const bookingId = queryParams.get("booking");
  return (
    <header className="z-50 fixed bg-white/90 p-4  md:py-6 md:px-20 w-full top-0 left-0  shadow-sm backdrop-blur-md">
      <nav className=" flex justify-between   ">
        {showBackIcon && (
          <button
            onClick={() => {
              if (pathname.startsWith("/services")) {
                router.push("/");
              }

              if (pathname.startsWith("/our-fleet")) {
                if (bookingId) {
                  return router.push(`/booking/${bookingId}`);
                } else {
                  return router.back();
                }
              }
              return router.back();
            }}
            className={"lg:hidden"}
          >
            <ArrowLeft />
          </button>
        )}

        {isDetailsPage && (
          <p className="font-bold text-lg text-text-100 lg:hidden">
            Car Details
          </p>
        )}

        <Link
          href="/"
          className={`flex items-center gap-2 ${isDetailsPage ? "hidden lg:flex" : ""}`}
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
              className={`uppercase hidden lg:block font-medium hover:text-primary transition-colors ${pathname === item.pathname ? "text-primary underline" : ""}`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={
              isDetailsPage ? () => {} : () => setIsSidebarOpen(!isSidebarOpen)
            }
            className="lg:hidden"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      <MobileNavbar isNavOpen={isSidebarOpen} setNavOpen={setIsSidebarOpen} />
    </header>
  );
};

export default Header;
