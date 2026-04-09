"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  max: number;
  onQuantityChange: (quantity: number) => void;
  disabled?: boolean;
}

const QuantitySelector = ({
  quantity,
  max,
  onQuantityChange,
  disabled = false,
}: QuantitySelectorProps) => {
  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDecrement();
        }}
        disabled={disabled || quantity <= 0}
        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
      >
        <Minus size={16} className="text-text-100" />
      </button>
      <span className="w-8 text-center font-bold text-text-100">
        {quantity}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleIncrement();
        }}
        disabled={disabled || quantity >= max}
        className="w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
      >
        <Plus size={16} className="text-primary" />
      </button>
    </div>
  );
};

export default QuantitySelector;
