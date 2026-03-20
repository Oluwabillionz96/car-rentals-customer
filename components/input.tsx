import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

const Input = ({
  icon,
  type = "text",
  placeholder,
  id,
  registration,
  error,
  className,
  value,
  onChange,
  showIconDesktop = false,
}: {
  icon: LucideIcon;
  type?: string;
  placeholder: string;
  id: string;
  registration?: UseFormRegisterReturn;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showIconDesktop?: boolean;
}) => {
  const Icon = icon;
  return (
    <div className={`space-y-1 ${className}`}>
      <div
        className={`relative h-12 rounded-xl overflow-hidden transition-colors border ${
          error ? "border-red-500" : "border-border-100"
        }`}
      >
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          className={`h-full w-full outline-none placeholder:text-text-400 p-4 ${
            showIconDesktop ? "pl-12" : "pl-10 lg:pl-4"
          }`}
          {...registration}
        />
        <Icon
          className={`absolute top-1/2 -translate-y-1/2 left-4 text-text-400 ${
            showIconDesktop ? "" : "lg:hidden"
          }`}
          size={18}
        />
      </div>
      {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
