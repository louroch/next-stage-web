"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SharedContactFooter from "@/components/shared-contact-footer"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function DJsListingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const djs = [
    {
      slug: "dani-leon",
      name: "DANI LEÓN",
      genres: ["ORGANIC HOUSE", "MELODIC TECHNO", "PROGRESSIVE"],
      description:
        "Médico cirujano y artista sonoro. Su propuesta se mueve entre el organic house, melodic-techno y progressive, con la intención de sanar a través de la música.",
      image: "/placeholder.svg?height=600&width=600&text=Dani+León",
      specialty: "Sanador y Energético",
    },
    {
      slug: "balta",
      name: "BALTA",
      genres: ["INDIE DANCE", "PROGRESSIVE", "MELODIC TECHNO"],
      description:
        "DJ y productor originario de Tucumán. Versátil artista que se adapta a cualquier género, especializado en indie dance, progressive house y melodic techno.",
      image: "/placeholder.svg?height=600&width=600&text=Balta",
      specialty: "Grooves Envolventes",
    },
    {
      slug: "kevin-balbi",
      name: "KEVIN BALBI",
      genres: ["TECH HOUSE", "UK GARAGE", "DEEP HOUSE"],
      description:
        "DJ y productor tucumano que hace del house su idioma. Sus sets son viajes musicales que recorren el Tech House, UK Garage, Deep y Minimal House.",
      image: "/placeholder.svg?height=600&width=600&text=Kevin+Balbi",
      specialty: "House Energy",
    },
  ]

  return (
    <div className="min-h-screen bg-[#181313] text-[#D4CFBC]">
      {/* Header */}
      <header className="flex items-center justify-between p-6 lg:p-8 relative">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/images/nextstage-logo.png" alt="NEXTSTAGE" width={120} height={40} className="h-8 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors relative group"
          >
            INICIO
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/eventos"
            className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors relative group"
          >
            EVENTOS
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/djs" className="text-sm font-medium tracking-wider uppercase text-white relative">
            DJS
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4CFBC]"></span>
          </Link>
          <Link
            href="/#equipo"
            className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors relative group"
          >
            EQUIPO
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#contacto"
            className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors relative group"
          >
            CONTACTO
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col space-y-1 z-[100] relative"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-[#D4CFBC] transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-[#D4CFBC] transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-[#D4CFBC] transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          ></span>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#181313] z-[90] flex flex-col">
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-[#D4CFBC] flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-300"
                aria-label="Close menu"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center space-y-8">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-medium tracking-wider uppercase hover:text-white transition-colors"
              >
                INICIO
              </Link>
              <Link
                href="/eventos"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-medium tracking-wider uppercase hover:text-white transition-colors"
              >
                EVENTOS
              </Link>
              <Link
                href="/djs"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-medium tracking-wider uppercase text-white"
              >
                DJS
              </Link>
              <Link
                href="/#equipo"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-medium tracking-wider uppercase hover:text-white transition-colors"
              >
                EQUIPO
              </Link>
              <Link
                href="/#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-medium tracking-wider uppercase hover:text-white transition-colors"
              >
                CONTACTO
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-8 py-12 relative">
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
                <h1 className="text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-none">ARTISTAS</h1>
                {/* Horizontal line extending from title */}
                <div className="absolute top-1/2 right-0 w-32 lg:w-48 h-0.5 bg-[#D4CFBC] transform -translate-y-1/2"></div>
              </div>

              <p className="text-xl opacity-90 max-w-3xl leading-relaxed font-light">
                Representamos artistas que ya tienen lo que hay que tener. Nosotros nos encargamos de darles el espacio
                que merecen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DJs Grid */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {djs.map((dj) => (
              <Link key={dj.slug} href={`/djs/${dj.slug}`} className="group cursor-pointer">
                <div className="relative mb-6">
                  <div className="aspect-square bg-[#2a2424] rounded-lg overflow-hidden">
                    <Image
                      src={dj.image || "/placeholder.svg"}
                      alt={dj.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-[#D4CFBC] text-[#181313] px-3 py-1 text-xs font-bold tracking-wider uppercase">
                    {dj.specialty}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-wide uppercase group-hover:text-white transition-colors">
                    {dj.name}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {dj.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 border border-[#D4CFBC] border-opacity-50 text-xs tracking-widest uppercase"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm opacity-90 leading-relaxed">{dj.description}</p>

                  <Button className="w-full bg-transparent border border-[#D4CFBC] text-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] py-3 text-xs font-medium tracking-widest uppercase rounded-none transition-all duration-300">
                    VER PERFIL
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 lg:px-8 py-16 border-t border-[#2a2424]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-wider uppercase mb-8">¿BUSCAS TALENTO PARA TU EVENTO?</h2>
          <p className="text-lg opacity-90 mb-8">
            Conectemos y llevemos tu evento al siguiente nivel con nuestros artistas.
          </p>
          <Button className="bg-[#D4CFBC] text-[#181313] hover:bg-white px-12 py-6 text-sm font-medium tracking-widest uppercase rounded-none transition-all duration-300">
            CONTACTAR AHORA
          </Button>
        </div>
      </section>

      <SharedContactFooter />
    </div>
  )
}
