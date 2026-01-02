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

**Music State Management**: The `useMusic` hook (`hooks/useMusic.ts`) manages all audio playback state including current track, playback controls, time/duration, and volume. Components consume this hook directly rather than through Context.

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
