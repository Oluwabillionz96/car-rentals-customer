import { navLinks } from "./header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoveRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * MobileNavbar component for side navigation on mobile views.
 * Designed to show menu items with an active indicator.
 */
const MobileNavbar = ({ isNavOpen }: { isNavOpen: boolean }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      {isNavOpen ? (
        <motion.nav
          className="w-2/3 md:hidden fixed top-14 right-0 h-[calc(100vh-3.5rem)] bg-white/95 backdrop-blur-xl border-l border-slate-100 shadow-2xl overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: isNavOpen ? "0" : "100%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex flex-col p-3 h-full">
            <ul className="space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.pathname;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.pathname}
                      className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group ${
                        isActive
                          ? "bg-primary/10 text-primary font-bold shadow-sm"
                          : "text-text-100 font-semibold hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-sm tracking-tight">
                        {link.name}
                      </span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                      {!isActive && (
                        <MoveRight
                          size={16}
                          className="text-slate-200 group-hover:text-primary transition-colors translate-x-1 opacity-0 group-hover:opacity-100"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
};

export default MobileNavbar;
