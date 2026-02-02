import type React from "react";
import type { Role } from "../../types/roles";

interface RoleTabsProps {
  role: Role;
  setRole:  React.Dispatch<React.SetStateAction<Role>>;
  allowAdmin?: boolean;
}

export default function RoleTabs({
  role,
  setRole,
  allowAdmin = true,
}: RoleTabsProps) {
  const roles: Role[] = allowAdmin
    ? ["STUDENT", "TEACHER", "ADMIN"]
    : ["STUDENT", "TEACHER"];

  return (
    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
      {roles.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => setRole(r)}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition
            ${
              role === r
                ? "bg-white shadow text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          {r.charAt(0) + r.slice(1).toLowerCase()}
        </button>
      ))}
    </div>
  );
}
