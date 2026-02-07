export type CourseStatus = "PENDING" | "APPROVED" | "REJECTED";

interface Props {
  value: CourseStatus;
  onChange: (status: CourseStatus) => void;
}

export default function CourseStatusTabs({ value, onChange }: Props) {
  const tabs: { label: string; value: CourseStatus }[] = [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  return (
    <div className="flex gap-2 bg-white/60 backdrop-blur-xl rounded-2xl p-2 shadow w-fit">
      {tabs.map((tab) => {
        const active = value === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition
              ${
                active
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-white"
              }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
