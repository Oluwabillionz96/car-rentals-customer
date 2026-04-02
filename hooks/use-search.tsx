"use client";

import { MOCK_CARS } from "@/constants/cars";
import useBookingStore from "@/store/booking-store";
import useGlobalStore from "@/store/global-store";
import { isScheduleOverlapping } from "@/lib/utils";
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
      // First, check basic availability flag
      if (!car.available) return false;

      // If we have a schedule chosen, filter surgically by overlap
      if (tempSchedule) {
        const isCarUnavailable = bookings?.some((existingReservation) => {
          const isCarBeingUsed = existingReservation.selectedCars.some(
            (reservedCar) => reservedCar.id === car.id,
          );
          const isBusy =
            existingReservation.status === "confirmed" ||
            existingReservation.status === "ongoing";
          const doesTimeConflict =
            existingReservation.schedule &&
            isScheduleOverlapping(tempSchedule, existingReservation.schedule);

          return isCarBeingUsed && isBusy && doesTimeConflict;
        });

        return !isCarUnavailable;
      }

      // If no schedule chosen (browsing), show everything that is marked available
      return true;
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
