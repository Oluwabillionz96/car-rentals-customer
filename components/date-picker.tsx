"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface DatePickerProps {
  label: string;
  selectedDate: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateSelect: (date: Date | null) => void;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  selectedDate,
  startDate,
  endDate,
  onDateSelect,
  className,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    // If startDate exists, restrict navigation to only 1 month ahead (or the specific month of the 30-day limit)
    if (startDate) {
      const maxDate = new Date(startDate);
      maxDate.setDate(maxDate.getDate() + 30);

      const nextMonthFirstDate = new Date(year, month + 1, 1);
      if (nextMonthFirstDate > maxDate) return;
    }
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // const isToday = (day: number) => {
  //   const today = new Date();
  //   return (
  //     day === today.getDate() &&
  //     month === today.getMonth() &&
  //     year === today.getFullYear()
  //   );
  // };

  const isSelected = (day: number) => {
    return (
      selectedDate?.getDate() === day &&
      selectedDate?.getMonth() === month &&
      selectedDate?.getFullYear() === year
    );
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const current = new Date(year, month, day);
    return current > startDate && current < endDate;
  };

  const isRangeStart = (day: number) => {
    if (!startDate) return false;
    return (
      startDate.getDate() === day &&
      startDate.getMonth() === month &&
      startDate.getFullYear() === year
    );
  };

  const isRangeEnd = (day: number) => {
    if (!endDate) return false;
    return (
      endDate.getDate() === day &&
      endDate.getMonth() === month &&
      endDate.getFullYear() === year
    );
  };

  const isDisabled = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const current = new Date(year, month, day);
    return current < today;
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const renderDays = () => {
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const prevMonthDays = daysInMonth(year, month - 1);

    const days = [];

    // Empty slots for previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="h-10 md:h-12 flex items-center justify-center text-slate-300 text-sm font-medium"
        >
          {prevMonthDays - i}
        </div>,
      );
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const current = new Date(year, month, day);
      const selected = isSelected(day) || isRangeStart(day) || isRangeEnd(day);
      const inRange = isInRange(day);
      const maxBookingDate = startDate ? new Date(startDate) : null;
      if (maxBookingDate) maxBookingDate.setDate(maxBookingDate.getDate() + 30);

      const disabled =
        isDisabled(day) ||
        (label.toLowerCase().includes("drop-off") &&
          startDate &&
          (current < startDate ||
            (maxBookingDate && current > maxBookingDate))) ||
        (label.toLowerCase().includes("pickup") &&
          endDate &&
          current > endDate);

      const isStart = isRangeStart(day);
      const isEnd = isRangeEnd(day);
      const isStartAndEnd = isStart && isEnd;

      days.push(
        <button
          key={day}
          disabled={Boolean(disabled)}
          onClick={() => {
            const clickedDate = new Date(year, month, day);
            if (selectedDate && isSameDay(clickedDate, selectedDate)) {
              onDateSelect(null);
            } else {
              onDateSelect(clickedDate);
            }
          }}
          className={`
            relative h-10 md:h-12 w-full flex items-center justify-center text-xs font-bold transition-all duration-200
            ${disabled ? "text-slate-200 cursor-not-allowed" : "text-text-100 hover:text-primary"}
            ${selected ? "text-white hover:text-white" : ""}
            ${inRange ? "bg-primary/10" : ""}
            ${isStartAndEnd ? "rounded-xl" : isStart ? "rounded-l-xl" : isEnd ? "rounded-r-xl" : ""}
            ${selected && !inRange && !isStart && !isEnd ? "rounded-xl" : ""}
          `}
        >
          {selected && (
            <motion.div
              layoutId={
                isStart
                  ? `start-${label}`
                  : isEnd
                    ? `end-${label}`
                    : `active-${label}`
              }
              className="absolute inset-0 bg-primary rounded-md z-0 shadow-lg shadow-primary/30"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{day}</span>
        </button>,
      );
    }

    return days;
  };

  return (
    <div className={`flex flex-col gap-4 w-full md:max-w-none lg:max-w-[400px] ${className}`}>
      <h3 className="text-text-300 text-[10px] md:text-sm font-bold uppercase tracking-widest px-1">
        {label}
      </h3>

      <div className="bg-white border border-slate-100 rounded-4xl p-6 shadow-xl shadow-slate-200/50">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-primary"
          >
            <ChevronLeft size={20} />
          </button>

          <h4 className="text-base md:text-lg font-black text-text-100">
            {monthNames[month]} {year}
          </h4>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-primary"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 mb-4">
          {weekdays.map((day, i) => (
            <div
              key={i}
              className="h-10 flex items-center justify-center text-[10px] md:text-xs font-black text-text-400 uppercase tracking-tighter"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-y-1">{renderDays()}</div>
      </div>
    </div>
  );
};

export default DatePicker;
