import type { ButtonHTMLAttributes } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function AuthButton({
  children,
  ...props
}: AuthButtonProps) {
  return (
    <button
      {...props}
      className="w-full py-2.5 rounded-xl bg-linear-to-r
      from-blue-600 to-purple-600 text-white font-semibold
      hover:opacity-90 transition shadow-md"
    >
      {children}
    </button>
  );
}
