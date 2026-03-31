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
import { getCar } from "@/constants/cars";
import { Car } from "@/lib/types";

const OurFleet = () => {
  const { searchQuery, setSearchQuery, filteredCars, loading, allCars } =
    useSearch();
  const queryParams = useSearchParams();
  const isSelect = queryParams.get("select") === "true";
  const selectType =
    (queryParams.get("selectType") as "single" | "multiple") || "single";
  const { selectedCarsId, clearCars } = useGlobalStore();
  const router = useRouter();

  const { startBooking } = useBookingStore();

  const handleBooking = () => {
    const service = getServiceById(queryParams.get("service") as string);
    const cars = selectedCarsId
      .map((id) => getCar(id))
      .filter((car): car is Car => !!car);

    if (!service || cars.length !== selectedCarsId.length) return;
    const bookingId = startBooking(service, cars);

    if (!bookingId) return;
    router.push(`/booking/${bookingId}`);
  };

  useEffect(() => {
    if (isSelect) {
      clearCars();
    }
  }, [queryParams, clearCars]);
  return (
    <section className={isSelect && selectedCarsId.length > 0 ? "pb-40" : ""}>
      <header className="md:mb-8 mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="font-black md:text-4xl text-2xl text-text-100">
            Our Fleet
          </h2>
          <p className="md:text-base text-sm text-text-200">
            Discover the perfect ride for every destination and style.
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
          selectedCars={selectedCarsId.length}
        />
      )}
    </section>
  );
};

export default OurFleet;
