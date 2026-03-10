import { LucideIcon } from "lucide-react";

const IconCard = ({ icon, text }: { icon: LucideIcon; text: string }) => {
  const Icon = icon;
  return (
    <article className=" bg-[#F1F5F9] border-border-100 border rounded-xl flex flex-col items-center justify-center gap-1 px-7 py-4">
      <Icon className="text-primary" size={23} />
      <p className="text-text-300 text-xs font-medium">{text}</p>
    </article>
  );
};

export default IconCard;
