import { Trash2, X } from 'lucide-react'
import Modal from '../atoms/Modal'
import Button from '../atoms/Button'
import { formatRupiah } from '../../utils/formatters'

/**
 * Modal popup confirming product deletion with a summary preview.
 * Strictly mirrors the design shown in the lecture slide.
 */
export default function DeleteProductModal({
  isOpen,
  onClose,
  product,
  onConfirmDelete,
}) {
  if (!product) return null

  const handleConfirm = () => {
    onConfirmDelete(product.id)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {/* Close Button top-right */}
        <div className="flex justify-end -mt-2 -mr-2">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trash Icon */}
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-100 mb-3">
          <Trash2 className="w-7 h-7" />
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-bold text-slate-900">Hapus Produk?</h3>
        <p className="text-sm text-slate-500 mt-1">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        {/* Product Preview Card */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 my-5 text-left">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            ID: {product.id}
          </span>
          <h4 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">
            {product.name}
          </h4>
          <p className="text-base font-bold text-blue-600 mt-0.5">
            {formatRupiah(product.price)}
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button variant="outline" size="md" onClick={onClose} className="w-full">
            Batal
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={handleConfirm}
            className="w-full"
          >
            Hapus Produk
          </Button>
        </div>
      </div>
    </Modal>
  )
}
