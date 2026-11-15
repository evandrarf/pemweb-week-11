import { Plus } from 'lucide-react'
import Button from '../atoms/Button'

/**
 * Page Header displaying the application title, description, and primary add action.
 */
export default function Header({ onAddProduct }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Manajemen Produk
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Kelola daftar produk dan harga dalam satu tempat.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={onAddProduct} variant="primary" size="md">
          <Plus className="w-4 h-4" />
          <span>Tambah Produk</span>
        </Button>
      </div>
    </header>
  )
}
