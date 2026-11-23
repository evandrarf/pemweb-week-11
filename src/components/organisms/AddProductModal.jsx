import { useState } from 'react'
import Modal from '../atoms/Modal'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { parsePrice } from '../../utils/formatters'

/**
 * Modal popup for adding a new product via backend API.
 * Features inline validation, submission loading state, and error banner.
 */
export default function AddProductModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleClose = () => {
    setName('')
    setPrice('')
    setErrors({})
    setServerError('')
    setIsSubmitting(false)
    onClose()
  }

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
    if (!validate() || isSubmitting) return

    setIsSubmitting(true)
    setServerError('')

    try {
      await onAdd({
        name: name.trim(),
        price: parsePrice(price),
      })
      handleClose()
    } catch (err) {
      console.error('Error creating product:', err)
      setServerError(err.message || 'Gagal menyimpan produk ke server.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? undefined : handleClose}
      title="Tambah Produk"
      subtitle="Masukkan data produk yang akan disimpan ke database."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {serverError && (
          <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {serverError}
          </div>
        )}

        <Input
          id="add-product-name"
          label="Nama Produk"
          placeholder="Contoh: Pulpen"
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
          id="add-product-price"
          label="Harga (Rp)"
          type="number"
          placeholder="Contoh: 5000"
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
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan ke Server...' : 'Simpan Produk'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
