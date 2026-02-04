export default function EmptyState({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-8 text-center">
      <div className="text-xl font-bold text-gray-900">{title}</div>
      <div className="text-gray-600 mt-2">{subtitle}</div>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
