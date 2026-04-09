"use client";

import { MOCK_CARS } from "@/constants/cars";
import useBookingStore from "@/store/booking-store";
import useGlobalStore from "@/store/global-store";
import { getAvailableQuantity } from "@/lib/utils";
import { useMemo, useRef, useState } from "react";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { bookings } = useBookingStore();
  const { tempSchedule } = useGlobalStore();

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
      // Check if fleet size > 0
      if (car.available <= 0) return false;

      // Calculate dynamic availability based on schedule
      const availableQty = getAvailableQuantity(car.id, tempSchedule, bookings);

      // Only show cars with available units
      return availableQty > 0;
    });
  }, [bookings, tempSchedule]);

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
