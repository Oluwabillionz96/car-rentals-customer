import CarGrid from "@/components/car-grid";

const OurCars = () => {
  return (
    <section>
      <header className="md:mb-8 mb-4">
        <h2 className="font-black md:text-4xl text-2xl text-text-100">
          Our Fleet
        </h2>
        <p className="md:text-base text-sm text-text-200">
          Discover the perfect ride for every destination and style.
        </p>
      </header>
      <CarGrid />
    </section>
  );
};

export default OurCars;
