"use client";

import { AlertTriangle, X } from "lucide-react";

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  carName?: string;
}

export default function CancelBookingModal({
  isOpen,
  onClose,
  onConfirm,
  carName = "Seaside Resort",
}: CancelBookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-300">
      {/* Clickable Overlay to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-sm bg-white rounded-t-[40px] md:rounded-[40px] p-8 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden animate-in slide-in-from-bottom-full md:slide-in-from-bottom-8 duration-500 mb-0 md:mb-0">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all active:scale-[0.95] z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Top Handle (Drawer Style) */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-1.5 bg-slate-100 rounded-full" />
        </div>

        {/* content */}
        <div className="flex flex-col items-center text-center">
          {/* Warning Icon Package */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={32} strokeWidth={2.5} />
            </div>
          </div>

          <h3 className="text-[22px] font-bold text-slate-900 mb-3 leading-tight">
            Are you sure you want to cancel?
          </h3>
          <p className="text-slate-500 text-[15px] font-medium leading-relaxed mb-10 max-w-[280px]">
            This action cannot be undone. You may lose your reservation of{" "}
            <span className="text-slate-900 font-semibold">{carName}</span>.
          </p>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={onConfirm}
              className="w-full bg-[#ef4444] hover:opacity-90 text-white font-bold py-5 rounded-2xl shadow-lg shadow-red-500/10 transition-all active:scale-[0.98] text-[15px]"
            >
              Confirm Cancellation
            </button>
            <button
              onClick={onClose}
              className="w-full bg-white hover:bg-slate-50 text-text-200 border border-slate-200 font-bold py-5 rounded-2xl transition-all active:scale-[0.98] text-[15px]"
            >
                Keep Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
