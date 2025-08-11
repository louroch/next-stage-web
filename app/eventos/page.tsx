import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SharedContactFooter from "@/components/shared-contact-footer"
import { Calendar, MapPin, Clock, Users, ExternalLink, Ticket, ArrowLeft } from "lucide-react"

export default function EventosPage() {
  const featuredEvent = {
    id: 1,
    title: "NEXTSTAGE SHOWCASE",
    date: "15 MAR 2024",
    time: "23:00",
    venue: "WAREHOUSE DISTRICT",
    location: "BUENOS AIRES",
    djs: ["ALEX RIVERA", "KEVIN BALB", "BALTA"],
    image: "/placeholder.svg?height=800&width=1200",
    status: "PRÓXIMO",
  }

  const upcomingEvents = [
    {
      id: 2,
      title: "UNDERGROUND SESSIONS",
      date: "22 MAR 2024",
      time: "22:00",
      venue: "CLUB BASEMENT",
      location: "CÓRDOBA",
      djs: ["BALTA", "GUEST DJ"],
      image: "/placeholder.svg?height=400&width=600",
      status: "ENTRADAS DISPONIBLES",
    },
    {
      id: 3,
      title: "MELODIC NIGHT",
      date: "05 ABR 2024",
      time: "23:30",
      venue: "ROOFTOP VENUE",
      location: "ROSARIO",
      djs: ["ALEX RIVERA", "KEVIN BALB"],
      image: "/placeholder.svg?height=400&width=600",
      status: "EARLY BIRD",
    },
    {
      id: 4,
      title: "TECHNO COLLECTIVE",
      date: "20 ABR 2024",
      time: "22:30",
      venue: "INDUSTRIAL SPACE",
      location: "MENDOZA",
      djs: ["KEVIN BALB", "SPECIAL GUEST"],
      image: "/placeholder.svg?height=400&width=600",
      status: "PRÓXIMAMENTE",
    },
  ]

  const pastEvents = [
    {
      id: 5,
      title: "NEW YEAR CELEBRATION",
      date: "31 DIC 2023",
      venue: "MAIN STAGE",
      location: "BUENOS AIRES",
      status: "FINALIZADO",
    },
    {
      id: 6,
      title: "SUMMER CLOSING",
      date: "15 FEB 2024",
      venue: "BEACH CLUB",
      location: "MAR DEL PLATA",
      status: "FINALIZADO",
    },
  ]

  return (
    <div className="min-h-screen bg-[#181313] text-[#D4CFBC]">
      {/* Header */}
      <header className="flex items-center justify-between p-6 lg:p-8">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/images/nextstage-logo.png" alt="NEXTSTAGE" width={120} height={40} className="h-8 w-auto" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors">
            INICIO
          </Link>
          <Link href="/eventos" className="text-sm font-medium tracking-wider uppercase text-white">
            EVENTOS
          </Link>
          <Link href="/djs" className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors">
            DJS
          </Link>
          <Link
            href="/#contacto"
            className="text-sm font-medium tracking-wider uppercase hover:text-white transition-colors"
          >
            CONTACTO
          </Link>
        </nav>
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
                <h1 className="text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-none">EVENTOS</h1>
                {/* Horizontal line extending from title */}
                <div className="absolute top-1/2 right-0 w-32 lg:w-48 h-0.5 bg-[#D4CFBC] transform -translate-y-1/2"></div>
              </div>

              <p className="text-xl opacity-90 max-w-3xl leading-relaxed font-light">
                Experiencias únicas que conectan artistas y audiencia. Cada evento es una oportunidad de llevar la
                música electrónica al siguiente nivel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-wider uppercase mb-2">EVENTO DESTACADO</h2>
            <div className="w-24 h-0.5 bg-[#D4CFBC]"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] bg-[#2a2424] rounded-lg overflow-hidden">
                <Image
                  src={featuredEvent.image || "/placeholder.svg"}
                  alt={featuredEvent.title}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute top-4 right-4 bg-[#D4CFBC] text-[#181313] px-4 py-2 text-xs font-bold tracking-wider uppercase">
                {featuredEvent.status}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-4xl lg:text-5xl font-bold tracking-tight uppercase mb-4">{featuredEvent.title}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg tracking-wide">{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5" />
                    <span className="text-lg tracking-wide">{featuredEvent.time} HS</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg tracking-wide">
                      {featuredEvent.venue} - {featuredEvent.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span className="text-lg tracking-wide">{featuredEvent.djs.join(" / ")}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#D4CFBC] text-[#181313] hover:bg-white px-8 py-6 text-sm font-medium tracking-widest uppercase rounded-none transition-all duration-300 flex-1">
                  <Ticket className="w-4 h-4 mr-2" />
                  COMPRAR ENTRADAS
                </Button>
                <Button className="bg-transparent border-2 border-[#D4CFBC] text-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] px-8 py-6 text-sm font-medium tracking-widest uppercase rounded-none transition-all duration-300">
                  MÁS INFO
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-6 lg:px-8 py-16 border-t border-[#2a2424]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-wider uppercase mb-2">PRÓXIMOS EVENTOS</h2>
            <div className="w-24 h-0.5 bg-[#D4CFBC]"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="group cursor-pointer">
                <div className="relative mb-6">
                  <div className="aspect-[4/3] bg-[#2a2424] rounded-lg overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-[#D4CFBC] text-[#181313] px-3 py-1 text-xs font-bold tracking-wider uppercase">
                    {event.status}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold tracking-wide uppercase group-hover:text-white transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-sm opacity-90">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {event.date} - {event.time} HS
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {event.venue} - {event.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{event.djs.join(" / ")}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-transparent border border-[#D4CFBC] text-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] py-3 text-xs font-medium tracking-widest uppercase rounded-none transition-all duration-300">
                    VER DETALLES
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
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

      {/* Newsletter Section */}
      <section className="px-6 lg:px-8 py-16 border-t border-[#2a2424]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-wider uppercase mb-8">MANTENTE INFORMADO</h2>
          <p className="text-lg opacity-90 mb-8">
            Suscríbete para recibir información sobre próximos eventos y lanzamientos exclusivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="TU EMAIL"
              className="flex-1 bg-transparent border border-[#D4CFBC] px-4 py-3 text-sm tracking-wider uppercase placeholder:text-[#D4CFBC] placeholder:opacity-60 focus:outline-none focus:border-white transition-colors"
            />
            <Button className="bg-[#D4CFBC] text-[#181313] hover:bg-white px-8 py-3 text-sm font-medium tracking-widest uppercase rounded-none transition-all duration-300">
              SUSCRIBIRSE
            </Button>
          </div>
        </div>
      </section>

      <SharedContactFooter />
    </div>
  )
}
