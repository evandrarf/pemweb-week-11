import { useState } from 'react'
import Modal from '../atoms/Modal'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { parsePrice } from '../../utils/formatters'

/**
 * Modal popup for editing an existing product.
 * Pre-populates product data and verifies validity before saving.
 */
export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onUpdate,
}) {
  const [name, setName] = useState(product?.name || '')
  const [price, setPrice] = useState(product?.price ? String(product.price) : '')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!name.trim()) {
      newErrors.name = 'Nama produk wajib diisi.'
    }

    const numericPrice = parsePrice(price)
    if (!price || numericPrice <= 0) {
      newErrors.price = 'Harga harus lebih dari 0.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate() || !product) return

    onUpdate({
      id: product.id,
      name: name.trim(),
      price: parsePrice(price),
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Produk"
      subtitle="Perbarui informasi produk yang dipilih."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID badge/indicator */}
        <div className="flex items-center gap-2 pb-1">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
            ID: {product?.id}
          </span>
        </div>

        <Input
          id="edit-product-name"
          label="Nama Produk"
          placeholder="Contoh: Buku Tulis"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
          }}
          error={errors.name}
          autoFocus
        />

        <Input
          id="edit-product-price"
          label="Harga (Rp)"
          type="number"
          placeholder="Contoh: 12000"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
            if (errors.price) setErrors((prev) => ({ ...prev, price: '' }))
          }}
          helperText="Harga harus lebih dari 0."
          error={errors.price}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary" type="submit">
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </Modal>
  )
}
