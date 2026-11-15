import { useState, useEffect } from 'react'
import Header from './components/organisms/Header'
import SearchBar from './components/molecules/SearchBar'
import ProductGrid from './components/organisms/ProductGrid'
import AddProductModal from './components/organisms/AddProductModal'
import EditProductModal from './components/organisms/EditProductModal'
import DeleteProductModal from './components/organisms/DeleteProductModal'
import { INITIAL_PRODUCTS } from './data/initialProducts'

const STORAGE_KEY = 'pemweb_week11_products'

export default function App() {
  // Initialize state from localStorage if available, otherwise use initial default products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
      // Fallback on error
    }
    return INITIAL_PRODUCTS
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)

  // Persist products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage:', e)
    }
  }, [products])

  // Filter products by name (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  )

  const handleAddProduct = ({ name, price }) => {
    const nextId =
      products.length > 0
        ? Math.max(...products.map((p) => p.id)) + 1
        : 1

    const newProduct = {
      id: nextId,
      name,
      price,
    }

    setProducts((prev) => [...prev, newProduct])
  }

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    )
  }

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const handleOpenEditModal = (product) => {
    setEditingProduct(product)
  }

  const handleOpenDeleteModal = (product) => {
    setDeletingProduct(product)
  }

  const handleResetDefault = () => {
    setProducts(INITIAL_PRODUCTS)
    setSearchQuery('')
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <main className="max-w-5xl mx-auto space-y-6">
        <Header onAddProduct={() => setIsAddModalOpen(true)} />

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          count={filteredProducts.length}
        />

        <ProductGrid
          products={filteredProducts}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onResetDefault={handleResetDefault}
        />

        {products.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs font-medium text-slate-500">
            <span>
              Menampilkan {filteredProducts.length} dari {products.length} produk
            </span>
            <button
              type="button"
              onClick={handleResetDefault}
              className="text-slate-400 hover:text-slate-700 underline underline-offset-2 transition cursor-pointer"
            >
              Reset ke Data Awal
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
