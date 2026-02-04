export default function Badge({ children, variant="default" }:{
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
}) {
  const cls =
    variant === "success"
      ? "bg-green-100 text-green-700"
      : variant === "warning"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-700";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {children}
    </span>
  );
}
