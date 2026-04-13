import { Minus, Plus } from "lucide-react";

const HourIncrementer = ({
  decrementerDisabled,
  incrementerDisabled,
  onDecrement,
  onIncrement,
  hours,
}: {
  decrementerDisabled?: boolean;
  incrementerDisabled?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  hours: number;
}) => {
  return (
    <div className="flex-1 w-full h-16 flex items-center justify-between px-6 rounded-2xl border-2 border-slate-100 bg-slate-50/30">
      <button
        type="button"
        disabled={decrementerDisabled}
        onClick={onDecrement}
        className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-text-100 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={20} />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black text-text-100 uppercase">
          {hours}
        </span>
        <span className="text-[10px] font-bold text-text-400 uppercase tracking-widest">
          {hours === 1 ? "Hour" : "Hours"}
        </span>
      </div>
      <button
        type="button"
        disabled={incrementerDisabled}
        onClick={onIncrement}
        className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-text-100 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

export default HourIncrementer;
