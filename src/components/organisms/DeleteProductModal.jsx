import { useState } from 'react'
import { Trash2, X } from 'lucide-react'
import Modal from '../atoms/Modal'
import Button from '../atoms/Button'
import { formatRupiah } from '../../utils/formatters'

/**
 * Modal popup confirming product deletion with server synchronization.
 */
export default function DeleteProductModal({
  isOpen,
  onClose,
  product,
  onConfirmDelete,
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  if (!product) return null

  const handleConfirm = async () => {
    setIsDeleting(true)
    setDeleteError('')
    try {
      await onConfirmDelete(product.id)
      onClose()
    } catch (err) {
      console.error('Error deleting product:', err)
      setDeleteError(err.message || 'Gagal menghapus produk dari server.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={isDeleting ? undefined : onClose}
    >
      <div className="text-center">
        {/* Close Button top-right */}
        <div className="flex justify-end -mt-2 -mr-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer disabled:opacity-50"
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
          Produk yang dihapus akan dihilangkan permanen dari database server.
        </p>

        {deleteError && (
          <div className="my-3 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg text-left">
            {deleteError}
          </div>
        )}

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
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isDeleting}
            className="w-full"
          >
            Batal
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="w-full"
          >
            {isDeleting ? 'Menghapus...' : 'Hapus Produk'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
