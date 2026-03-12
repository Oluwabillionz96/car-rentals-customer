import { Car } from "@/constants/cars";
import Image from "next/image";

const MobileCarCard = ({
  car,
  isPayment,
  totalDays,
}: {
  car: Car | undefined;
  isPayment?: boolean;
  totalDays?: number;
}) => {
  return (
    <div
      className={`flex items-start gap-4 lg:hidden  border ${isPayment ? "border-neutral-100 bg-white shadow-md shadow-neutral-100" : "border-primary/20 bg-primary/10"} p-4 rounded-xl`}
    >
      <div className="w-20 aspect-square relative rounded-lg overflow-hidden">
        <Image
          src={car?.image ?? ""}
          alt={car?.name ?? ""}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3
          className={`text-base text-text-100 ${isPayment ? "font-semibold" : "font-bold"}`}
        >
          {car?.name} {car?.year}
        </h3>
        {!isPayment ? (
          <p className="text-sm text-text-300">
            ₦{car?.price.toLocaleString()} / day
          </p>
        ) : (
          <p className="text-sm font-medium text-primary">
            {totalDays ?? 0} day{totalDays && totalDays > 1 ? "s" : ""} rental
          </p>
        )}
      </div>
    </div>
  );
};

export default MobileCarCard;
