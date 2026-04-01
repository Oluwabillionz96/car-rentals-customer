import { z } from "zod";

export const customerSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
  verification: z
    .object({
      licenseNumber: z.string().min(5, "License number is required"),
      licenseExpiry: z.string().min(5, "Expiry date is required"),
      nin: z.string().min(11, "NIN must be at least 11 digits"),
      bvn: z.string().min(11, "BVN must be 11 digits"),
    })
    .optional(),
});

export const hourlyScheduleSchema = z.object({
  type: z.literal("hourly"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  hours: z.number().min(1, "Minimum 1 hour"),
  pickupAddress: z.string().min(3, "Pickup address is required"),
  destinationNote: z.string().optional(),
});

export const dailyScheduleSchema = z.object({
  type: z.literal("daily"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  dropoffDate: z.string().min(1, "Dropoff date is required"),
});

export const bookingSchema = z.object({
  customer: customerSchema,
  schedule: z.discriminatedUnion("type", [
    hourlyScheduleSchema,
    dailyScheduleSchema,
  ]),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
