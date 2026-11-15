import { Pencil, Trash2 } from 'lucide-react'
import Button from '../atoms/Button'
import { formatRupiah } from '../../utils/formatters'

/**
 * ProductCard molecule representing an individual product item.
 * Strictly mirrors the visual layout from the lecture slide.
 */
export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          ID: {product.id}
        </span>
        <h3 className="text-xl font-bold text-slate-900 mt-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-blue-600 mt-1">
          {formatRupiah(product.price)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-6 pt-3 border-t border-slate-100">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(product)}
          className="w-full"
        >
          <Pencil className="w-3.5 h-3.5 text-slate-500" />
          <span>Edit</span>
        </Button>
        <Button
          variant="danger-outline"
          size="sm"
          onClick={() => onDelete(product)}
          className="w-full"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-500" />
          <span>Hapus</span>
        </Button>
      </div>
    </article>
  )
}
