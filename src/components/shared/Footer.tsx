import { Instagram, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-studio-dark/10 bg-studio-dark text-cream/85">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-display text-xl">
            LENSA <span className="text-gold">STUDIO</span>
          </p>
          <p className="text-sm text-cream/70">
            Self Photo Experience di Bali. Modern, hangat, dan ramah kantong.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-wider text-cream">
            Studio
          </p>
          <p className="flex items-start gap-2 text-cream/70">
            <MapPin className="mt-0.5 h-4 w-4 text-gold" />
            Jl. Pantai Berawa No. 88, Canggu, Bali
          </p>
          <p className="text-cream/70">Setiap hari · 09:00 – 21:00</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-wider text-cream">
            Kontak
          </p>
          <a
            href="mailto:halo@lensastudio.id"
            className="flex items-center gap-2 text-cream/70 hover:text-cream"
          >
            <Mail className="h-4 w-4 text-gold" />
            halo@lensastudio.id
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-cream/70 hover:text-cream"
          >
            <Instagram className="h-4 w-4 text-gold" />
            @lensa.studio
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Lensa Studio. Semua hak dilindungi.
      </div>
    </footer>
  )
}
