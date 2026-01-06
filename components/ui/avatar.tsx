import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Neon-themed color palette (hex values for inline styles)
const AVATAR_COLORS = [
  "#a855f7", // purple-500
  "#ec4899", // pink-500
  "#8b5cf6", // violet-500
  "#d946ef", // fuchsia-500
  "#6366f1", // indigo-500
  "#3b82f6", // blue-500
  "#06b6d4", // cyan-500
  "#f43f5e", // rose-500
]

// Generate consistent color based on name
function getColorFromName(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}

// Extract initials from name (max 2 characters)
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold text-white shrink-0",
  {
    variants: {
      size: {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  name: string
}

function Avatar({ name, size, className, style, ...props }: AvatarProps) {
  const initials = getInitials(name)
  const bgColor = getColorFromName(name)

  return (
    <span
      data-slot="avatar"
      className={cn(avatarVariants({ size }), className)}
      style={{ backgroundColor: bgColor, ...style }}
      {...props}
    >
      {initials}
    </span>
  )
}

export { Avatar, avatarVariants }
