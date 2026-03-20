"use client";

import { MOCK_CARS } from "@/constants/cars";
import { useMemo, useRef, useState } from "react";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const filteredCars = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return MOCK_CARS;

    return MOCK_CARS.filter(
      (car) =>
        car.name.toLowerCase().includes(query) ||
        car.type.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return {
    filteredCars,
    setSearchQuery: handleSearch,
    loading,
    searchQuery,
    allCars: MOCK_CARS.length,
  };
};

export default useSearch;
