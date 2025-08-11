"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Instagram, Facebook, Twitter, Music, ExternalLink, ArrowLeft, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function DJProfile() {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const djData = {
    name: "KEVIN BALBI",
    genres: "MELODIC TECHNO / HOUSE / INDIE DANCE",
    number: "004",
    image: "/placeholder.svg?height=600&width=500",
    bio: "Actualmente desarrolla su música y contenido visual bajo el sello Green Groove, un proyecto propio que representa su siguiente paso creativo. Hoy, con una visión más sólida y una identidad bien marcada, se proyecta hacia el Next Stage de su carrera.",
    socialLinks: {
      instagram: "#",
      spotify: "#",
      soundcloud: "#",
      facebook: "#",
    },
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  }

  const nextGallery = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % djData.gallery.length)
  }

  const prevGallery = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + djData.gallery.length) % djData.gallery.length)
  }

  return (
    <div className="min-h-screen bg-[#181313] text-[#D4CFBC] font-sans">
      {/* Header */}
      <header className="relative z-30 flex items-center justify-between p-8 lg:p-12">
        <div className="flex items-center space-x-8">
          <Link href="/" className="w-32 lg:w-40">
            <Image src="/images/nextstage-logo.png" alt="NEXTSTAGE" width={160} height={40} className="w-full h-auto" />
          </Link>
          <Link
            href="/"
            className="hidden lg:flex items-center space-x-2 text-sm tracking-[0.2em] uppercase hover:text-white transition-colors duration-500"
          >
            <ArrowLeft size={16} />
            <span>VOLVER</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-12 text-sm font-medium tracking-[0.2em] uppercase">
          <Link href="/#inicio" className="hover:text-white transition-all duration-500 relative group overflow-hidden">
            INICIO
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4CFBC] transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link href="/#djs" className="hover:text-white transition-all duration-500 relative group overflow-hidden">
            DJS
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4CFBC] transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link href="/events" className="hover:text-white transition-all duration-500 relative group overflow-hidden">
            EVENTOS
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4CFBC] transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#contacto"
            className="hover:text-white transition-all duration-500 relative group overflow-hidden"
          >
            CONTACTO
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4CFBC] transition-all duration-500 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-[100] relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#181313] z-[90] lg:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 w-12 h-12 rounded-full border border-[#D4CFBC] flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-300"
            aria-label="Close menu"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex flex-col items-center justify-center h-full space-y-12 text-xl font-medium tracking-[0.2em] uppercase">
            <Link
              href="/#inicio"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-white transition-colors duration-300"
            >
              INICIO
            </Link>
            <Link
              href="/#djs"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-white transition-colors duration-300"
            >
              DJS
            </Link>
            <Link
              href="/events"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-white transition-colors duration-300"
            >
              EVENTOS
            </Link>
            <Link
              href="/#contacto"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-white transition-colors duration-300"
            >
              CONTACTO
            </Link>
          </div>
        </div>
      )}

      {/* DJ Presentation */}
      <section className="py-12 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* DJ Image */}
            <div className="relative">
              <div className="absolute top-6 left-6 z-10">
                <span className="text-xs tracking-[0.2em] opacity-70 uppercase">DJS</span>
              </div>
              <div className="absolute top-6 right-6 z-10">
                <span className="text-xs tracking-[0.2em] opacity-70">{djData.number}</span>
              </div>
              <div className="relative overflow-hidden">
                <Image
                  src={djData.image || "/placeholder.svg"}
                  alt={djData.name}
                  width={500}
                  height={600}
                  className="w-full h-[600px] object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 border border-[#D4CFBC] rounded-full flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500 cursor-pointer">
                    <Play size={20} className="ml-1" />
                  </div>
                  <div className="w-12 h-12 border border-[#D4CFBC] rounded-full flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500 cursor-pointer">
                    <Music size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* DJ Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-[0.1em] mb-6 uppercase leading-tight">
                  {djData.name}
                </h1>
                <div className="w-full h-px bg-[#D4CFBC] mb-6"></div>
                <p className="text-sm tracking-[0.15em] opacity-70 uppercase">{djData.genres}</p>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold tracking-[0.1em] mb-6 uppercase">REDES SOCIALES</h3>
                <div className="flex space-x-6">
                  <Link
                    href={djData.socialLinks.instagram}
                    className="w-14 h-14 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] flex items-center justify-center transition-all duration-500 group"
                  >
                    <Instagram size={24} className="group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <Link
                    href={djData.socialLinks.spotify}
                    className="w-14 h-14 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] flex items-center justify-center transition-all duration-500 group"
                  >
                    <Music size={24} className="group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <Link
                    href={djData.socialLinks.soundcloud}
                    className="w-14 h-14 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] flex items-center justify-center transition-all duration-500 group"
                  >
                    <ExternalLink size={24} className="group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <Link
                    href={djData.socialLinks.facebook}
                    className="w-14 h-14 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] flex items-center justify-center transition-all duration-500 group"
                  >
                    <Facebook size={24} className="group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                </div>
              </div>

              {/* Booking Button */}
              <div className="pt-8">
                <Button
                  size="lg"
                  className="bg-transparent border-2 border-[#D4CFBC] text-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500 text-sm font-bold tracking-[0.2em] px-12 py-4 uppercase"
                >
                  BOOKING
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-24 px-4 lg:px-12 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-[0.1em] uppercase mb-8">BIOGRAFÍA</h2>
            <div className="w-24 h-px bg-[#D4CFBC] mx-auto mb-12"></div>
            <p className="text-lg md:text-xl tracking-[0.05em] leading-relaxed opacity-90 max-w-3xl mx-auto">
              {djData.bio}
            </p>
            <div className="w-full h-px bg-[#D4CFBC] mt-12"></div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-[0.1em] uppercase">GALERÍA</h2>
              <div className="w-16 h-px bg-[#D4CFBC]"></div>
            </div>
          </div>

          {/* Featured Gallery Image */}
          <div className="relative mb-12">
            <div className="overflow-hidden">
              <Image
                src={djData.gallery[currentGalleryIndex] || "/placeholder.svg"}
                alt={`Gallery ${currentGalleryIndex + 1}`}
                width={800}
                height={500}
                className="w-full h-96 md:h-[500px] object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Navigation */}
            <button
              onClick={prevGallery}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-transparent border border-[#D4CFBC] text-[#D4CFBC] p-4 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextGallery}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent border border-[#D4CFBC] text-[#D4CFBC] p-4 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500"
            >
              <ArrowLeft size={20} className="rotate-180" />
            </button>

            {/* Gallery Counter */}
            <div className="absolute bottom-6 right-6">
              <Badge className="bg-[#D4CFBC] text-[#181313] font-bold tracking-[0.1em]">
                {currentGalleryIndex + 1}/{djData.gallery.length}
              </Badge>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {djData.gallery.map((image, index) => (
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
                  className="w-full h-24 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Booking Section */}
      <section className="py-24 px-4 lg:px-12 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-[0.1em] uppercase">BOOKING</h2>
            <div className="w-24 h-px bg-[#D4CFBC] mx-auto"></div>
            <p className="text-lg tracking-[0.1em] opacity-90 uppercase max-w-2xl mx-auto">
              PARA CONTRATACIONES Y COLABORACIONES CONTACTA DIRECTAMENTE CON NUESTRO EQUIPO
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 pt-8">
              <Button
                size="lg"
                className="bg-transparent border-2 border-[#D4CFBC] text-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500 text-sm font-bold tracking-[0.2em] px-12 py-4 uppercase"
              >
                CONTACTAR AHORA
              </Button>
              <div className="text-sm tracking-[0.1em] opacity-70">
                <p>BOOKING@NEXTSTAGE.COM</p>
                <p>+34 600 123 456</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="w-32 mb-6">
                <Image
                  src="/images/nextstage-logo.png"
                  alt="NEXTSTAGE"
                  width={128}
                  height={32}
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
                <Link href="/#djs" className="block hover:text-white transition-colors duration-500">
                  DJS
                </Link>
                <Link href="/events" className="block hover:text-white transition-colors duration-500">
                  EVENTOS
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
                  href="#"
                  className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                >
                  <Instagram size={16} className="group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                >
                  <Facebook size={16} className="group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                >
                  <Twitter size={16} className="group-hover:scale-110 transition-transform duration-500" />
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
    </div>
  )
}
