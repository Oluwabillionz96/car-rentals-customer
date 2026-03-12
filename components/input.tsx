import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

const Input = ({
  icon,
  type = "text",
  placeholder,
  id,
  registration,
  error,
}: {
  icon: LucideIcon;
  type?: string;
  placeholder: string;
  id: string;
  registration?: UseFormRegisterReturn;
  error?: string;
}) => {
  const Icon = icon;
  return (
    <div className="space-y-1">
      <div
        className={`h-12 border relative rounded-xl overflow-hidden transition-colors ${
          error ? "border-red-500" : "border-border-100"
        }`}
      >
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          className="h-full w-full outline-none placeholder:text-text-400 p-4 pl-9 lg:pl-4"
          {...registration}
        />
        <Icon
          className="absolute top-4 left-2 text-text-400 lg:hidden"
          size={18}
        />
      </div>
      {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
