import { BookingDetails } from "@/lib/types";
import { Calendar, CheckCircle2, CreditCard, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { motion } from "framer-motion";

const CustomerInfo = ({ booking }: { booking: BookingDetails }) => {
  const customer = booking.customer;
  if (!customer) return null;

  const isSelfDrive = booking.service.id === "self_drive";

  const rows = [
    {
      icon: User,
      label: "Full Name",
      value: `${customer.firstName} ${customer.lastName}`,
    },
    { icon: Mail, label: "Email", value: customer.email },
    { icon: Phone, label: "Phone", value: customer.phone },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4 }}
      className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
    >
      <div className="p-6 md:p-8 border-b border-slate-50">
        <h2 className="text-base font-black text-text-100 uppercase italic tracking-tighter flex items-center gap-2">
          <User size={18} className="text-primary" />
          Customer Details
        </h2>
      </div>

      <div className="p-6 md:p-8 space-y-5">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4">
            <div className="p-2.5 bg-primary/5 rounded-xl shrink-0">
              <Icon size={16} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                {label}
              </p>
              <p className="text-sm font-bold text-text-100 truncate">
                {value}
              </p>
            </div>
          </div>
        ))}

        {isSelfDrive && customer.verification && (
          <>
            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-xs font-black text-text-100 uppercase italic tracking-tight flex items-center gap-2 mb-4">
                <ShieldCheck size={16} className="text-primary" />
                Driver Verification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: CreditCard,
                    label: "License No.",
                    value: customer.verification.licenseNumber,
                  },
                  {
                    icon: Calendar,
                    label: "License Expiry",
                    value: customer.verification.licenseExpiry,
                  },
                  {
                    icon: CheckCircle2,
                    label: "NIN",
                    value: customer.verification.nin,
                  },
                  {
                    icon: CheckCircle2,
                    label: "BVN",
                    value: customer.verification.bvn,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                      <Icon size={14} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-bold text-text-100 truncate">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CustomerInfo;
