import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SharedContactFooter from "@/components/shared-contact-footer"
import SharedNavbar from "@/components/shared-navbar"
import { Calendar, MapPin, Clock, Users, ExternalLink, Ticket, ArrowLeft, Instagram, Facebook, Linktree } from "@/components/ui/icons"
import ScrollToTop from "@/components/scroll-to-top"

export default function EventosPage() {
  const featuredEvents: any[] = []

  const upcomingEvents: any[] = []

  const pastEvents: any[] = []

  return (
    <div className="min-h-screen bg-[#181313] text-[#D4CFBC]">
      <SharedNavbar currentPage="eventos" />
      
      {/* Spacer for fixed navbar */}
      <div className="h-20 lg:h-20"></div>

      {/* Hero Section */}
      <section className="px-6 lg:px-8 pt-24 lg:pt-16 pb-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-sm tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>VOLVER AL INICIO</span>
            </Link>
          </div>

          <div className="relative">
            {/* Circular logo positioned in top right */}
            <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
              <Image
                src="/images/nextstage-circular-logo-alt.png"
                alt="NextStage Logo"
                width={64}
                height={64}
                className="w-full h-full"
              />
            </div>

            <div className="mb-16">
              {/* Bold title with horizontal line */}
              <div className="relative mb-8">
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-none">EVENTOS</h1>
                {/* Horizontal line extending from title (only large screens) */}
                <div className="hidden lg:block lg:absolute lg:top-1/2 lg:left-full lg:ml-6 lg:w-48 h-0.5 bg-[#D4CFBC] transform -translate-y-1/2"></div>
              </div>

              <p className="text-xl opacity-90 max-w-3xl leading-relaxed font-light">
                Experiencias únicas que conectan artistas y audiencia. Cada evento es una oportunidad de llevar la
                música electrónica al siguiente nivel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event / TBA */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {featuredEvents.length === 0 ? (
            <div className="border border-[#D4CFBC]/20 p-10 bg-black/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 opacity-80">
                  <Image src="/images/nextstage-circular-logo-alt.png" alt="NextStage" width={40} height={40} className="w-full h-full object-contain" />
                </div>
                <h2 className="text-3xl md:text-4xl font-title tracking-tight uppercase">NEXTSTAGE</h2>
                <div className="flex-1 h-px bg-[#D4CFBC]/60"></div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-title uppercase tracking-[0.1em] mb-3">TO BE ANNOUNCED</div>
                <p className="text-lg opacity-90 mb-8">seguinos en nuestras redes para mantenerte actualizado</p>
                <div className="flex items-center justify-center gap-4">
                  <Link href="https://www.instagram.com/nextstage.ar" target="_blank" className="w-12 h-12 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all">
                    <Instagram className="w-6 h-6" />
                  </Link>
                  <Link href="https://www.facebook.com/nextstage.ar/" target="_blank" className="w-12 h-12 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all">
                    <Facebook className="w-6 h-6" />
                  </Link>
                  <Link href="https://linktr.ee/nextstagebooking" target="_blank" className="w-12 h-12 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all">
                    <Linktree className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* existing featured layout here when events exist */}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events / TBA */}
      <section className="px-6 lg:px-8 py-16 border-t border-[#2a2424]">
        <div className="max-w-7xl mx-auto">
          {upcomingEvents.length === 0 ? (
            <></>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* existing cards layout when upcoming events exist */}
            </div>
          )}
        </div>
      </section>

      {/* Past Events (render only when data exists) */}
      {pastEvents.length > 0 && (
        <section className="px-6 lg:px-8 py-16 border-t border-[#2a2424]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-wider uppercase mb-2">EVENTOS PASADOS</h2>
              <div className="w-24 h-0.5 bg-[#D4CFBC]"></div>
            </div>

            <div className="space-y-4">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between py-6 border-b border-[#2a2424] hover:border-[#D4CFBC] transition-colors group"
                >
                  <div className="flex items-center space-x-8">
                    <div className="text-sm opacity-60 min-w-[100px]">{event.date}</div>
                    <div>
                      <h3 className="text-lg font-bold tracking-wide uppercase group-hover:text-white transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {event.venue} - {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs tracking-wider uppercase opacity-60">{event.status}</span>
                    <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section removed per request */}

      <SharedContactFooter />
      <ScrollToTop />
    </div>
  )
}
