import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

const NavigationMap = ({
  routes,
}: {
  routes: { href: string; label: string }[];
}) => {
  return (
    <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 mb-8 max-w-7xl mx-auto px-4">
      {routes.map((route, index) => (
        <Fragment key={index}>
          {" "}
          <Link
            href={route.href}
            className="hover:text-primary transition-colors"
          >
            {route.label}
          </Link>
          {index < routes.length - 1 && <ChevronRight size={14} />}
        </Fragment>
      ))}
    </div>
  );
};

export default NavigationMap;
