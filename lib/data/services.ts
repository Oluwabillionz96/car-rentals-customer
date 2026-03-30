// lib/data/services.ts
import { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "wedding",
    name: "Weddings",
    description:
      "Arrive in style. Build your convoy with multiple premium vehicles for the full wedding experience.",
    selectType: "multiple",
    pricing: "hourly",
    hasChauffeur: true,
    autoAssign: false,
    minHours: 4,
  },
  {
    id: "executive",
    name: "Executive",
    description:
      "Premium transport for business meetings, corporate events, and VIP engagements.",
    selectType: "multiple",
    pricing: "hourly",
    hasChauffeur: true,
    autoAssign: false,
    minHours: 4,
  },
  {
    id: "airport_transfers",
    name: "Airport Transfers",
    description:
      "Seamless pickups and drop-offs. Your driver will be there when you land.",
    selectType: "single",
    pricing: "hourly",
    hasChauffeur: true,
    autoAssign: true,
    minHours: 2,
  },
  {
    id: "city_tours",
    name: "City Tours",
    description:
      "Explore the city at your own pace with a knowledgeable local driver by your side.",
    selectType: "single",
    pricing: "hourly",
    hasChauffeur: true,
    autoAssign: true,
    minHours: 3,
  },
  {
    id: "group_trips",
    name: "Group Trips",
    description:
      "Moving a crowd? We have spacious vehicles and professional drivers for groups of any size.",
    selectType: "single",
    pricing: "hourly",
    hasChauffeur: true,
    autoAssign: false,
    minHours: 3,
  },
  {
    id: "self_drive",
    name: "Self Drive",
    description:
      "Take the wheel yourself. Pick up from our office, return when done. Daily rates, full freedom.",
    selectType: "single",
    pricing: "daily",
    hasChauffeur: false,
    autoAssign: false,
  },
];

export const getServiceById = (id: string): Service | undefined =>
  services.find((s) => s.id === id);
