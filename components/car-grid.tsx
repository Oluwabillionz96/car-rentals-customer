"use client";

import { MOCK_CARS } from "@/constants/cars";
import CarCard from "./car-card";
import EmptyState from "./empty-state";
import { CarFront } from "lucide-react";

const CarGrid = () => {
  if (MOCK_CARS.length === 0) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {MOCK_CARS.map((car) => (
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
