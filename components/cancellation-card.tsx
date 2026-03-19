"use client";

import { XCircle } from "lucide-react";

interface CancellationCardProps {
  pickupDate: Date | null;
  onCancel: () => void;
  className?: string;
}

export default function CancellationCard({
  pickupDate,
  onCancel,
  className = "",
}: CancellationCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`bg-white rounded-[24px] p-5 lg:p-6 shadow-xl shadow-slate-200/40 border border-slate-50 ${className}`}>
      <h3 className="text-lg font-bold text-[#1e293b] mb-1 text-left">
        Need to cancel?
      </h3>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed text-left">
        Cancel for free before {formatDate(pickupDate)}, 10:00 AM. After this
        time, a fee may apply.
      </p>
      <button
        onClick={onCancel}
        className="w-full bg-white text-[#F34444] border border-[#F34444]/20 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:bg-red-50 hover:border-[#F34444]/40"
      >
        <XCircle size={20} />
        Cancel Booking
      </button>
    </div>
  );
}
