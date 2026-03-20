"use client";

import { Car } from "@/constants/cars";
import CarCard from "./car-card";
import EmptyState from "./empty-state";
import { CarFront } from "lucide-react";

interface CarGridProps {
  cars: Car[];
  loading: boolean;
  allCars: number;
  handleClearFilter: () => void;
}

const CarGrid = ({
  cars,
  loading,
  allCars,
  handleClearFilter,
}: CarGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse"
          >
            <div className="h-48 bg-gray-200 rounded-t-xl"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cars.length === 0 && allCars === 0) {
    return (
      <EmptyState
        title="No Vehicles Available"
        description="We're currently updating our fleet. Please check back later for more premium options."
        icon={CarFront}
        actionLabel="Refresh Fleet"
        onAction={() => window.location.reload()}
        className="py-20"
      />
    );
  }

  if (cars.length === 0 && allCars > 0) {
    return (
      <EmptyState
        title="No Vehicles Found"
        description="We couldn't find any vehicles matching your search."
        icon={CarFront}
        actionLabel="Clear Search"
        onAction={handleClearFilter}
        className="py-20"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          id={car.id}
          name={car.name}
          year={car.year}
          type={car.type}
          seats={car.seats}
          transmission={car.transmission}
          price={car.price}
          image={car.image}
        />
      ))}
    </div>
  );
};

export default CarGrid;
