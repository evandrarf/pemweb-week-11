import { AlertTriangle, RefreshCw } from 'lucide-react'
import Button from '../atoms/Button'

/**
 * ErrorAlert molecule displaying network / backend failure state
 * with actionable retry trigger.
 */
export default function ErrorAlert({
  title = 'Gagal Memuat Data Produk',
  message,
  onRetry,
}) {
  return (
    <div className="bg-red-50/70 border border-red-200 rounded-xl p-6 sm:p-8 text-center my-4 shadow-2xs">
      <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <h3 className="text-base font-semibold text-red-900">{title}</h3>

      <p className="text-sm text-red-700 max-w-md mx-auto mt-1">
        {message || 'Terjadi kesalahan saat berkomunikasi dengan server backend.'}
      </p>

      <div className="mt-2 text-xs text-red-500">
        Tip: Pastikan backend Express.js berjalan di{' '}
        <code className="bg-red-100/80 px-1.5 py-0.5 rounded font-mono text-red-800">
          http://localhost:3000
        </code>
      </div>

      {onRetry && (
        <div className="mt-5 flex items-center justify-center">
          <Button
            variant="danger"
            size="sm"
            onClick={onRetry}
            className="shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            <span>Coba Lagi</span>
          </Button>
        </div>
      )}
    </div>
  )
}
