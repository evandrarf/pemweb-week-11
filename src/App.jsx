import { useState, useEffect, useCallback } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import Header from './components/organisms/Header'
import SearchBar from './components/molecules/SearchBar'
import ProductGrid from './components/organisms/ProductGrid'
import AddProductModal from './components/organisms/AddProductModal'
import EditProductModal from './components/organisms/EditProductModal'
import DeleteProductModal from './components/organisms/DeleteProductModal'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './services/api'

export default function App() {
  // State manajemen data produk & siklus status server
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)

  // State antarmuka pengguna
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)

  // Menampilkan notifikasi singkat (toast feedback)
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 4000)
  }, [])

  // Fungsi pengambil data produk dari backend (dapat dipicu tombol refresh / retry)
  const loadProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching products:', err)
      setError(err.message || 'Gagal terhubung ke server backend.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // useEffect terpanggil sekali saat komponen pertama kali dimuat (mount)
  useEffect(() => {
    let ignore = false

    async function fetchInitialData() {
      try {
        const data = await getProducts()
        if (!ignore) {
          setProducts(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error fetching products on mount:', err)
          setError(err.message || 'Gagal terhubung ke server backend.')
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    fetchInitialData()

    return () => {
      ignore = true
    }
  }, [])

  // Filter produk berdasarkan input pencarian (client-side query)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  )

  // Handler: Tambah Produk (POST /products)
  const handleAddProduct = async ({ name, price }) => {
    const newProduct = await createProduct({ name, price })
    setProducts((prev) => [...prev, newProduct])
    showToast(`Produk "${newProduct.name}" berhasil ditambahkan ke server!`)
  }

  // Handler: Update Produk (PUT /products/:id)
  const handleUpdateProduct = async ({ id, name, price }) => {
    const updated = await updateProduct(id, { name, price })
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    )
    showToast(`Produk "${updated.name}" berhasil diperbarui!`)
  }

  // Handler: Hapus Produk (DELETE /products/:id)
  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId)
    setProducts((prev) => prev.filter((p) => p.id !== productId))
    showToast('Produk berhasil dihapus dari server!')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <main className="max-w-5xl mx-auto space-y-6">
        {/* Toast Notification Banner */}
        {toast && (
          <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-emerald-300 hover:text-white p-1 rounded-md transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <Header
          onAddProduct={() => setIsAddModalOpen(true)}
          onRefresh={loadProducts}
          isRefreshing={isLoading}
        />

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          count={filteredProducts.length}
          placeholder="Cari nama produk dari server..."
        />

        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          onRetry={loadProducts}
          onEdit={(product) => setEditingProduct(product)}
          onDelete={(product) => setDeletingProduct(product)}
          onAddProduct={() => setIsAddModalOpen(true)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Ringkasan status data produk */}
        {!isLoading && !error && products.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs font-medium text-slate-500">
            <span>
              Menampilkan {filteredProducts.length} dari {products.length} produk di database
            </span>
            <button
              type="button"
              onClick={loadProducts}
              className="text-slate-400 hover:text-slate-700 underline underline-offset-2 transition cursor-pointer"
            >
              Segarkan dari Server
            </button>
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductModal
          key={editingProduct.id}
          isOpen={true}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteProductModal
        isOpen={Boolean(deletingProduct)}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirmDelete={handleDeleteProduct}
      />
    </div>
  )
}
