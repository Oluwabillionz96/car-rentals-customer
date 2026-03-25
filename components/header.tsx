"use client";
import { ArrowLeft, Menu, Share2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import MobileNavbar from "./mobile-navbar";
import { useState } from "react";

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
  const { id } = useParams();

  const isDetailsPage = pathname.startsWith("/cars");
  const isBooking = isDetailsPage && pathname.includes("/booking");
  const isPayment = isDetailsPage && pathname.includes("/payment");
  const isConfirmation = isDetailsPage && pathname.includes("/confirmation");
  const isBookingDetails = pathname.startsWith("/booking-details");
  const showBackIcon =
    isDetailsPage || pathname.startsWith("/how-it-works") || isBookingDetails;
  return (
    <header className="z-50 fixed bg-white/90 p-4  md:py-6 md:px-20 w-full top-0 left-0  shadow-sm backdrop-blur-md">
      <nav className=" flex justify-between   ">
        {showBackIcon && (
          <button
            onClick={() => {
              if (isConfirmation) {
                router.push("/");
                return;
              }
              if (isBooking) {
                router.push(`/cars/${id}`);
                return;
              }

              router.back();
            }}
            className={"lg:hidden"}
          >
            <ArrowLeft />
          </button>
        )}

        {(isDetailsPage || isBookingDetails) && (
          <p className="font-bold text-lg text-text-100 lg:hidden">
            {isBookingDetails
              ? "Booking Details"
              : isDetailsPage && (
                  <>
                    {isConfirmation
                      ? "Confirmation"
                      : isPayment
                        ? "Payment"
                        : isBooking
                          ? "Book Your Ride"
                          : "Car Details"}
                  </>
                )}
          </p>
        )}

        <Link
          href="/"
          className={`flex items-center gap-2 ${isDetailsPage || isBookingDetails ? "hidden lg:flex" : ""}`}
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
            {isDetailsPage ? (
              <> {!isBooking && !isPayment && !isConfirmation && <Share2 />}</>
            ) : (
              <>{isSidebarOpen ? <X /> : <Menu />}</>
            )}
          </button>
        </div>
      </nav>
      <MobileNavbar isNavOpen={isSidebarOpen} setNavOpen={setIsSidebarOpen} />
    </header>
  );
};

export default Header;
