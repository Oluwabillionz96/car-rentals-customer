import { LucideIcon } from "lucide-react";

const IconCard = ({
  icon,
  text,
  title,
}: {
  icon: LucideIcon;
  text: string;
  title?: string;
}) => {
  const Icon = icon;
  return (
    <article className=" bg-neutral-100 border-border-100 border rounded-xl flex flex-col items-center justify-center gap-1 px-7 py-4">
      <Icon className="text-primary" size={23} />
      <p className="hidden md:block text-[10px] text-text-400 font-bold">
        {title}
      </p>
      <p className="text-text-300 text-xs font-medium text-nowrap md:text-sm md:font-bold md:text-text-100">
        {text}
      </p>
    </article>
  );
};

export default IconCard;
