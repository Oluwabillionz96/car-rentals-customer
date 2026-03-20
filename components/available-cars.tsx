"use client";

import CarGrid from "./car-grid";
import SearchInput from "./search-input";
import useSearch from "@/hooks/use-search";

const AvailableCars = () => {
  const { searchQuery, setSearchQuery, filteredCars, loading, allCars } =
    useSearch();
  return (
    <section className="space-y-8">
      <header className="flex justify-between md:items-end flex-col md:flex-row">
        <div className="space-y-2">
          <h2 className="text-lg md:text-3xl font-bold md:font-extrabold text-text-100">
            Available Cars
          </h2>
          <p className="text-text-300 font-medium hidden md:block text-base">
            Top picks for your commutes in Nigeria
          </p>
        </div>
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </header>

      <CarGrid
        cars={filteredCars}
        loading={loading}
        allCars={allCars}
        handleClearFilter={() => {
          setSearchQuery("");
        }}
      />
    </section>
  );
};

export default AvailableCars;
