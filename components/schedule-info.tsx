import { BookingDetails } from "@/lib/types";
import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const ScheduleInfo = ({ booking }: { booking: BookingDetails }) => {
  const schedule = booking.schedule;
  if (!schedule) return null;

  const isDaily = schedule.type === "daily";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
    >
      <div className="p-6 md:p-8 border-b border-slate-50">
        <h2 className="text-base font-black text-text-100 uppercase italic tracking-tighter flex items-center gap-2">
          <Calendar size={18} className="text-primary" />
          Schedule
        </h2>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/5 rounded-xl">
              <Calendar size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                {isDaily ? "Rental Period" : "Pickup Date"}
              </p>
              <p className="text-sm font-black text-text-100 italic uppercase">
                {isDaily
                  ? `${new Date(schedule.pickupDate).toLocaleDateString()} – ${new Date(schedule.dropoffDate).toLocaleDateString()}`
                  : new Date(schedule.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {!isDaily && (
            <>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/5 rounded-xl">
                  <Clock size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    Time & Duration
                  </p>
                  <p className="text-sm font-black text-text-100 italic uppercase">
                    {schedule.startTime} • {schedule.hours} HRS
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/5 rounded-xl">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    Pickup Location
                  </p>
                  <p className="text-sm font-black text-text-100 italic uppercase truncate max-w-[160px]">
                    {schedule.pickupAddress}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduleInfo;