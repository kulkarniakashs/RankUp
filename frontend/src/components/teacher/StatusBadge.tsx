export default function StatusBadge({ status }: { status: string }) {
  const map: any = {
    DRAFT: "bg-gray-200 text-gray-700",
    SUBMITTED: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${map[status]}`}>
      {status}
    </span>
  );
}
