"use client"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Icon } from "@/components/ui/icon"
import { Modal } from "@/components/ui/modal"
import { Heart, Star, Zap, Music, Bell, Settings } from "lucide-react"

export default function PreviewPage() {
  const [modalOpen, setModalOpen] = useState<string | null>(null)
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
        Component Preview
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl text-white mb-2">GlassCard</h2>
        <p className="text-gray-400 mb-4">A card component with frosted glass effect for displaying content sections</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <GlassCard variant="default">
            <p className="text-white font-medium">Default</p>
          </GlassCard>
          <GlassCard variant="primary">
            <p className="text-white font-medium">Primary</p>
          </GlassCard>
          <GlassCard variant="secondary">
            <p className="text-white font-medium">Secondary</p>
          </GlassCard>
          <GlassCard variant="success">
            <p className="text-white font-medium">Success</p>
          </GlassCard>
          <GlassCard variant="danger">
            <p className="text-white font-medium">Danger</p>
          </GlassCard>
          <GlassCard variant="warning">
            <p className="text-white font-medium">Warning</p>
          </GlassCard>
        </div>

        <div className="mt-8 bg-black/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-2">Usage:</p>
          <pre className="text-green-400 text-sm overflow-x-auto">
{`import { GlassCard } from "@/components/ui/glass-card"

<GlassCard variant="primary">
  Your content here
</GlassCard>`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-white mb-2">Icon</h2>
        <p className="text-gray-400 mb-4">Icons for website with neon glow effects</p>

        <div className="flex flex-wrap gap-6 items-end">
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Heart} variant="default" size="lg" />
            <span className="text-gray-400 text-sm">Default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Star} variant="primary" size="lg" />
            <span className="text-gray-400 text-sm">Primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Zap} variant="secondary" size="lg" />
            <span className="text-gray-400 text-sm">Secondary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Music} variant="success" size="lg" />
            <span className="text-gray-400 text-sm">Success</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Bell} variant="danger" size="lg" />
            <span className="text-gray-400 text-sm">Danger</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Settings} variant="warning" size="lg" />
            <span className="text-gray-400 text-sm">Warning</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 items-end">
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Star} variant="primary" size="sm" />
            <span className="text-gray-400 text-xs">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Star} variant="primary" size="md" />
            <span className="text-gray-400 text-xs">md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Star} variant="primary" size="lg" />
            <span className="text-gray-400 text-xs">lg</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Star} variant="primary" size="xl" />
            <span className="text-gray-400 text-xs">xl</span>
          </div>
        </div>

        <div className="mt-8 bg-black/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-2">Usage:</p>
          <pre className="text-green-400 text-sm overflow-x-auto">
{`import { Icon } from "@/components/ui/icon"
import { Star } from "lucide-react"

<Icon icon={Star} variant="primary" size="lg" />`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-white mb-2">Modal</h2>
        <p className="text-gray-400 mb-4">A clean modal dialog with semi-transparent backdrop and glass effect</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => setModalOpen("default")}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-colors"
          >
            Default Modal
          </button>
          <button
            onClick={() => setModalOpen("primary")}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl text-white transition-colors"
          >
            Primary Modal
          </button>
          <button
            onClick={() => setModalOpen("secondary")}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-xl text-white transition-colors"
          >
            Secondary Modal
          </button>
          <button
            onClick={() => setModalOpen("success")}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl text-white transition-colors"
          >
            Success Modal
          </button>
          <button
            onClick={() => setModalOpen("danger")}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 rounded-xl text-white transition-colors"
          >
            Danger Modal
          </button>
          <button
            onClick={() => setModalOpen("warning")}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl text-white transition-colors"
          >
            Warning Modal
          </button>
        </div>

        {/* Modal instances */}
        <Modal
          open={modalOpen === "default"}
          onClose={() => setModalOpen(null)}
          variant="default"
          title="Default Modal"
        >
          <p>This is a default modal with a clean, modern glassmorphism effect.</p>
        </Modal>

        <Modal
          open={modalOpen === "primary"}
          onClose={() => setModalOpen(null)}
          variant="primary"
          title="Primary Modal"
        >
          <p>This is a primary modal with a purple gradient and glow effect.</p>
        </Modal>

        <Modal
          open={modalOpen === "secondary"}
          onClose={() => setModalOpen(null)}
          variant="secondary"
          title="Secondary Modal"
        >
          <p>This is a secondary modal with a pink gradient and glow effect.</p>
        </Modal>

        <Modal
          open={modalOpen === "success"}
          onClose={() => setModalOpen(null)}
          variant="success"
          title="Success Modal"
        >
          <p>This is a success modal with an emerald/green gradient and glow effect.</p>
        </Modal>

        <Modal
          open={modalOpen === "danger"}
          onClose={() => setModalOpen(null)}
          variant="danger"
          title="Danger Modal"
        >
          <p>This is a danger modal with a red gradient and glow effect.</p>
        </Modal>

        <Modal
          open={modalOpen === "warning"}
          onClose={() => setModalOpen(null)}
          variant="warning"
          title="Warning Modal"
        >
          <p>This is a warning modal with an amber/orange gradient and glow effect.</p>
        </Modal>

        <div className="mt-8 bg-black/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-2">Usage:</p>
          <pre className="text-green-400 text-sm overflow-x-auto">
{`import { Modal } from "@/components/ui/modal"

const [open, setOpen] = useState(false)

<Modal
  open={open}
  onClose={() => setOpen(false)}
  variant="primary"
  title="My Modal"
>
  Your content here
</Modal>`}
          </pre>
        </div>
      </section>
    </main>
  )
}
