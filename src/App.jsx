import { useState } from 'react'
import Header from './components/organisms/Header'
import SearchBar from './components/molecules/SearchBar'
import ProductGrid from './components/organisms/ProductGrid'
import AddProductModal from './components/organisms/AddProductModal'
import { INITIAL_PRODUCTS } from './data/initialProducts'

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

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

  const handleOpenEditModal = (product) => {
    // Will be wired in next commit
    console.log('Open edit modal', product)
  }

  const handleOpenDeleteModal = (product) => {
    // Will be wired in next commit
    console.log('Open delete modal', product)
  }

  const handleResetDefault = () => {
    setProducts(INITIAL_PRODUCTS)
    setSearchQuery('')
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
          <footer className="pt-2 text-xs font-medium text-slate-500">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </footer>
        )}
      </main>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  )
}
