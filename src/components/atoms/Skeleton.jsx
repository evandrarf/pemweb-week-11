/**
 * Skeleton component for smooth loading state placeholders.
 */
export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse bg-slate-200 rounded-md ${className}`}
      {...props}
    />
  )
}

/**
 * ProductCardSkeleton replicates the shape of ProductCard during loading state.
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* ID badge skeleton */}
        <Skeleton className="h-4 w-12 rounded" />

        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mt-3 rounded" />

        {/* Price skeleton */}
        <Skeleton className="h-5 w-1/3 mt-2 rounded" />
      </div>

      {/* Action buttons skeleton */}
      <div className="grid grid-cols-2 gap-2.5 mt-6 pt-3 border-t border-slate-100">
        <Skeleton className="h-8 rounded-lg" />
        <Skeleton className="h-8 rounded-lg" />
      </div>
    </div>
  )
}
