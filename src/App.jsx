import { useState } from 'react'
import Header from './components/organisms/Header'
import SearchBar from './components/molecules/SearchBar'
import ProductGrid from './components/organisms/ProductGrid'
import { INITIAL_PRODUCTS } from './data/initialProducts'

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter products by name (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  )

  const handleOpenAddModal = () => {
    // Will be wired in next commit
    console.log('Open add modal')
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
        <Header onAddProduct={handleOpenAddModal} />

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
    </div>
  )
}
