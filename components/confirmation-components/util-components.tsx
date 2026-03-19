import { Car } from "@/constants/cars";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Info,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function InfoBadge({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-slate-400">
        <Icon size={13} />
      </div>
      <div>
        <p className="text-[9px] text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-[11px] font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-[#3b82f6] flex items-center gap-1.5"
      title="Copy Booking ID"
    >
      {copied ? (
        <Check size={14} className="text-green-500" />
      ) : (
        <Copy size={14} />
      )}
    </button>
  );
}

export function BookingShortSummary({
  car,
  days,
  customerName,
  pickupDate,
  dropoffDate,
  bookingId,
}: {
  car: Car;
  days: number;
  customerName: string;
  pickupDate: string;
  dropoffDate: string;
  bookingId: string;
}) {
  return (
    <>
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
            Booking ID
          </p>
          <div className="flex items-center gap-2">
            <p className="text-[#3b82f6] font-bold text-sm">{bookingId}</p>
            <CopyButton text={bookingId} />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
            Status
          </p>
          <span className="bg-[#dcfce7] text-[#166534] text-[10px] font-bold px-2 py-0.5 rounded-md">
            PAID
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-14 h-11 relative rounded-lg overflow-hidden bg-slate-200 shrink-0">
          <Image src={car.image} alt={car.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 mb-0.5">Vehicle</p>
          <p className="font-bold text-slate-900 text-[15px]">
            {car.name} {car.year}
          </p>
        </div>
      </div>

      <div className="h-px bg-slate-200/60 w-full mb-4" />

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Pickup
          </p>
          <p className="text-xs font-bold text-slate-800">{pickupDate}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Return
          </p>
          <p className="text-xs font-bold text-slate-800">{dropoffDate}</p>
        </div>
      </div>

      <div className="h-px bg-slate-200/60 w-full mb-4" />

      <div className="grid grid-cols-2 gap-2">
        <InfoBadge
          icon={Calendar}
          label="Duration"
          value={`${days} day${days > 1 ? "s" : ""}`}
        />
        <InfoBadge icon={User} label="Customer" value={customerName} />
      </div>
    </>
  );
}

export function ActionButtons({
  onBackHome,
  mobile,
}: {
  onBackHome: () => void;
  mobile?: boolean;
}) {
  const btnClass = mobile
    ? "bg-[#4facfe] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 active:scale-[0.98] transition-all text-sm"
    : "bg-[#4facfe] hover:opacity-90 text-white font-bold py-4 px-12 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all";

  return (
    <>
      <button className={btnClass}>
        <Download size={mobile ? 18 : 20} />
        Download Receipt
      </button>
      <button
        className={
          mobile
            ? "bg-slate-100 text-text-200 font-bold py-3 px-6 rounded-xl active:scale-[0.98] transition-all text-sm flex justify-center gap-2"
            : btnClass
        }
      >
        <Calendar size={mobile ? 18 : 20} />
        Manage Booking
      </button>
      {mobile ? (
        <button
          onClick={onBackHome}
          className="text-slate-400 font-semibold py-2 text-[13px] hover:text-primary transition-colors mt-1"
        >
          Back to Home
        </button>
      ) : null}
    </>
  );
}

export function SuccessHeader({
  onBackHome,
  userEmail,
}: {
  onBackHome: () => void;
  userEmail: string;
}) {
  return (
    <div className="bg-white rounded-[32px] p-12 text-center flex flex-col items-center shadow-sm border border-slate-100 mb-10">
      <div className="w-20 h-20 bg-[#e6fcf5] rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-[#38d9a9]" strokeWidth={2.5} />
      </div>
      <h1 className="text-4xl font-extrabold text-[#1a202c] mb-4">
        Booking Confirmed!
      </h1>
      <p className="text-slate-500 text-lg mb-10 max-w-2xl">
        Your reservation is all set. We&apos;ve sent a detailed confirmation
        email and receipt to{" "}
        <span className="font-bold text-slate-700">{userEmail}</span>.
      </p>
      <div className="flex gap-4">
        <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-4 px-12 rounded-2xl flex items-center gap-2 transition-all">
          <Download size={20} />
          Download Receipt
        </button>
        <button className="bg-[#4facfe] hover:opacity-90 text-white font-bold py-4 px-12 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
          <Calendar size={20} />
          Manage Booking
        </button>
      </div>
      <button
        onClick={onBackHome}
        className="mt-8 text-slate-400 font-medium hover:text-primary transition-colors flex items-center gap-2"
      >
        Back to Home
      </button>
    </div>
  );
}

export function ReservationSummary({
  car,
  pickupDateStr,
  dropoffDateStr,
}: {
  car: Car;
  pickupDateStr: string;
  dropoffDateStr: string;
}) {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden h-fit shadow-sm border border-slate-100 flex flex-col">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">
          Reservation Summary
        </h2>
        <span className="bg-[#e0f2fe] text-[#0ea5e9] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Confirmed
        </span>
      </div>
      <div className="p-8 flex-1">
        <div className="flex gap-8 mb-10">
          <div className="w-64 h-40 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-50 shadow-inner">
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 pt-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Vehicle
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {car.name} {car.year}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              {car.description.split(".")[0]}.
            </p>
            <div className="flex gap-4 mt-4">
              <SpecItem label={car.type} />
              <SpecItem label={car.transmission} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <LocationDetail
            label="Pickup"
            dateTime={pickupDateStr}
            icon={Calendar}
          />
          <LocationDetail
            label="Return"
            dateTime={dropoffDateStr}
            icon={Clock}
          />
        </div>
      </div>
    </div>
  );
}

