"use client";

import { useState, useCallback } from "react";
import CancelBookingModal from "@/components/cancel-booking-modal";
import { useRouter } from "next/navigation";
import useBookingStore from "@/store/booking-store";

interface UseCancelBookingProps {
  carName: string;
  bookingId: string;
  onSuccess?: () => void;
}

export function useCancelBooking({
  carName,
  bookingId,
  onSuccess,
}: UseCancelBookingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const cancelBooking = useBookingStore((state) => state.cancelBooking);

  const openCancelModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCancelModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirmCancellation = useCallback(() => {
    cancelBooking(bookingId);
    
    setIsOpen(false);
    
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/");
    }
  }, [bookingId, cancelBooking, onSuccess, router]);

  const CancelModal = () => (
    <CancelBookingModal
      isOpen={isOpen}
      onClose={closeCancelModal}
      onConfirm={handleConfirmCancellation}
      carName={carName}
    />
  );

  return {
    isOpen,
    openCancelModal,
    closeCancelModal,
    CancelModal,
  };
}
