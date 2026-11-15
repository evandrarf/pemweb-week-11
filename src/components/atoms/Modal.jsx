import { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Reusable accessible modal dialog with backdrop and keyboard shortcuts.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-md',
}) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-10 transition-all transform scale-100 animate-in fade-in zoom-in-95 duration-150`}
      >
        {/* Header (optional if custom header used) */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-100">
            <div>
              {title && (
                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              )}
              {subtitle && (
                <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer -mr-2 -mt-2"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
