"use client";

import CarGrid from "@/components/car-grid";
import SearchInput from "@/components/search-input";
import useSearch from "@/hooks/use-search";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SelectionBar from "@/components/selection-bar";
import useGlobalStore from "@/store/global-store";
import useBookingStore from "@/store/booking-store";
import { getServiceById } from "@/lib/data/services";

const OurFleet = () => {
  const { searchQuery, setSearchQuery, filteredCars, loading, allCars } =
    useSearch();
  const queryParams = useSearchParams();
  const isSelect = queryParams.get("select") === "true";
  const selectType =
    (queryParams.get("selectType") as "single" | "multiple") || "single";
  const { selectedCars, clearCars, modifyCars, tempSchedule } = useGlobalStore();
  const router = useRouter();

  const bookingId = queryParams.get("booking");
  const booking = useBookingStore((state) =>
    state.bookings.find((b) => b.bookingId === bookingId),
  );
  const isModify = !!booking;
  const { startBooking, updateBooking } = useBookingStore();

  const handleBooking = () => {
    const service = getServiceById(queryParams.get("service") as string);

    if (!service || selectedCars.length === 0) return;

    if (isModify && bookingId) {
      updateBooking({ bookingId: bookingId, selectedCars: selectedCars });
      router.push(`/booking/${bookingId}`);
    } else {
      const id = startBooking(service, selectedCars, tempSchedule);
      if (!id) return;
      router.push(`/booking/${id}`);
    }
  };

  useEffect(() => {
    if (isSelect && !isModify) {
      clearCars();
    }
  }, [isSelect, isModify, clearCars]);

  useEffect(() => {
    if (isModify && booking) {
      modifyCars(booking.selectedCars);
    }
  }, [isModify, booking, modifyCars]);
  
  // Calculate total quantity for display
  const totalQuantity = selectedCars.reduce((sum, sc) => sum + sc.quantity, 0);

  return (
    <section className={isSelect && selectedCars.length > 0 ? "pb-40" : ""}>
      <header className="md:mb-8 mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="font-black md:text-4xl text-2xl text-text-100">
            {isModify
              ? "Refine Your Selection"
              : isSelect
                ? selectType === "single"
                  ? "Select Your Vehicle"
                  : "Curate Your Fleet"
                : "Our Fleet"}
          </h2>
          <p className="md:text-base text-sm text-text-200">
            {isModify
              ? "Change the vehicles for your booking to better suit your updated travel plans."
              : isSelect
                ? selectType === "single"
                  ? "Pick the perfect ride for your professional chauffeur experience."
                  : "Choose multiple premium vehicles to assemble your tailored convoy."
                : "Browse our collection of premium chauffeur-driven vehicles."}
          </p>
        </div>

        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </header>
      <CarGrid
        loading={loading}
        cars={filteredCars}
        allCars={allCars}
        handleClearFilter={() => setSearchQuery("")}
        isSelect={isSelect}
        selectType={selectType}
        isSelfDrive={queryParams.get("service") === "self_drive"}
      />
      {isSelect && (
        <SelectionBar
          selectType={selectType}
          handleBooking={handleBooking}
          selectedCars={totalQuantity}
          isModify={isModify}
        />
      )}
    </section>
  );
};

export default OurFleet;
