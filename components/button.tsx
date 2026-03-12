import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-primary text-white justify-center px-5 h-14 rounded-xl font-bold text-base shadow-xl flex items-center gap-2 active:scale-95 transition-all w-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
