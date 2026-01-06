import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

const variants = {
  default: "text-white/80",
  primary: "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]",
  secondary: "text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.7)]",
  success: "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]",
  danger: "text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]",
  warning: "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]",
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
}

interface IconProps {
  icon: LucideIcon
  className?: string
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export function Icon({
  icon: IconComponent,
  className,
  variant = "default",
  size = "md",
}: IconProps) {
  return (
    <IconComponent
      className={cn(
        "transition-all",
        variants[variant],
        sizes[size],
        className
      )}
    />
  )
}
