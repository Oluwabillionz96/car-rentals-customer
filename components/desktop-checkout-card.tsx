import { Car } from "@/constants/cars";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Button from "@/components/button";

const DesktopCheckoutCard = ({
  car,
  totalDays,
  totalPrice,
}: {
  car?: Car;
  totalDays: number;
  totalPrice: number;
}) => {
  return (
    <section className="bg-white hidden lg:block p-6 h-fit rounded-xl">
      <header className="border-b  pb-6 border-border-100">
        <h2 className="text-lg font-bold text-text-100">Rental Summary</h2>
      </header>
      <section>
        <div className="relative mt-6 w-80 aspect-video overflow-hidden rounded-lg">
          <Image
            src={car?.image ?? ""}
            alt={car?.name ?? ""}
            fill
            className="object-cover"
          />
        </div>
        <section>
          <h3 className="font-bold text-text-500 mb-6 mt-4">{car?.name}</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-sm text-text-300">Rental Duration</p>
              <p className="text-sm font-semibold text-text-100">
                {totalDays} Days
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-text-300">
                {" "}
                ₦{car?.price.toLocaleString()} / day
              </p>
              <p className="text-sm font-semibold text-text-100">
                {" "}
                ₦{totalPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between py-4 border-t border-border-100">
              <p className="text-lg font-bold text-text-100">Total Price</p>
              <p className="text-2xl font-black text-text-500">
                {" "}
                ₦{totalPrice.toLocaleString()}
              </p>
            </div>
            <div className="space-y-3">
              <Button type="submit" form="user-info">
                Proceed to Payment
                <ArrowRight />
              </Button>
              <p className="text-xs text-center text-text-400">
                By proceeding, you agree to Solution Car Rentals' Terms of
                Service .
              </p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default DesktopCheckoutCard;
