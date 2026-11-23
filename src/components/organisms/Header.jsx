import { Plus, RotateCw } from 'lucide-react'
import Button from '../atoms/Button'

/**
 * Page Header displaying application title, description,
 * refresh button, and primary add action.
 */
export default function Header({
  onAddProduct,
  onRefresh,
  isRefreshing = false,
}) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Manajemen Produk
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Kelola data produk secara dinamis terhubung ke backend Express.js.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {onRefresh && (
          <Button
            onClick={onRefresh}
            variant="outline"
            size="md"
            disabled={isRefreshing}
            title="Segarkan data dari server"
          >
            <RotateCw
              className={`w-4 h-4 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            <span className="hidden sm:inline">Segarkan</span>
          </Button>
        )}

        <Button onClick={onAddProduct} variant="primary" size="md">
          <Plus className="w-4 h-4" />
          <span>Tambah Produk</span>
        </Button>
      </div>
    </header>
  )
}

