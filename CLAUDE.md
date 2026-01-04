# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 music player application using the App Router, React 19, Tailwind CSS 4, and shadcn/ui (new-york style).

### Key Patterns

**Custom Hooks**:
- `useMusic` (`hooks/useMusic.ts`) - Manages audio playback state (current track, controls, time/duration, volume)
- `useTheme` (`hooks/useTheme.ts`) - Manages theme preference with localStorage persistence

**Component Structure**:
- `components/musicplayer/` - Music player UI components (MusicPlayer, AllSongs, MusicSection, Navbar)
- `components/game/` - Card game components (separate feature)
- `components/ui/` - shadcn/ui primitives

**Type Definitions**: Shared types in `lib/types.ts` (Song, Card interfaces)

**Audio Files**: Stored in `public/songs/` as `.wav` files

### Path Aliases

Configured in tsconfig.json:
- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/hooks` → `hooks/`

## Conventions

- When creating new page components, always add a link to that page in the header (`components/musicplayer/Navbar.tsx`)

## UI Style Guide

**Design Theme**: Neon gradient with glassmorphism

**Colors**:
- Background: Dark blue gradient (`#1a1a2e` → `#16213e` → `#0f3460`)
- Accent: Purple/pink gradient (`purple-400` to `pink-400`)
- Glass effect: `bg-white/10` with `backdrop-blur-xl` and `border-white/20`

**Component Styling**:
- Use inline Tailwind classes (avoid `@layer components` with `@apply` in Tailwind CSS 4)
- Cards: `bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl`
- Gradient text: `bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`
- Glow effects: `shadow-[0_0_20px_rgba(138,43,226,0.5)]`

**Icons**: Use `lucide-react` for all icons (Play, Pause, SkipBack, SkipForward, Volume2, etc.)
