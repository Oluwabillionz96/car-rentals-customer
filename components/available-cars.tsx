import CarGrid from "./car-grid";

const AvailableCars = () => {
  return (
    <section className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-lg md:text-3xl font-bold md:font-extrabold text-text-100">
            Available Cars
          </h2>
          <p className="text-[#64748b] font-medium hidden md:block text-base">
            Top picks for your commutes in Nigeria
          </p>
        </div>
      </div>
      <CarGrid />
    </section>
  );
};

export default AvailableCars;
