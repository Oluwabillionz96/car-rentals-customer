import { Fuel, Settings, Users } from "lucide-react";
import { ParamValue } from "next/dist/server/request/params";

export interface Car {
  id: string;
  name: string;
  year: number;
  type: string;
  seats: number;
  transmission: string;
  fuel: string;
  price: number;
  image: string;
  description: string;
  gallery: string[];
  features: string[];
  location: {
    address: string;
    office: string;
  };
}

export const MOCK_CARS: Car[] = [
  {
    id: "1",
    name: "Toyota Camry",
    year: 2023,
    type: "Premium Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop",
    description:
      "Experience luxury and reliability with the 2023 Toyota Camry. Perfectly suited for executive travel or family trips, this sedan offers a smooth ride, advanced safety features, and exceptional fuel efficiency.",
    gallery: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590362891175-4357ee567df6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616788494707-ec28ef06641e?q=80&w=1974&auto=format&fit=crop",
    ],
    features: [
      "Bluetooth Audio",
      "Rear Camera",
      "AC Front & Rear",
      "USB Charging",
      "Dual-zone Climate",
      "Cruise Control",
    ],
    location: {
      office: "Victoria Island Office",
      address: "12 Adeola Hopewell St, Lagos",
    },
  },
  {
    id: "2",
    name: "Mercedes-Benz G-Wagon",
    year: 2023,
    type: "Luxury SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1978&auto=format&fit=crop",
    description:
      "The G-Class is an icon of off-road capability and luxury. With its distinctive design and unparalleled performance, it's the ultimate statement of style and power for any journey.",
    gallery: [
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1978&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540066019607-e5f69323a8bc?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550503998-3866297394d6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614200024993-4ee6273bc110?q=80&w=1974&auto=format&fit=crop",
    ],
    features: [
      "Premium Sound",
      "All-Wheel Drive",
      "Panoramic Sunroof",
      "Lane Keep Assist",
      "Heated Seats",
      "360 Camera",
    ],
    location: {
      office: "Lekki Phase 1 Office",
      address: "15 Admiralty Way, Lekki, Lagos",
    },
  },
  {
    id: "3",
    name: "Range Rover Sport",
    year: 2022,
    type: "Premium SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
    description:
      "Dynamic and sophisticated, the Range Rover Sport combines luxury with legendary off-road capability. It delivers an assertive drive with refined power for those who demand more.",
    gallery: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606148332571-3827bc96c4b2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594911772125-07dad7d28818?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Adaptive Dynamics",
      "Matrix LED",
      "Meridian Sound",
      "Touch Pro Duo",
      "Interactive Driver Display",
      "Terrain Response",
    ],
    location: {
      office: "Abuja Central Office",
      address: "45 Adetokunbo Ademola St, Wuse 2, Abuja",
    },
  },
  {
    id: "4",
    name: "Toyota Land Cruiser",
    year: 2023,
    type: "Luxury SUV",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1625231334168-35067f8853ed?q=80&w=2070&auto=format&fit=crop",
    description:
      "The King of all Roads. The Land Cruiser provides exceptional durability and reliability without compromising on comfort. Its spacious 7-seat interior is perfect for large families or groups.",
    gallery: [
      "https://images.unsplash.com/photo-1625231334168-35067f8853ed?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593527261073-982823630f9a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593527261236-47a61d6ee5c1?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Diff Lock",
      "Crawl Control",
      "4-Zone Climate",
      "Rear Seat Entertainment",
      "Ventilated Seats",
      "Cool Box",
    ],
    location: {
      office: "Ikeja Office",
      address: "22 Oba Akran Ave, Ikeja, Lagos",
    },
  },
  {
    id: "5",
    name: "Lexus ES 350",
    year: 2021,
    type: "Luxury Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    description:
      "The Lexus ES 350 is the epitome of quiet luxury. Exceptionally comfortable and impeccably crafted, it provides a serene driving experience like no other.",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616422285623-13ff0167c95c?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Mark Levinson Audio",
      "Quiet Cabin",
      "Smart Access",
      "Apple CarPlay",
      "Android Auto",
      "Lexus Safety System",
    ],
    location: {
      office: "Victoria Island Office",
      address: "12 Adeola Hopewell St, Lagos",
    },
  },
  {
    id: "6",
    name: "Honda Accord",
    year: 2022,
    type: "Executive Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    description:
      "The Honda Accord is the gold standard for executive transport. Reliable, spacious, and equipped with modern technology, it's perfect for both work and play.",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Honda Sensing",
      "Wireless Charging",
      "Sunroof",
      "Heated Seats",
      "Blind Spot Info",
      "Remote Start",
    ],
    location: {
      office: "Victoria Island Office",
      address: "12 Adeola Hopewell St, Lagos",
    },
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
