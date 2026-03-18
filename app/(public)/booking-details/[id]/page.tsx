"use client";
import { useParams } from "next/navigation";

const BookingDetailsPage = () => {
  const { id } = useParams();
    return <>Your booking has the id of { id} 😁😁😀</>;
};

export default BookingDetailsPage;
