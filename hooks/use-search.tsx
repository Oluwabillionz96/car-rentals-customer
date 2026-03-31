"use client";

import { MOCK_CARS } from "@/constants/cars";
import useBookingStore from "@/store/booking-store";
import { useMemo, useRef, useState } from "react";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const bookings = useBookingStore((state) => state.verifiedBooking);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const cars = useMemo(() => {
    return MOCK_CARS.filter((car) => {
      return !bookings?.some((booking) => booking.carId === car.id);
    });
  }, [bookings]);

  const filteredCars = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return cars;

    return cars.filter(
      (car) =>
        car.name.toLowerCase().includes(query) ||
        car.category.toLowerCase().includes(query),
    );
  }, [searchQuery, cars]);

  return {
    filteredCars,
    setSearchQuery: handleSearch,
    loading,
    searchQuery,
    allCars: cars.length,
  };
};

export default useSearch;
