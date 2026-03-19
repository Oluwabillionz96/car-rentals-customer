"use client";

import { LucideIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { JSX } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
  compact?: boolean;
}

export default function EmptyState({
  title,
  description,
  icon: Icon = Search,
  actionLabel = "Return Home",
  actionHref = "/",
  onAction,
  className = "",
  compact = false,
}: EmptyStateProps) {
  const router = useRouter();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (actionHref) {
      router.push(actionHref);
    }
  };

  return (
    <div className={`${compact ? "min-h-0 py-6" : "min-h-[60vh]"} flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500 ${className}`}>
      {/* Icon with soft background */}
      <div className={`${compact ? "w-16 h-16" : "w-24 h-24"} bg-blue-50/50 rounded-full flex items-center justify-center ${compact ? "mb-6" : "mb-8"} relative group`}>
        <div className="absolute inset-0 bg-blue-100 rounded-full scale-75 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Icon size={compact ? 32 : 48} className="text-primary relative" strokeWidth={1.5} />
      </div>

      {/* Text Content */}
      <h1 className={`${compact ? "text-xl font-bold" : "text-3xl font-extrabold"} text-text-100 mb-3 tracking-tight`}>
        {title}
      </h1>
      <p className={`${compact ? "text-sm text-text-400" : "text-lg text-text-300"} mb-8 max-w-[280px] leading-relaxed mx-auto`}>
        {description}
      </p>

      {/* Call to Action */}
      <button
        onClick={handleAction}
        className={`${compact ? "w-full py-4 text-sm" : "py-4 px-12 text-base"} bg-primary hover:bg-[#3ba8e5] text-white font-bold rounded-2xl shadow-xl shadow-blue-500/10 active:scale-[0.98] transition-all`}
      >
        {actionLabel}
      </button>
    </div>
  );
}
