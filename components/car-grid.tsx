import { MOCK_CARS } from "@/constants/cars";
import CarCard from "./car-card";

const CarGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {MOCK_CARS.map((car) => (
        <CarCard
          key={car.id}
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

export default CarGrid
