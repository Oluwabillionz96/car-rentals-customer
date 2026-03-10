export interface Car {
  id: string;
  name: string;
  year: number;
  type: string;
  seats: number;
  transmission: string;
  price: number;
  image: string;
}

export const MOCK_CARS: Car[] = [
  {
    id: "1",
    name: "Toyota Camry",
    year: 2022,
    type: "SEDAN",
    seats: 5,
    transmission: "Automatic",
    price: 25000,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Mercedes-Benz G-Wagon",
    year: 2023,
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    price: 150000,
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1978&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Range Rover Sport",
    year: 2022,
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    price: 120000,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Toyota Land Cruiser",
    year: 2023,
    type: "SUV",
    seats: 7,
    transmission: "Automatic",
    price: 95000,
    image: "https://images.unsplash.com/photo-1625231334168-35067f8853ed?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Lexus ES 350",
    year: 2021,
    type: "LUXURY",
    seats: 5,
    transmission: "Automatic",
    price: 45000,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Honda Accord",
    year: 2022,
    type: "SEDAN",
    seats: 5,
    transmission: "Automatic",
    price: 30000,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
  },
];
