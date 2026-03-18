import { Car, generateBookingId } from "@/constants/cars";
import {
  BookingIDCard,
  CustomerDetailsCard,
  ReservationSummary,
  SuccessHeader,
  SupportTooltip,
} from "./util-components";

export default function ConfirmationDesktopView({
  car,
  onBackHome,
  userEmail,
  userName,
  userPhone,
  pickupDateStr,
  dropoffDateStr,
  bookingId,
}: {
  car: Car;
  onBackHome: () => void;
  userEmail: string;
  userName: string;
  userPhone: string;
  pickupDateStr: string;
  dropoffDateStr: string;
  bookingId: string;
}) {
  return (
    <div className="hidden md:block">
      <SuccessHeader onBackHome={onBackHome} userEmail={userEmail} />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <ReservationSummary
            car={car}
            pickupDateStr={pickupDateStr}
            dropoffDateStr={dropoffDateStr}
          />
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <BookingIDCard id={bookingId} />
          <CustomerDetailsCard
            name={userName}
            email={userEmail}
            phone={userPhone}
          />
          <SupportTooltip />
        </div>
      </div>
    </div>
  );
}
