import { Fuel, Settings, Users } from "lucide-react";
import { ParamValue } from "next/dist/server/request/params";
import { Car } from "@/lib/types";

export const MOCK_CARS: Car[] = [
  {
    id: "toyota-camry-2023",
    name: "Toyota Camry 2023",
    category: "sedan",
    seats: 5,
    transmission: "auto",
    fuel: "Petrol",
    pricePerDay: 45000,
    pricePerHour: 5000,
    images: [
      "https://images.unsplash.com/photo-1664287721774-13da4b108b18?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=2070&auto=format&fit=crop",
    ],
    features: ["AC", "Bluetooth", "Backup Camera", "Executive Interior"],
    available: true,
  },
  {
    id: "toyota-camry-2021",
    name: "Toyota Camry 2021",
    category: "sedan",
    seats: 5,
    transmission: "auto",
    fuel: "Petrol",
    pricePerDay: 42000,
    pricePerHour: 4000,
    images: [
      "https://images.unsplash.com/photo-1697261340926-94c90baf81c7?q=80&w=873&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1664287721774-13da4b108b18?w=500&auto=format&fit=crop",
    ],
    features: ["AC", "Bluetooth", "Backup Camera", "Executive Interior"],
    available: true,
  },
  {
    id: "mercedes-g63-amg",
    name: "Mercedes-Benz G63 AMG",
    category: "luxury",
    seats: 5,
    transmission: "auto",
    fuel: "Petrol",
    pricePerDay: 180000,
    pricePerHour: 20000,
    images: [
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1978&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540066019607-e5f69323a8bc?q=80&w=1974&auto=format&fit=crop",
    ],
    features: [
      "V8 Engine",
      "Premium Sound",
      "Sunroof",
      "All-Wheel Drive",
      "Panoramic View",
    ],
    available: true,
  },
  {
    id: "range-rover-sport-2022",
    name: "Range Rover Sport 2022",
    category: "luxury",
    seats: 5,
    transmission: "auto",
    fuel: "Diesel",
    pricePerDay: 130000,
    pricePerHour: 15000,
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606148332571-3827bc96c4b2?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Luxury Leather",
      "Adaptive Air Suspension",
      "Matrix LED Headlights",
    ],
    available: true,
  },
  {
    id: "hiace-commuter",
    name: "Toyota Hiace Commuter",
    category: "van",
    seats: 12,
    transmission: "auto", // Hiace can be auto, changed from manual to match TransmissionType
    fuel: "Diesel",
    pricePerDay: 70000,
    pricePerHour: 8000,
    images: [
      "https://images.unsplash.com/photo-1650807486050-a142ea418b19?q=80&w=327&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464226110271-dec109869611?q=80&w=1974&auto=format&fit=crop",
    ],
    features: ["Spacious Seating", "Strong AC", "Luggage Space"],
    available: true,
  },
  {
    id: "lexus-es350-2021",
    name: "Lexus ES 350 2021",
    category: "luxury",
    seats: 5,
    transmission: "auto",
    fuel: "Petrol",
    pricePerDay: 55000,
    pricePerHour: 6500,
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    ],
    features: ["Smooth Ride", "Mark Levinson Audio", "Quiet Cabin"],
    available: true,
  },
  {
    id: "toyota-prado-txl",
    name: "Toyota Land Cruiser Prado TXL",
    category: "suv",
    seats: 7,
    transmission: "auto",
    fuel: "Petrol",
    pricePerDay: 85000,
    pricePerHour: 10000,
    images: [
      "https://images.unsplash.com/photo-1625231334168-35067f8853ed?q=80&w=2070&auto=format&fit=crop",
    ],
    features: ["Off-road capable", "Third Row Seating", "Climate Control"],
    available: true,
  },
  {
    id: "v-class-luxury",
    name: "Mercedes-Benz V-Class",
    category: "van",
    seats: 8,
    transmission: "auto",
    fuel: "Diesel",
    pricePerDay: 95000,
    pricePerHour: 12000,
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    ],
    features: ["Executive Lounge", "Rear Climate", "Electric Sliders"],
    available: true,
  },
];

export const GET_CAR_PROPS = (car?: Car) => [
  {
    label: `${car?.seats} SEATS`,
    title: "Seats",
    icon: Users,
  },
  {
    label: car?.transmission.toUpperCase(),
    title: "Gear Box",
    icon: Settings,
  },
  {
    label: car?.fuel.toUpperCase(),
    title: "Fuel",
    icon: Fuel,
  },
];

export function getCar(id: string | ParamValue) {
  return MOCK_CARS.find((car) => car.id === id);
}

export const generateBookingId = () => {
  let bookingId = "SRC-2026-";
  for (let i = 0; i !== 5; i++) {
    bookingId = `${bookingId}${Math.floor(Math.random() * 10).toString()}`;
  }

  return bookingId;
};
