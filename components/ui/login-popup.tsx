"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const variants = {
  default: "bg-white/10 border-white/20",
  primary: "bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]",
  secondary: "bg-gradient-to-r from-pink-500 to-pink-600 border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.5)]",
  success: "bg-gradient-to-r from-emerald-500 to-green-600 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.5)]",
  danger: "bg-gradient-to-r from-red-500 to-rose-600 border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.5)]",
  warning: "bg-gradient-to-r from-amber-500 to-orange-600 border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.5)]",
}

const buttonVariants = {
  default: "bg-white/20 hover:bg-white/30 border-white/20",
  primary: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]",
  secondary: "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.5)]",
  success: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.5)]",
  danger: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.5)]",
  warning: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.5)]",
}

interface LoginPopupProps {
  className?: string
  variant?: keyof typeof variants
  isOpen: boolean
  onClose: () => void
  onSubmit?: (email: string, password: string) => void
  title?: string
}

export function LoginPopup({
  className,
  variant = "default",
  isOpen,
  onClose,
  onSubmit,
  title = "Login",
}: LoginPopupProps) {
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    onSubmit?.(email, password)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup */}
      <div
        className={cn(
          "relative backdrop-blur-xl border rounded-3xl p-8 w-full max-w-md transition-all",
          variants[variant],
          className
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          {title}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white/80 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white/80 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/60 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded bg-white/10 border-white/20"
              />
              Remember me
            </label>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={cn(
              "w-full border rounded-xl px-4 py-3 text-white font-medium transition-all",
              buttonVariants[variant]
            )}
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-white/60 text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
