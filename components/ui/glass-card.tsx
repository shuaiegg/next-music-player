import { cn } from "@/lib/utils"

const variants = {
  default: "bg-white/10 border-white/20",
  primary: "bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]",
  secondary: "bg-gradient-to-r from-pink-500 to-pink-600 border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.5)]",
  success: "bg-gradient-to-r from-emerald-500 to-green-600 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.5)]",
  danger: "bg-gradient-to-r from-red-500 to-rose-600 border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.5)]",
  warning: "bg-gradient-to-r from-amber-500 to-orange-600 border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.5)]",
}

interface GlassCardProps {
  className?: string
  children?: React.ReactNode
  variant?: keyof typeof variants
}

export function GlassCard({
  className,
  children,
  variant = "default"
}: GlassCardProps) {
  return (
    <div className={cn(
      "backdrop-blur-xl border rounded-3xl p-6 transition-all",
      variants[variant],
      className
    )}>
      {children}
    </div>
  )
}
