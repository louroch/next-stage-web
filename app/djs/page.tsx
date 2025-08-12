"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SharedContactFooter from "@/components/shared-contact-footer"
import SharedNavbar from "@/components/shared-navbar"
import { ArrowLeft } from "@/components/ui/icons"
import { useState } from "react"
import ScrollToTop from "@/components/scroll-to-top"

export default function ArtistsListingPage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const artists = [
    {
      slug: "dani-leon",
      name: "DANI LEÓN",
      genres: ["ORGANIC HOUSE", "MELODIC TECHNO", "PROGRESSIVE"],
      description:
        "Médico cirujano y artista sonoro. Su propuesta se mueve entre el organic house, melodic-techno y progressive, con la intención de sanar a través de la música.",
      image: "/images/dani-leon.webp",
      specialty: "Sanador y Energético",
    },
    {
      slug: "balta",
      name: "BALTA",
      genres: ["INDIE DANCE", "PROGRESSIVE", "MELODIC TECHNO"],
      description:
        "DJ y productor originario de Tucumán. Versátil artista que se adapta a cualquier género, especializado en indie dance, progressive house y melodic techno.",
      image: "/images/balta.webp",
      specialty: "Grooves Envolventes",
    },
    {
      slug: "kevin-balbi",
      name: "KEVIN BALBI",
      genres: ["TECH HOUSE", "UK GARAGE", "DEEP HOUSE"],
      description:
        "DJ y productor tucumano que hace del house su idioma. Sus sets son viajes musicales que recorren el Tech House, UK Garage, Deep y Minimal House.",
      image: "/images/kevin-balbi.webp",
      specialty: "House Energy",
    },
    {
      slug: "unusual-soul",
      name: "UNUSUAL SOUL",
      genres: ["ELECTRONIC", "AMBIENT", "EXPERIMENTAL"],
      description:
        "Artista electrónico que explora los límites del sonido. Su música trasciende géneros tradicionales creando experiencias únicas y envolventes.",
      image: "/images/unusual-soul.webp",
      specialty: "Experiencias Sonoras",
    },
  ]

  return (
    <div className="min-h-screen bg-[#181313] text-[#D4CFBC]">
      <SharedNavbar currentPage="djs" />
      
      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>


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

      {/* Artists Grid */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <Link key={artist.slug} href={`/djs/${artist.slug}`} className="group cursor-pointer">
                <div className="relative mb-6">
                  <div className="aspect-square bg-[#2a2424] rounded-lg overflow-hidden">
                    <Image
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-[#D4CFBC] text-[#181313] px-3 py-1 text-xs font-bold tracking-wider uppercase">
                    {artist.specialty}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-wide uppercase group-hover:text-white transition-colors">
                    {artist.name}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {artist.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 border border-[#D4CFBC] border-opacity-50 text-xs tracking-widest uppercase"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm opacity-90 leading-relaxed">{artist.description}</p>

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
      <ScrollToTop />
    </div>
  )
}
