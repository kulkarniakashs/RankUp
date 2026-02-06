interface StatCardProps {
  label: string;
  value: string | number;
  subText?: string;
}

export default function StatCard({ label, value, subText }: StatCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-5">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-gray-900">{value}</div>
      {subText && (
        <div className="mt-1 text-xs text-gray-500">{subText}</div>
      )}
    </div>
  );
}
