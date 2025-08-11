"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SharedContactFooter from "@/components/shared-contact-footer"
import { Instagram, Music, Play, ExternalLink, Calendar, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { notFound } from "next/navigation"

const djsData = {
  "dani-leon": {
    name: "DANI LEÓN",
    genres: ["ORGANIC HOUSE", "MELODIC TECHNO", "PROGRESSIVE"],
    image: "/placeholder.svg?height=600&width=600&text=Dani+León",
    shortBio: "Médico cirujano desde hace más de 30 años, y artista sonoro por vocación.",
    fullBio: [
      "Hay quienes curan con medicina. Otros, con música. Y hay quienes, como él, logran unir ambos caminos.",
      "Médico cirujano desde hace más de 30 años, y artista sonoro por vocación. Su recorrido profesional está marcado por la entrega, la escucha y el deseo profundo de generar bienestar. Y no importa si es en un quirófano o frente a una cabina: su energía siempre está puesta en conectar con el otro.",
      "Su propuesta artística se mueve entre el organic house, melodic-techno y progressive, pero lo que verdaderamente lo define es su intención: sanar. Porque, así como opera con sus manos para transformar cuerpos, con la música busca transformar estados.",
      "Ha compartido cabina con referentes como Kevin di Serna, Mariano Mellino, Los Suruba y Henry Saiz, entre otros. Su viaje musical sigue profundizando en los sonidos melódicos que, como él mismo dice, están hechos para mover más que el cuerpo.",
    ],
    collaborations: [
      "Kevin di Serna",
      "Mariano Mellino",
      "Los Suruba",
      "Henry Saiz",
      "Fede Monachesi",
      "Sebastian Bustos",
      "Budakid",
      "Topo Laroca",
      "Pampa",
      "Antrim",
    ],
  },
  balta: {
    name: "BALTA",
    genres: ["INDIE DANCE", "PROGRESSIVE", "MELODIC TECHNO"],
    image: "/placeholder.svg?height=600&width=600&text=Balta",
    shortBio:
      "DJ y productor originario de Tucumán, encuentra en los sonidos melódicos su forma de expresión más auténtica.",
    fullBio: [
      "BALTA es DJ y productor argentino oriundo de Tucumán, con una propuesta musical enfocada en los grooves envolventes y las melodías con identidad. Un artista con una versatilidad que le permite adaptarse a todo tipo de género, con un sonido que combina lo emocional con lo técnico.",
      "Después de una etapa clave en México, donde tocó en espacios como On Heaven, Bestiario y El Cenote Buuts'Ha, volvió al país con una mirada más amplia y un enfoque artístico potenciado. Esta experiencia lo ayudó a redefinir su dirección musical sin perder su esencia.",
      "Tras su vuelta a Argentina orientó su estilo hacia el progressive, melodic techno e indie dance. Formó parte de Medusa Club compartiendo cabina con referentes como Shai T y Valdovinos, y sigue ampliando su recorrido con nuevos lanzamientos y proyectos.",
      "Actualmente, BALTA continúa expandiendo su identidad musical a través de su primer track y su primera creación audiovisual, ambos desarrollados bajo su propia productora: Green Groove.",
    ],
    collaborations: ["Nacho Khan", "Luciano Le Bihan", "LeandroCor", "SHAI T", "Valdovinos"],
  },
  "kevin-balbi": {
    name: "KEVIN BALBI",
    genres: ["TECH HOUSE", "UK GARAGE", "DEEP HOUSE"],
    image: "/placeholder.svg?height=600&width=600&text=Kevin+Balbi",
    shortBio: "DJ y productor tucumano que hace del house su idioma y del groove su pasaporte.",
    fullBio: [
      "Kevin Balbi no solo pone música, crea escenarios donde el ritmo manda. DJ y productor tucumano, hace del house su idioma y del groove su pasaporte. Sus sets son viajes musicales que recorren El Tech House, el UK Garage, el Deep y el Minimal House.",
      "Para Kevin, cada mezcla es una invitación a moverse, sentir y dejarse llevar. Porque su música no solo se escucha: se baila, se vive y se recuerda.",
      "Su filosofía 'si la música no se comparte, no es música' se siente en cada presentación: b2b con colegas, invitados sorpresa y una entrega total que convierte sus shows en experiencias compartidas, siempre en sintonía con el momento y el lugar.",
      "Con una trayectoria breve pero intensa, Kevin ya dejó huella en escenarios como Boris, Casa Croix, Brucks, Symbiosis y Secret Garden. En este último, sorprendió con su primer set de Afro House, sumando un nuevo color a su propuesta.",
    ],
    collaborations: ["Daniel León", "Green Groove Collective"],
  },
}

export default function DJProfilePage({ params }: { params: { slug: string } }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dj = djsData[params.slug as keyof typeof djsData]

  if (!dj) {
    notFound()
  }

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

      {/* Back to DJs */}
      <div className="px-6 lg:px-8 py-4">
        <Link
          href="/djs"
          className="inline-flex items-center text-sm tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          VOLVER A ARTISTAS
        </Link>
      </div>

      {/* DJ Presentation */}
      <section className="px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-square bg-[#2a2424] rounded-lg overflow-hidden">
                <Image
                  src={dj.image || "/placeholder.svg"}
                  alt={dj.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover filter grayscale"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D4CFBC] rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-[#181313] ml-1" />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight uppercase mb-4">
                  {dj.name.split(" ").map((word, index) => (
                    <span key={index}>
                      {word}
                      {index < dj.name.split(" ").length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <div className="flex flex-wrap gap-2 text-sm tracking-widest uppercase">
                  {dj.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 border border-[#D4CFBC] rounded">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-center space-x-6">
                <Link
                  href="#"
                  className="w-12 h-12 border border-[#D4CFBC] rounded-full flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-12 h-12 border border-[#D4CFBC] rounded-full flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-300 group"
                >
                  <Music className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-12 h-12 border border-[#D4CFBC] rounded-full flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-300 group"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>

              {/* Booking Button */}
              <Button className="bg-[#D4CFBC] text-[#181313] hover:bg-white px-8 py-6 text-sm font-medium tracking-widest uppercase rounded-none transition-all duration-300">
                <Calendar className="w-4 h-4 mr-2" />
                BOOKING
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold tracking-wider uppercase mb-6">BIOGRAFÍA</h2>
            </div>
            <div className="lg:col-span-2 space-y-6">
              {dj.fullBio.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed opacity-90">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="px-6 lg:px-8 py-16 border-t border-[#2a2424]">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold tracking-wider uppercase mb-6">COLABORACIONES</h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-lg leading-relaxed opacity-90 mb-6">Ha compartido cabina con:</p>
              <div className="flex flex-wrap gap-2">
                {dj.collaborations.map((artist) => (
                  <span
                    key={artist}
                    className="px-3 py-1 border border-[#D4CFBC] border-opacity-50 text-sm tracking-wider uppercase"
                  >
                    {artist}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 lg:px-8 py-16 border-t border-[#2a2424]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold tracking-wider uppercase mb-12 text-center">GALERÍA</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square bg-[#2a2424] rounded-lg overflow-hidden group cursor-pointer">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=Gallery+${item}`}
                  alt={`Gallery ${item}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SharedContactFooter />
    </div>
  )
}
