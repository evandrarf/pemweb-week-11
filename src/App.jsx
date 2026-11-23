import { useState, useEffect, useCallback } from 'react'
import Header from './components/organisms/Header'
import SearchBar from './components/molecules/SearchBar'
import ProductGrid from './components/organisms/ProductGrid'
import AddProductModal from './components/organisms/AddProductModal'
import EditProductModal from './components/organisms/EditProductModal'
import DeleteProductModal from './components/organisms/DeleteProductModal'
import { getProducts } from './services/api'

export default function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)

  // Mengambil data produk dari server saat tombol refresh / retry diklik
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

  // useEffect terpanggil saat komponen mount untuk mengambil data awal
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

  // Filter produk berdasarkan nama (client-side search)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  )

  const handleOpenEditModal = (product) => {
    setEditingProduct(product)
  }

  const handleOpenDeleteModal = (product) => {
    setDeletingProduct(product)
  }

  // Callback sementara untuk CRUD lokal sebelum diintegrasikan di Step 4
  const handleAddProductSuccess = (newProduct) => {
    setProducts((prev) => [...prev, newProduct])
  }

  const handleUpdateProductSuccess = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    )
  }

  const handleDeleteProductSuccess = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <main className="max-w-5xl mx-auto space-y-6">
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
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          onAddProduct={() => setIsAddModalOpen(true)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Info ringkasan data produk saat sukses */}
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
        onAdd={handleAddProductSuccess}
      />

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductModal
          key={editingProduct.id}
          isOpen={true}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdateProductSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteProductModal
        isOpen={Boolean(deletingProduct)}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirmDelete={handleDeleteProductSuccess}
      />
    </div>
  )
}
