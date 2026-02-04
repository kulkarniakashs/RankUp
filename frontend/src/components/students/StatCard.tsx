import React from "react";

export default function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
        </div>
        <div className="text-xl">{icon}</div>
      </div>
    </div>
  );
}
