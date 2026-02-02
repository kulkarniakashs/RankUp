import type { InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthInput({ label, ...props }: AuthInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5
        focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
      />
    </div>
  );
}
