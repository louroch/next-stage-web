Thought
for 2sRevisé componentes existentesThought for 2sLeí página de eventosLeí
perfil
de
DJAquí
tienes
todo
el
código
completo
de
los
componentes
de
NEXTSTAGE, listos
para
usar
en
tu
proyecto:

\
## 1. Componente de Perfil de DJ

```typescriptreact
// components/dj-profile.tsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Music, Play, ExternalLink, Mail, Calendar } from "lucide-react"

export default function DJProfile() {
  return (
    <div className="min-h-screen bg-[#181313] text-[#D4CFBC]">
      {/* Header */}
      <header className="flex items-center justify-between p-6 lg:p-8">
        <div className="flex items-center">
          <Image src="/nextstage-logo.png" alt="NEXTSTAGE" width={120} height={40} className="h-8 w-auto" />
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors">
            INICIO
          </Link>
          <Link href="#" className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors">
            EVENTOS
          </Link>
          <Link href="#" className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors">
            DJS
          </Link>
          <Link href="#" className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors">
            CONTACTO
          </Link>
        </nav>
      </header>

      {/* DJ Presentation */}
      <section className="px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-square bg-[#2a2424] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="DJ Profile"
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
                  ALEX
                  <br />
                  RIVERA
                </h1>
                <div className="flex flex-wrap gap-2 text-sm tracking-widest uppercase">
                  <span className="px-3 py-1 border border-[#D4CFBC] rounded">MELODIC TECHNO</span>
                  <span className="px-3 py-1 border border-[#D4CFBC] rounded">HOUSE</span>
                  <span className="px-3 py-1 border border-[#D4CFBC] rounded">INDIE DANCE</span>
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
              <p className="text-lg leading-relaxed opacity-90">
                Representamos artistas que ya tienen lo que hay que tener. Nosotros nos encargamos de darles el espacio
                que merecen.
              </p>
              <p className="text-lg leading-relaxed opacity-90">
                Ni promesas vacías, ni flashes falsos. Solo estrategia real y respeto por el proceso. Alex Rivera
                desarrolla su música y contenido visual bajo el sello creativo propio, un proyecto que representa su
                siguiente paso hacia el Next Stage de su carrera.
              </p>
              <p className="text-lg leading-relaxed opacity-90">
                Hoy, con una visión más sólida y una identidad bien marcada, se proyecta hacia el futuro de la escena
                electrónica underground.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold tracking-wider uppercase mb-12 text-center">GALERÍA</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square bg-[#2a2424] rounded-lg overflow-hidden group cursor-pointer">
                <Image
                  src={`/placeholder.svg?height=300&width=300`}
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

      {/* Contact Section */}
      <section className="px-6 lg:px-8 py-16 border-t border-[#2a2424]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-wider uppercase mb-8">CONTACTO</h2>
          <p className="text-lg opacity-90 mb-8">
            ¿Interesado en booking? Conectemos y llevemos tu evento al siguiente nivel.
          </p>
          <Button className="bg-transparent border-2 border-[#D4CFBC] text-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] px-12 py-6 text-sm font-medium tracking-widest uppercase rounded-none transition-all duration-300">
            <Mail className="w-4 h-4 mr-2" />
            ENVIAR MENSAJE
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-12 border-t border-[#2a2424]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center">
              <Image
                src="/nextstage-logo.png"
                alt="NEXTSTAGE"
                width={100}
                height={32}
                className="h-6 w-auto opacity-60"
              />
            </div>

            <div className="flex items-center space-x-8">
              <Link
                href="#"
                className="text-xs tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity"
              >
                INICIO
              </Link>
              <Link
                href="#"
                className="text-xs tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity"
              >
                EVENTOS
              </Link>
              <Link
                href="#"
                className="text-xs tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity"
              >
                DJS
              </Link>
              <Link
                href="#"
                className="text-xs tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity"
              >
                CONTACTO
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="w-8 h-8 border border-[#D4CFBC] border-opacity-30 rounded-full flex items-center justify-center hover:border-opacity-100 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 border border-[#D4CFBC] border-opacity-30 rounded-full flex items-center justify-center hover:border-opacity-100 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-300"
              >
                <Music className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 border border-[#D4CFBC] border-opacity-30 rounded-full flex items-center justify-center hover:border-opacity-100 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#2a2424] text-center">
            <p className="text-xs tracking-wider uppercase opacity-40">
              © 2024 NEXTSTAGE. TODOS LOS DERECHOS RESERVADOS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
