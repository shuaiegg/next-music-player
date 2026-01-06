"use client"

import { useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const variants = {
  default: "bg-white/15 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
  primary: "bg-gradient-to-r from-purple-600 to-purple-800 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]",
  secondary: "bg-gradient-to-r from-pink-600 to-pink-800 border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.5)]",
  success: "bg-gradient-to-r from-emerald-600 to-green-800 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.5)]",
  danger: "bg-gradient-to-r from-red-600 to-rose-800 border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.5)]",
  warning: "bg-gradient-to-r from-amber-600 to-orange-800 border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.5)]",
}

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  variant?: keyof typeof variants
  className?: string
  title?: string
  showCloseButton?: boolean
}

export function Modal({
  open,
  onClose,
  children,
  variant = "default",
  className,
  title,
  showCloseButton = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (open) {
      const previouslyFocused = document.activeElement as HTMLElement

      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"

      // Focus management - focus first focusable element or modal itself
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )

        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus()
        }
      }

      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = ""
        previouslyFocused?.focus()
      }
    }
  }, [open, handleEscape])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby="modal-description"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative z-10 w-full max-w-md sm:max-w-lg mx-4",
          "backdrop-blur-xl border rounded-3xl p-6",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          variants[variant],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between mb-4">
            {title && (
              <h2
                id="modal-title"
                className="text-xl font-semibold text-white"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  "hover:bg-white/20 focus-visible:bg-white/20",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                  "text-white/70 hover:text-white focus-visible:text-white",
                  "hover:scale-110 active:scale-95",
                  !title && "ml-auto"
                )}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div id="modal-description" className="text-white">
          {children}
        </div>
      </div>
    </div>
  )
}
