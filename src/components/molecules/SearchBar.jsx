import { Search, X } from 'lucide-react'

/**
 * SearchBar molecule displaying search input and item counter.
 */
export default function SearchBar({
  value,
  onChange,
  count = 0,
  placeholder = 'Cari nama produk...',
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md transition cursor-pointer"
            aria-label="Hapus pencarian"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="text-sm font-medium text-slate-500 self-end sm:self-center">
        {count} produk
      </div>
    </div>
  )
}
