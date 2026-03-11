import { LucideIcon } from "lucide-react";

const Input = ({
  icon,
  type = "text",
  placeholder,
  id,
}: {
  icon: LucideIcon;
  type?: string;
  placeholder: string;
  id: string;
}) => {
  const Icon = icon;
  return (
    <div className="h-12 border relative border-border-100 rounded-xl overflow-hidden">
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className="h-full w-full  outline-border-100 placeholder:text-text-400 p-4 pl-9"
      />
      <Icon className="absolute top-4 left-2 text-text-400" size={18} />
    </div>
  );
};

export default Input;
