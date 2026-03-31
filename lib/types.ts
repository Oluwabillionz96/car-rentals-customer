export type ServiceId =
  | "wedding"
  | "executive"
  | "airport_transfers"
  | "city_tours"
  | "group_trips"
  | "self_drive";

export type SelectType = "single" | "multiple";
export type PricingType = "hourly" | "daily";
export type CarCategory = "sedan" | "suv" | "van" | "luxury";
export type TransmissionType = "auto" | "manual";
export type BookingStatus =
  | "draft" // booking started, not yet paid
  | "confirmed" // paid, waiting for pickup date
  | "ongoing" // currently active
  | "past" // completed
  | "cancelled"; // cancelled by customer or business

export interface Service {
  id: ServiceId;
  name: string;
  description: string;
  selectType: SelectType;
  pricing: PricingType;
  hasChauffeur: boolean;
  autoAssign: boolean;
  minHours?: number;
}

export interface Car {
  id: string;
  name: string;
  category: CarCategory;
  seats: number;
  transmission: TransmissionType;
  fuel: string;
  pricePerDay: number;
  pricePerHour: number;
  images: string[];
  features: string[];
  available: boolean;
}

export type BookingSchedule =
  | {
      type: "hourly";
      date: string;
      startTime: string;
      hours: number;
      pickupAddress: string;
      destinationNote?: string;
    }
  | {
      type: "daily";
      pickupDate: string;
      dropoffDate: string;
    };

export interface DriverVerification {
  licenseNumber: string;
  licenseExpiry: string;
  nin: string;
  bvn: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verification?: DriverVerification; // only required for self-drive
}

export interface BookingExtension {
  addedHours: number;
  addedAt: string;
  additionalAmount: number;
}

export interface BookingDetails {
  bookingId: string;
  service: Service;
  selectedCars: Car[];
  schedule: BookingSchedule | null;
  customer: Customer | null;
  extensions: BookingExtension[];
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface BookingStore {
  Bookings: BookingDetails[];
  startBooking: (service: Service, selectedCars: Car[]) => void;
  updateBooking: (partial: Partial<BookingDetails>) => void;
  completeBooking: () => void;
  extendBooking: (bookingId: string, hours: number, amount: number) => void;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatuses: () => void;
}
