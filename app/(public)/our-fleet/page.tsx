"use client";

import CarGrid from "@/components/car-grid";
import SearchInput from "@/components/search-input";
import useSearch from "@/hooks/use-search";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OurCars = () => {
  const { searchQuery, setSearchQuery, filteredCars, loading, allCars } =
    useSearch();
  const queryParams = useSearchParams();
  const [isSelect, setIsSelect] = useState(false);
  const [selectType, setSelectType] = useState<"single" | "multiple">(
    queryParams.get("selectType") as "single" | "multiple",
  );

  useEffect(() => {
    if (queryParams.get("select")) {
      setIsSelect(true);
    }
    if (queryParams.get("selectType")) {
      setSelectType(queryParams.get("selectType") as "single" | "multiple");
    }
  }, [queryParams]);
  return (
    <section>
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
      />
    </section>
  );
};

export default OurCars;
