"use client";

import CarGrid from "@/components/car-grid";
import SearchInput from "@/components/search-input";
import useSearch from "@/hooks/use-search";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SelectionBar from "@/components/selection-bar";
import useGlobalStore from "@/store/global-store";

const OurCars = () => {
  const { searchQuery, setSearchQuery, filteredCars, loading, allCars } =
    useSearch();
  const queryParams = useSearchParams();
  const isSelect = !!queryParams.get("select");
  const selectType =
    (queryParams.get("selectType") as "single" | "multiple") || "single";
  const { selectedCarsId, clearCars } = useGlobalStore();

  useEffect(() => {
    clearCars();
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
      {isSelect && <SelectionBar selectType={selectType} />}
    </section>
  );
};

export default OurCars;
