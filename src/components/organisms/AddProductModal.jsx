import { useState } from 'react'
import Modal from '../atoms/Modal'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { parsePrice } from '../../utils/formatters'

/**
 * Modal popup for adding a new product.
 * Features inline validation and clean inputs.
 */
export default function AddProductModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState({})

  const handleClose = () => {
    setName('')
    setPrice('')
    setErrors({})
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onAdd({
      name: name.trim(),
      price: parsePrice(price),
    })
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Tambah Produk"
      subtitle="Masukkan informasi produk baru."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="add-product-name"
          label="Nama Produk"
          placeholder="Contoh: Pulpen"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
          }}
          error={errors.name}
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
          }}
          helperText="Harga harus lebih dari 0."
          error={errors.price}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="outline" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" type="submit">
            Simpan Produk
          </Button>
        </div>
      </form>
    </Modal>
  )
}
