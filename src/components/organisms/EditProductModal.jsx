import { useState } from 'react'
import Modal from '../atoms/Modal'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { parsePrice } from '../../utils/formatters'

/**
 * Modal popup for editing an existing product via backend API.
 * Pre-populates data and verifies validity before saving to server.
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate() || !product || isSubmitting) return

    setIsSubmitting(true)
    setServerError('')

    try {
      await onUpdate({
        id: product.id,
        name: name.trim(),
        price: parsePrice(price),
      })
      onClose()
    } catch (err) {
      console.error('Error updating product:', err)
      setServerError(err.message || 'Gagal memperbarui produk di server.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? undefined : onClose}
      title="Edit Produk"
      subtitle="Perbarui informasi produk di database."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID badge/indicator */}
        <div className="flex items-center gap-2 pb-1">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
            ID: {product?.id}
          </span>
        </div>

        {serverError && (
          <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {serverError}
          </div>
        )}

        <Input
          id="edit-product-name"
          label="Nama Produk"
          placeholder="Contoh: Buku Tulis"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
            if (serverError) setServerError('')
          }}
          error={errors.name}
          disabled={isSubmitting}
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
            if (serverError) setServerError('')
          }}
          helperText="Harga harus berupa angka lebih dari 0."
          error={errors.price}
          disabled={isSubmitting}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Memperbarui...' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
