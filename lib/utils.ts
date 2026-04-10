import { CalendarHeart, CarFront, Plane, UserRound } from "lucide-react";
import { BookingDetails, BookingSchedule, BookingStatus, Car } from "./types";
import { getCar, MOCK_CARS } from "@/constants/cars";

export const calculateDays = (
  start: Date | null | string,
  end: Date | null | string,
) => {
  if (!start || !end) return 0;
  const diffTime = Math.abs(
    new Date(end).getTime() - new Date(start).getTime(),
  );
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

export const Icon = {
  weddings_and_events: CalendarHeart,
  corporate_and_executive_use: UserRound,
  airport_transfers: Plane,
  city_tours_and_group_trips: CarFront,
  self_drive: UserRound,
};

export const getScheduleRange = (schedule: BookingSchedule) => {
  if (schedule.type === "daily") {
    return {
      start: new Date(schedule.pickupDate).getTime(),
      end: new Date(schedule.dropoffDate).getTime(),
    };
  }

  // Hourly normalization
  const startTime = new Date(
    `${schedule.date}T${schedule.startTime}`,
  ).getTime();
  const endTime = startTime + schedule.hours * 60 * 60 * 1000;

  return { start: startTime, end: endTime };
};

/**
 * Checks if two booking schedules occupy the same time slot.
 * Returns true if there is a conflict (overlap).
 */
export const isScheduleOverlapping = (
  requestedSchedule: BookingSchedule,
  existingSchedule: BookingSchedule,
) => {
  const newRange = getScheduleRange(requestedSchedule);
  const alreadyBookedRange = getScheduleRange(existingSchedule);

  // A conflict exists if the new start is before their end
  // AND their start is before the new end.
  return (
    newRange.start < alreadyBookedRange.end &&
    alreadyBookedRange.start < newRange.end
  );
};

/**
 * Calculate how many units of a specific car are available for a given schedule.
 * @param carId - The ID of the car to check availability for
 * @param schedule - The requested booking schedule (null = browsing mode)
 * @param bookings - All existing bookings
 * @returns The number of available units (0 if none available)
 */
export const getAvailableQuantity = (
  carId: string,
  schedule: BookingSchedule | null,
  bookings: BookingDetails[],
): number => {
  // Find the car to get total fleet size
  const car = MOCK_CARS.find((c) => c.id === carId);
  if (!car) return 0;

  const fleetSize = car.available;

  // If no schedule selected (browsing mode), return total fleet size
  if (!schedule) return fleetSize;

  // Find all overlapping bookings for this car
  const overlappingBookings = bookings.filter((booking) => {
    // Only count confirmed and ongoing bookings
    if (booking.status !== "confirmed" && booking.status !== "ongoing") {
      return false;
    }

    // Check if this booking includes the car we're checking
    const hasThisCar = booking.selectedCars.some((sc) => sc.carId === carId);
    if (!hasThisCar) return false;

    // Check if schedules overlap
    if (!booking.schedule) return false;
    return isScheduleOverlapping(schedule, booking.schedule);
  });

  // Sum up quantities from all overlapping bookings
  const bookedQuantity = overlappingBookings.reduce((sum, booking) => {
    const selectedCar = booking.selectedCars.find((sc) => sc.carId === carId);
    return sum + (selectedCar?.quantity || 0);
  }, 0);

  // Calculate available quantity
  const available = fleetSize - bookedQuantity;
  return Math.max(0, available); // Never return negative
};

export const isCarAvailable = (
  car: Car,
  bookings: BookingDetails[],
  schedule?: BookingSchedule | null,
  requestedQuantity: number = 1,
) => {
  // Use the new quantity-based availability check
  const availableQuantity = getAvailableQuantity(
    car.id,
    schedule ?? null,
    bookings,
  );
  return availableQuantity >= requestedQuantity;
};

export const now = () => new Date().toISOString();

const calculateStatus = (schedule?: BookingSchedule): BookingStatus => {
  const current = new Date();

  if (schedule?.type === "daily") {
    const pickup = new Date(schedule.pickupDate);
    const dropoff = new Date(schedule.dropoffDate);
    if (current < pickup) return "confirmed";
    if (current > dropoff) return "past";
    return "ongoing";
  }

  if (schedule?.type === "hourly") {
    const start = new Date(`${schedule.date}T${schedule.startTime}`);
    const totalHours = schedule.hours;
    const end = new Date(start.getTime() + totalHours * 60 * 60 * 1000);
    if (current < start) return "confirmed";
    if (current > end) return "past";
    return "ongoing";
  }

  return "draft";
};

const STORAGE_KEY = "bookings";

export const loadBookings = (): BookingDetails[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const bookings: BookingDetails[] = JSON.parse(raw);
    // Recalculate statuses on load — time may have passed since last session
    return bookings.map((b) =>
      b.status === "cancelled" || b.status === null || b.status === "draft"
        ? b
        : { ...b, status: calculateStatus(b.schedule ?? undefined) },
    );
  } catch {
    return [];
  }
};

export const persistVerifiedBookings = (bookings: BookingDetails[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

function getTotalPrice(
  booking: BookingDetails,
  priceType: "pricePerDay" | "pricePerHour",
) {
  return booking.selectedCars
    .map((selectedCar) => {
      const car = getCar(selectedCar.carId);
      return car ? car[priceType] * selectedCar.quantity : 0;
    })
    .reduce((acc, price) => acc + price, 0);
}

export const calculatePrice = (
  booking: BookingDetails,
  scheduleOverride?: BookingSchedule | null,
) => {
  const schedule = scheduleOverride || booking.schedule;

  if (booking.service.pricing === "hourly") {
    const bookingSchedule = schedule?.type === "hourly" ? schedule : null;

    if (bookingSchedule) {
      const totalHours = bookingSchedule.hours || 0;
      const totalPrice = getTotalPrice(booking, "pricePerHour");
      return totalPrice * totalHours;
    }
  }

  const bookingSchedule = schedule?.type === "daily" ? schedule : null;
  if (bookingSchedule) {
    const days = calculateDays(
      bookingSchedule.pickupDate,
      bookingSchedule.dropoffDate,
    );
    const totalPrice = getTotalPrice(booking, "pricePerDay");
    return totalPrice * days;
  }
  return 0;
};

export function getUnitRate(
  booking: BookingDetails,
  timeQuery: "hour" | "day" | "days",
) {
  if (!booking) return 0;
  return booking.selectedCars.reduce((acc, selectedCar) => {
    const car = getCar(selectedCar.carId);
    if (!car) return acc;
    const price = timeQuery === "hour" ? car.pricePerHour : car.pricePerDay;
    return acc + price * selectedCar.quantity;
  }, 0);
}

export const formatDateForInput = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return getLocalDateString(date);
  } catch {
    return "";
  }
};

export const getLocalDateString = (d: Date | null) => {
  if (!d) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
