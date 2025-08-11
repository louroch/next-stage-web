"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Instagram,
  Facebook,
  Music,
  ExternalLink,
  ArrowLeft,
  Menu,
  X,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  WhatsApp,
  Linktree,
} from "@/components/ui/icons"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import SharedNavbar from "@/components/shared-navbar"
import ScrollToTop from "@/components/scroll-to-top"

export default function ArtistProfile() {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [activeSection, setActiveSection] = useState("bio")

  const artistData = {
    name: "BALTA",
    genres: "TECHNO / MINIMAL / UNDERGROUND",
    number: "003",
    image: "/placeholder.svg?height=800&width=600",
    bio: "Actualmente desarrolla su música y contenido visual bajo el sello Green Groove, un proyecto propio que representa su siguiente paso creativo. Hoy, con una visión más sólida y una identidad bien marcada, se proyecta hacia el Next Stage de su carrera.",
    manifesto:
      "Representamos artistas que ya tienen lo que hay que tener. Nosotros nos encargamos de darles el espacio que merecen. Ni promesas vacías, ni flashes falsos. Solo estrategia real y respeto por el proceso.",
    socialLinks: {
      instagram: "#",
      spotify: "#",
      soundcloud: "#",
      facebook: "#",
    },
    gallery: [
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
    ],
    stats: {
      events: "150+",
      countries: "25",
      followers: "50K",
    },
  }

  const nextGallery = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % artistData.gallery.length)
  }

  const prevGallery = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + artistData.gallery.length) % artistData.gallery.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % artistData.gallery.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [artistData.gallery.length])

  return (
    <div className="min-h-screen bg-[#181313] text-[#D4CFBC] font-sans">
      <SharedNavbar currentPage="artist" />
      
      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      {/* Hero Section - Full Screen */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <Image
          src={artistData.image || "/placeholder.svg"}
          alt={artistData.name}
          fill
          className="object-cover filter grayscale"
          priority
        />

        {/* Artist Info Overlay */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Artist Info */}
              <div className="space-y-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs tracking-[0.3em] opacity-70 uppercase">ARTISTAS</span>
                  <span className="text-xs tracking-[0.2em] opacity-70">{artistData.number}</span>
                </div>

                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-[0.05em] mb-4 uppercase leading-none">
                    {artistData.name}
                  </h1>
                  <div className="w-full h-px bg-[#D4CFBC] mb-6"></div>
                  <p className="text-sm md:text-base tracking-[0.15em] opacity-80 uppercase">{artistData.genres}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 lg:pt-8">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider">
                      {artistData.stats.events}
                    </div>
                    <div className="text-xs tracking-[0.2em] opacity-70 uppercase">EVENTOS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider">
                      {artistData.stats.countries}
                    </div>
                    <div className="text-xs tracking-[0.2em] opacity-70 uppercase">PAÍSES</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider">
                      {artistData.stats.followers}
                    </div>
                    <div className="text-xs tracking-[0.2em] opacity-70 uppercase">SEGUIDORES</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 pt-6 lg:pt-8">
                  <Button
                    size="lg"
                    className="bg-[#D4CFBC] text-[#181313] hover:bg-white transition-all duration-500 text-xs sm:text-sm font-bold tracking-[0.2em] px-6 sm:px-8 py-3 uppercase w-full sm:w-auto"
                  >
                    BOOKING
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#D4CFBC] text-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500 text-xs sm:text-sm font-bold tracking-[0.2em] px-6 sm:px-8 py-3 uppercase bg-transparent w-full sm:w-auto"
                  >
                    ESCUCHAR
                  </Button>
                </div>
              </div>

              {/* Right Side - Interactive Elements */}
              <div className="hidden lg:flex flex-col items-end space-y-8">
                <div className="w-16 h-16 border border-[#D4CFBC] rounded-full flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500 cursor-pointer">
                  <Play size={24} className="ml-1" />
                </div>
                <div className="w-16 h-16 border border-[#D4CFBC] rounded-full flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500 cursor-pointer">
                  <Music size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-px h-12 bg-[#D4CFBC] opacity-50 animate-pulse" />
        </div>
      </section>

      {/* Content Navigation */}
      <section className="py-12 px-6 lg:px-12 border-b border-[#D4CFBC]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-6 sm:space-x-8 lg:space-x-12 text-xs sm:text-sm tracking-[0.2em] uppercase">
            {["bio", "galeria", "redes"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`transition-all duration-500 relative ${
                  activeSection === section ? "text-white" : "text-[#D4CFBC] hover:text-white"
                }`}
              >
                {section === "bio" ? "BIOGRAFÍA" : section === "galeria" ? "GALERÍA" : "REDES"}
                {activeSection === section && (
                  <span className="absolute -bottom-2 left-0 w-full h-px bg-[#D4CFBC]"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Biography Section */}
          {activeSection === "bio" && (
            <div className="space-y-16 animate-in fade-in duration-700">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.1em] uppercase mb-8 lg:mb-12">
                  BIOGRAFÍA
                </h2>
                <p className="text-base sm:text-lg md:text-xl tracking-[0.05em] leading-relaxed opacity-90 mb-12 lg:mb-16">
                  {artistData.bio}
                </p>
              </div>

              {/* Manifesto */}
              <div className="bg-black/30 p-6 sm:p-8 lg:p-12 xl:p-20 text-center relative">
                <div className="absolute top-6 right-6">
                  <ArrowUpRight className="w-8 h-8 text-[#D4CFBC]" />
                </div>
                <p className="text-lg sm:text-xl md:text-2xl tracking-[0.05em] leading-relaxed opacity-90 max-w-4xl mx-auto">
                  {artistData.manifesto}
                </p>
                <div className="w-full h-px bg-[#D4CFBC] mt-8"></div>
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {activeSection === "galeria" && (
            <div className="space-y-12 animate-in fade-in duration-700">
              <h2 className="text-3xl md:text-4xl font-bold tracking-[0.1em] uppercase text-center mb-12">GALERÍA</h2>

              {/* Main Gallery Image */}
              <div className="relative">
                <div className="overflow-hidden">
                  <Image
                    src={artistData.gallery[currentGalleryIndex] || "/placeholder.svg"}
                    alt={`Gallery ${currentGalleryIndex + 1}`}
                    width={1200}
                    height={600}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Navigation */}
                <button
                  onClick={prevGallery}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-transparent border border-[#D4CFBC] text-[#D4CFBC] p-4 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextGallery}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent border border-[#D4CFBC] text-[#D4CFBC] p-4 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Counter */}
                <div className="absolute bottom-6 right-6">
                  <Badge className="bg-[#D4CFBC] text-[#181313] font-bold tracking-[0.1em]">
                    {currentGalleryIndex + 1}/{artistData.gallery.length}
                  </Badge>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
                {artistData.gallery.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer transition-all duration-500 ${
                      index === currentGalleryIndex
                        ? "opacity-100 border-2 border-[#D4CFBC]"
                        : "opacity-50 hover:opacity-80"
                    }`}
                    onClick={() => setCurrentGalleryIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-20 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Networks Section */}
          {activeSection === "redes" && (
            <div className="space-y-16 animate-in fade-in duration-700">
              <h2 className="text-3xl md:text-4xl font-bold tracking-[0.1em] uppercase text-center mb-12">
                REDES SOCIALES
              </h2>

              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <Link
                    href={artistData.socialLinks.instagram}
                    className="group p-4 sm:p-6 lg:p-8 border border-[#D4CFBC]/20 hover:border-[#D4CFBC] hover:bg-[#D4CFBC]/5 transition-all duration-500"
                  >
                    <div className="flex items-center space-x-4">
                      <Instagram size={32} className="group-hover:scale-110 transition-transform duration-500" />
                      <div>
                        <div className="text-lg font-bold tracking-[0.1em] uppercase">INSTAGRAM</div>
                        <div className="text-sm opacity-70 tracking-[0.1em]">@{artistData.name.toLowerCase()}</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href={artistData.socialLinks.spotify}
                    className="group p-4 sm:p-6 lg:p-8 border border-[#D4CFBC]/20 hover:border-[#D4CFBC] hover:bg-[#D4CFBC]/5 transition-all duration-500"
                  >
                    <div className="flex items-center space-x-4">
                      <Music size={32} className="group-hover:scale-110 transition-transform duration-500" />
                      <div>
                        <div className="text-lg font-bold tracking-[0.1em] uppercase">SPOTIFY</div>
                        <div className="text-sm opacity-70 tracking-[0.1em]">ESCUCHAR AHORA</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href={artistData.socialLinks.soundcloud}
                    className="group p-4 sm:p-6 lg:p-8 border border-[#D4CFBC]/20 hover:border-[#D4CFBC] hover:bg-[#D4CFBC]/5 transition-all duration-500"
                  >
                    <div className="flex items-center space-x-4">
                      <ExternalLink size={32} className="group-hover:scale-110 transition-transform duration-500" />
                      <div>
                        <div className="text-lg font-bold tracking-[0.1em] uppercase">SOUNDCLOUD</div>
                        <div className="text-sm opacity-70 tracking-[0.1em]">MIXES & SETS</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href={artistData.socialLinks.facebook}
                    className="group p-4 sm:p-6 lg:p-8 border border-[#D4CFBC]/20 hover:border-[#D4CFBC] hover:bg-[#D4CFBC]/5 transition-all duration-500"
                  >
                    <div className="flex items-center space-x-4">
                      <Facebook size={32} className="group-hover:scale-110 transition-transform duration-500" />
                      <div>
                        <div className="text-lg font-bold tracking-[0.1em] uppercase">FACEBOOK</div>
                        <div className="text-sm opacity-70 tracking-[0.1em]">EVENTOS & NOTICIAS</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 px-6 lg:px-12 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.1em] uppercase mb-6 lg:mb-8">
            BOOKING
          </h2>
          <div className="w-24 h-px bg-[#D4CFBC] mx-auto mb-12"></div>
          <p className="text-base sm:text-lg tracking-[0.1em] opacity-90 uppercase max-w-2xl mx-auto mb-8 lg:mb-12">
            PARA CONTRATACIONES Y COLABORACIONES CONTACTA DIRECTAMENTE CON NUESTRO EQUIPO
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
            <Button
              size="lg"
              className="bg-[#D4CFBC] text-[#181313] hover:bg-white transition-all duration-500 text-xs sm:text-sm font-bold tracking-[0.2em] px-8 sm:px-10 lg:px-12 py-3 lg:py-4 uppercase w-full sm:w-auto"
            >
              CONTACTAR AHORA
            </Button>
            <div className="text-sm tracking-[0.1em] opacity-70 text-center">
              <p>BOOKING@NEXTSTAGE.COM</p>
              <p>+34 600 123 456</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="w-28 mb-6">
                <Image
                  src="/images/nextstage-logo-alt.png"
                  alt="NEXTSTAGE"
                  width={112}
                  height={28}
                  className="w-full h-auto opacity-70"
                />
              </div>
              <p className="text-xs opacity-50 leading-relaxed tracking-[0.1em] uppercase">
                REPRESENTACIÓN DE ARTISTAS
                <br />
                PRODUCCIÓN DE EVENTOS
                <br />
                ESTRATEGIA MUSICAL
              </p>
            </div>

            <div>
              <h4 className="font-bold tracking-[0.1em] mb-6 uppercase text-sm">ENLACES</h4>
              <div className="space-y-3 text-xs tracking-[0.1em] uppercase">
                <Link href="/#inicio" className="block hover:text-white transition-colors duration-500">
                  INICIO
                </Link>
                <Link href="/events" className="block hover:text-white transition-colors duration-500">
                  EVENTOS
                </Link>
                <Link href="/#artistas" className="block hover:text-white transition-colors duration-500">
                  ARTISTAS
                </Link>
                <Link href="/#contacto" className="block hover:text-white transition-colors duration-500">
                  CONTACTO
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold tracking-[0.1em] mb-6 uppercase text-sm">SERVICIOS</h4>
              <div className="space-y-3 text-xs tracking-[0.1em] uppercase">
                <p>BOOKING</p>
                <p>MANAGEMENT</p>
                <p>PRODUCCIÓN</p>
                <p>CONSULTORÍA</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold tracking-[0.1em] mb-6 uppercase text-sm">REDES</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://www.instagram.com/nextstage.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                >
                  <Instagram size={16} className="group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <Link
                  href="https://www.facebook.com/nextstage.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                >
                  <Facebook size={16} className="group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <Link
                  href="https://api.whatsapp.com/send?phone=543814781887&fbclid=PAQ0xDSwMHJ4RleHRuA2FlbQIxMAABpyOa7Qbzrla0GeMDiu2OnqYFLcO-fuZr-STK5WujO06HZdCiIJH4Ch9vZOnQ_aem_yETdk4r4lbOX0JCQmBa_Mg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                >
                  <WhatsApp size={16} className="group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <Link
                  href="https://linktr.ee/nextstagebooking?fbclid=PAQ0xDSwMHJ8NleHRuA2FlbQIxMQABp-sX24PSxrDsX9ys4K19lwV3lxxs8eM713XriVJtc0AAkj0vMFZwEbql4bNV_aem_bFaHlJnhABHk82i2S54Mzg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                >
                  <Linktree size={16} className="group-hover:scale-110 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-[#D4CFBC]/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs opacity-50 mb-4 md:mb-0 tracking-[0.1em] uppercase">
              © 2025 NEXTSTAGE. TODOS LOS DERECHOS RESERVADOS.
            </p>
            <div className="flex space-x-8 text-xs tracking-[0.1em] uppercase">
              <Link href="#" className="hover:text-white transition-colors duration-500">
                PRIVACIDAD
              </Link>
              <Link href="#" className="hover:text-white transition-colors duration-500">
                TÉRMINOS
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  )
}