export function SpecItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
      {label}
    </div>
  );
}

export function LocationDetail({
  label,
  dateTime,
  icon: Icon,
}: {
  label: string;
  dateTime: string;
  icon: React.ElementType;
}) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        {label}
      </p>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-bold text-slate-900">{dateTime}</p>
          <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
            <MapPin size={12} />
            LAX International Airport
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingIDCard({ id }: { id: string }) {
  return (
    <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
        Booking ID
      </p>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-extrabold text-[#3b82f6] text-wrap">{id}</p>
        <CopyButton text={id} />
      </div>
    </div>
  );
}

export function CustomerDetailsCard({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  return (
    <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex-1">
      <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
        Customer Details
      </h3>
      <div className="space-y-6">
        <CustomerInfoRow icon={User} text={name} />
        <CustomerInfoRow icon={Mail} text={email} />
        <CustomerInfoRow icon={Phone} text={phone} />
      </div>
    </div>
  );
}

export function CustomerInfoRow({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
        <Icon size={18} />
      </div>
      <div>
        <p
          className={`${text.includes("@") ? "text-slate-600 text-sm" : "font-bold text-slate-900"}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export function SupportTooltip({ mobile }: { mobile?: boolean }) {
  return (
    <div
      className={`bg-sky-50/50 rounded-[24px] border border-sky-100/50 ${mobile ? "p-5" : "p-6"}`}
    >
      <div className="flex gap-4">
        <div
          className={`bg-white rounded-full flex items-center justify-center text-[#3b82f6] shadow-sm shrink-0 ${mobile ? "w-9 h-9" : "w-10 h-10"}`}
        >
          <Info size={mobile ? 18 : 20} />
        </div>
        <div className="text-left">
          <h4
            className={`font-bold text-slate-900 ${mobile ? "text-[13px] mb-1" : "text-sm mb-1"}`}
          >
            Need help?
          </h4>
          <p
            className={`${mobile ? "text-[11px]" : "text-xs"} text-slate-500 leading-relaxed mb-3`}
          >
            If you have any questions or need to make changes, our 24/7 support
            team is here to help.
          </p>
          <button
            className={`text-[#3b82f6] font-bold hover:underline ${mobile ? "text-[11px]" : "text-xs"}`}
          >
            Chat with us
          </button>
        </div>
      </div>
    </div>
  );
}
