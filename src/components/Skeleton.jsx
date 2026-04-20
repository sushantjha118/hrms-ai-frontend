// Skeleton primitives
export function SkeletonBox({ className = "" }) {
  return <div className={`animate-pulse bg-surface-container-high rounded-lg ${className}`}></div>;
}

export function SkeletonText({ className = "" }) {
  return <div className={`animate-pulse bg-surface-container-high rounded-md ${className}`}></div>;
}

export function SkeletonAvatar({ size = "w-9 h-9" }) {
  return <div className={`animate-pulse bg-surface-container-high rounded-full flex-shrink-0 ${size}`}></div>;
}

// Compact stat card skeleton (horizontal — used in Admin, Attendance)
export function SkeletonStatCard() {
  return (
    <div className="bg-surface-container-lowest px-5 py-4 rounded-xl shadow-sm flex items-center gap-4">
      <SkeletonBox className="w-10 h-10 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonText className="h-3 w-24" />
        <SkeletonText className="h-6 w-16" />
      </div>
      <SkeletonBox className="h-5 w-12 rounded-full" />
    </div>
  );
}

// Tall stat card skeleton (vertical — used in HR, Leave)
export function SkeletonStatCardTall() {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-4">
      <SkeletonBox className="w-10 h-10 rounded-lg" />
      <div className="space-y-2">
        <SkeletonText className="h-3 w-28" />
        <SkeletonText className="h-8 w-16" />
      </div>
    </div>
  );
}

// Table row skeleton
export function SkeletonTableRow({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          {i === 0 ? (
            <div className="flex items-center gap-3">
              <SkeletonAvatar />
              <div className="space-y-1.5">
                <SkeletonText className="h-3 w-24" />
                <SkeletonText className="h-2.5 w-16" />
              </div>
            </div>
          ) : (
            <SkeletonText className={`h-3 ${i % 2 === 0 ? "w-20" : "w-16"}`} />
          )}
        </td>
      ))}
    </tr>
  );
}

// Table skeleton wrapper
export function SkeletonTable({ rows = 5, cols = 5, headers = [] }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      {headers.length > 0 && (
        <div className="px-6 py-5 border-b border-outline-variant/10">
          <SkeletonText className="h-5 w-40" />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-container-low/50">
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-6 py-4">
                  <SkeletonText className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {Array.from({ length: rows }).map((_, i) => (
              <SkeletonTableRow key={i} cols={cols} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Employee card skeleton
export function SkeletonEmployeeCard() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
      <div className="flex items-start justify-between mb-4">
        <SkeletonBox className="w-16 h-16 rounded-xl" />
        <SkeletonBox className="w-6 h-6 rounded-lg" />
      </div>
      <div className="space-y-2 mb-4">
        <SkeletonText className="h-4 w-32" />
        <SkeletonText className="h-3 w-24" />
        <SkeletonText className="h-3 w-20" />
      </div>
      <div className="flex gap-1.5 mb-4">
        <SkeletonBox className="h-5 w-14 rounded" />
        <SkeletonBox className="h-5 w-16 rounded" />
        <SkeletonBox className="h-5 w-12 rounded" />
      </div>
      <div className="pt-4 border-t border-outline-variant/10 flex justify-between">
        <SkeletonText className="h-3 w-12" />
        <SkeletonText className="h-3 w-16" />
      </div>
    </div>
  );
}

// Announcement / feed item skeleton
export function SkeletonFeedItem() {
  return (
    <div className="flex gap-4">
      <SkeletonBox className="w-12 h-12 rounded-2xl flex-shrink-0" />
      <div className="flex-1 border-b border-outline-variant/10 pb-4 space-y-2">
        <div className="flex justify-between">
          <SkeletonText className="h-2.5 w-20" />
          <SkeletonText className="h-2.5 w-12" />
        </div>
        <SkeletonText className="h-4 w-3/4" />
        <SkeletonText className="h-3 w-full" />
      </div>
    </div>
  );
}

// Calendar day skeleton
export function SkeletonCalendar() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
      <SkeletonText className="h-5 w-24 mb-4" />
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonText key={i} className="h-4 w-full" />
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <SkeletonBox key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Chart / bar skeleton
export function SkeletonChart() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <SkeletonText className="h-5 w-36" />
          <SkeletonText className="h-3 w-48" />
        </div>
        <SkeletonBox className="h-8 w-28 rounded-lg" />
      </div>
      <div className="flex items-end justify-between gap-3 h-48">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <SkeletonBox className="w-full rounded-t-lg" style={{ height: `${40 + Math.random() * 50}%` }} />
            <SkeletonText className="h-2.5 w-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Profile / detail panel skeleton
export function SkeletonDetailPanel() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-4">
        <SkeletonAvatar size="w-14 h-14" />
        <div className="space-y-2">
          <SkeletonText className="h-5 w-32" />
          <SkeletonText className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <SkeletonText className="h-3 w-32" />
              <SkeletonText className="h-3 w-8" />
            </div>
            <SkeletonBox className="h-1.5 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
