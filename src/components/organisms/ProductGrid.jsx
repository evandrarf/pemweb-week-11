import { PackageOpen, Plus, RefreshCw } from 'lucide-react'
import ProductCard from '../molecules/ProductCard'
import Button from '../atoms/Button'
import { ProductCardSkeleton } from '../atoms/Skeleton'
import ErrorAlert from '../molecules/ErrorAlert'

/**
 * ProductGrid organism rendering 4 UI conditions:
 * 1. Loading: Skeleton cards grid
 * 2. Error: Interactive ErrorAlert with Retry action
 * 3. Empty: Descriptive empty state (empty DB vs empty search)
 * 4. Success: Responsive grid of product cards
 */
export default function ProductGrid({
  products,
  isLoading,
  error,
  onRetry,
  onEdit,
  onDelete,
  onAddProduct,
  searchQuery,
  onClearSearch,
}) {
  // 1. Kondisi Loading
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 animate-pulse">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
          <span>Memuat data produk dari server...</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  // 2. Kondisi Error
  if (error) {
    return (
      <ErrorAlert
        title="Gagal Memuat Data Produk"
        message={error}
        onRetry={onRetry}
      />
    )
  }

  // 3. Kondisi Kosong (Empty State)
  if (products.length === 0) {
    return (
      <div className="bg-white border border-slate-200 border-dashed rounded-xl p-12 text-center my-6">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
          <PackageOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">
          {searchQuery ? 'Produk tidak ditemukan' : 'Belum ada produk di server'}
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
          {searchQuery
            ? `Tidak ada produk yang cocok dengan "${searchQuery}". Coba kata kunci lain.`
            : 'Database produk masih kosong. Tambahkan produk baru untuk mengisi katalog.'}
        </p>
        <div className="mt-5 flex items-center justify-center gap-2">
          {searchQuery ? (
            <Button variant="outline" size="sm" onClick={onClearSearch}>
              Hapus Pencarian
            </Button>
          ) : (
            <>
              {onAddProduct && (
                <Button variant="primary" size="sm" onClick={onAddProduct}>
                  <Plus className="w-4 h-4 mr-1" />
                  Tambah Produk Baru
                </Button>
              )}
              {onRetry && (
                <Button variant="outline" size="sm" onClick={onRetry}>
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Muat Ulang
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  // 4. Kondisi Sukses
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

