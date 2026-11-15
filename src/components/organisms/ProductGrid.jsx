import { PackageOpen } from 'lucide-react'
import ProductCard from '../molecules/ProductCard'
import Button from '../atoms/Button'

/**
 * ProductGrid organism rendering list of product cards or empty state.
 */
export default function ProductGrid({
  products,
  onEdit,
  onDelete,
  searchQuery,
  onClearSearch,
  onResetDefault,
}) {
  if (products.length === 0) {
    return (
      <div className="bg-white border border-slate-200 border-dashed rounded-xl p-12 text-center my-6">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
          <PackageOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">
          {searchQuery ? 'Produk tidak ditemukan' : 'Belum ada produk'}
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
          {searchQuery
            ? `Tidak ada produk yang cocok dengan "${searchQuery}". Coba kata kunci lain.`
            : 'Daftar produk masih kosong. Tambahkan produk baru untuk memulai.'}
        </p>
        <div className="mt-5 flex items-center justify-center gap-2">
          {searchQuery ? (
            <Button variant="outline" size="sm" onClick={onClearSearch}>
              Hapus Pencarian
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={onResetDefault}>
              Muat Data Contoh
            </Button>
          )}
        </div>
      </div>
    )
  }

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
