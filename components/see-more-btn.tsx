import { ChevronRight } from "lucide-react";
import Link from "next/link";

const SeeMoreButton = ({
  href,
  content,
}: {
  href: string;
  content: string;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl w-fit font-bold text-xl transition-all active:scale-[0.98] mx-auto mt-6 shadow-lg"
    >
      {content}
      <ChevronRight size={26} strokeWidth={2.5} />
    </Link>
  );
};

export default SeeMoreButton;
