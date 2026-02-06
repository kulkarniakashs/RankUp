type ProgressBarProps = {
  value: number;              // 0..100
  label?: string;             // optional text on the right or inside
  showPercent?: boolean;      // default true
  heightClass?: string;       // e.g. "h-2", "h-3"
  className?: string;         // wrapper extra classes
};

export function ProgressBar({
  value,
  label,
  showPercent = true,
  heightClass = "h-2",
  className = "",
}: ProgressBarProps) {
  const safe = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
          <span className="truncate">{label ?? ""}</span>
          {showPercent && <span className="tabular-nums">{Math.round(safe)}%</span>}
        </div>
      )}

      <div className={`w-full ${heightClass} overflow-hidden rounded-full bg-slate-200`}>
        <div
          className={`h-full rounded-full bg-blue-600 transition-[width] duration-200 ease-out`}
          style={{ width: `${safe}%` }}
          aria-label="Progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={safe}
          role="progressbar"
        />
      </div>
    </div>
  );
}
