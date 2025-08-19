import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "solid";
}

export function Button({ children, size = "md", variant = "solid", className = "", ...props }: ButtonProps) {
  let sizeClasses = "px-4 py-2 text-base";
  if (size === "sm") sizeClasses = "px-3 py-1 text-sm";
  if (size === "lg") sizeClasses = "px-6 py-3 text-lg";

  const variantClasses = variant === "outline"
    ? "border-2 border-pink-400 bg-transparent text-pink-600 hover:bg-pink-100"
    : "bg-pink-500 hover:bg-pink-600 text-white";

  return (
    <button
      className={`rounded-xl shadow transition-all font-semibold ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
