"use client"

import type React from "react"
import ScrollToTop from "@/components/scroll-to-top"

import { useState, useEffect, useRef } from "react"
import { useScrollPosition } from "@/hooks/useScrollPosition"
import { useWindowSize } from "@/hooks/useWindowSize"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu, X, ChevronLeft, ChevronRight, Play, ArrowLeft, Instagram, Facebook, Linktree } from "@/components/ui/icons"
import SharedContactFooter from "@/components/shared-contact-footer"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isNavbarVisible } = useScrollPosition()
  const { width: windowWidth } = useWindowSize()
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [currentDJIndex, setCurrentDJIndex] = useState(0)
  
  const heroImages = [
    "/images/encabezado 1.webp",
    "/images/encabezado 2.webp",
    "/images/encabezado 3.webp",
    "/images/encabezado 4.webp",
    "/images/encabezado 5.webp",
    "/images/encabezado 6.webp",
  ]
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  

  const eventCarouselRef = useRef<HTMLDivElement>(null)
  const djCarouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const events: Array<any> = []

  const artists = [
    {
      id: "01",
      name: "DANI LEÓN",
      image: "/images/dani-leon.webp",
      slug: "dani-leon",
    },
    {
      id: "02",
      name: "BALTA",
      image: "/images/balta.webp",
      slug: "balta",
    },
    {
      id: "03",
      name: "KEVIN BALBI",
      image: "/images/kevin-balbi.webp",
      slug: "kevin-balbi",
    },
    {
      id: "04",
      name: "UNUSUAL SOUL",
      image: "/images/unusual-soul.webp",
      slug: "unusual-soul",
    },
  ]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(intervalId)
  }, [heroImages.length])

  const handleMouseDown = (e: React.MouseEvent, carouselRef: React.RefObject<HTMLDivElement | null>) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent, carouselRef: React.RefObject<HTMLDivElement | null>) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent, carouselRef: React.RefObject<HTMLDivElement | null>) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent, carouselRef: React.RefObject<HTMLDivElement | null>) => {
    if (!isDragging || !carouselRef.current) return
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  const getDJTransform = () => {
    // Si windowWidth no está disponible, usar mobile por defecto
    if (!windowWidth || windowWidth < 1024) {
      // Mobile: 1 artista por vista, cada uno ocupa 100%
      return `translateX(-${currentDJIndex * 100}%)`
    } else {
      // Desktop: 3 artistas por vista, cada uno ocupa 33.333%
      return `translateX(-${currentDJIndex * 33.333}%)`
    }
  }

  const nextDJ = () => {
    if (windowWidth && windowWidth >= 1024) {
      // Desktop: mostrar 3 artistas, avanzar de 3 en 3
      setCurrentDJIndex((prev) => Math.min(prev + 3, Math.max(0, artists.length - 3)))
    } else {
      // Mobile: mostrar 1 artista, avanzar de 1 en 1
      setCurrentDJIndex((prev) => (prev + 1) % artists.length)
    }
  }

  const prevDJ = () => {
    if (windowWidth && windowWidth >= 1024) {
      // Desktop: mostrar 3 artistas, retroceder de 3 en 3
      setCurrentDJIndex((prev) => Math.max(prev - 3, 0))
    } else {
      // Mobile: mostrar 1 artista, retroceder de 1 en 1
      setCurrentDJIndex((prev) => (prev - 1 + artists.length) % artists.length)
    }
  }

  return (
    <div className="min-h-screen bg-[#181313] text-[#D4CFBC] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 md:pt-28 lg:pt-20 lg:h-screen overflow-hidden">
        <div className="absolute inset-x-0 top-14 md:top-20 lg:top-[7.5rem] xl:top-36 bottom-0">
          {heroImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Hero ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                index === 5
                  ? "object-[40%_60%] md:object-center" // encabezado 6: más a la derecha, top igual
                  : index === 4
                  ? "object-[90%_50%] md:object-center" // encabezado 5: más a la derecha en mobile
                  : index === 0
                  ? "object-[80%_70%] md:object-center" // encabezado 1: más top en mobile
                  : "object-[80%_50%] md:object-center"
               } ${index === currentHeroIndex ? "opacity-100" : "opacity-0"}`}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 top-14 md:top-20 lg:top-[7.5rem] xl:top-36 bottom-0 bg-gradient-to-b from-black/60 to-black/80 z-10" />

        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-30 bg-[#181313]/90 backdrop-blur-sm border-b border-[#D4CFBC]/10 transition-transform duration-300 ${
            isNavbarVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between py-2 px-4 lg:px-6">
            <div className="w-24 lg:w-32">
              <Image
                src="/images/nextstage-logo.png"
                alt="NEXTSTAGE"
                width={160}
                height={40}
                className="w-full h-auto"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-6 text-xs lg:text-sm font-medium tracking-[0.2em] uppercase">
              <Link
                href="#inicio"
                className="hover:text-white transition-all duration-300 relative group overflow-hidden py-2"
              >
                INICIO
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/eventos"
                className="hover:text-white transition-all duration-300 relative group overflow-hidden py-2"
              >
                EVENTOS
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/djs" className="hover:text-white transition-all duration-300 relative group overflow-hidden py-2">
                <span className="relative">
                  ARTISTAS
                  <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
              <Link
                href="#servicios"
                className="hover:text-white transition-all duration-300 relative group overflow-hidden py-2"
              >
                SERVICIOS
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#equipo"
                className="hover:text-white transition-all duration-300 relative group overflow-hidden py-2"
              >
                QUIÉNES SOMOS
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a
                href="https://www.notion.so/Next-Stage-Booking-Artistico-177a0ba15b1b80d99163da6be85423af?v=eda3782323e043c9a1fbfd2f97529d71&p=91fc6388b5434390b823e1dd0ca4fde8&pm=s"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-all duration-300 relative group overflow-hidden py-2"
              >
                BLOG
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Link
                href="#contacto"
                className="hover:text-white transition-all duration-300 relative group overflow-hidden py-2"
              >
                CONTACTO
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
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
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#181313] z-[90] lg:hidden">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 left-8 w-12 h-12 rounded-full border border-[#D4CFBC] flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-300"
              aria-label="Close menu"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex flex-col items-center justify-center h-full space-y-12 text-xl font-medium tracking-[0.2em] uppercase">
              <Link
                href="#inicio"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-white transition-colors duration-300 relative group overflow-hidden py-2"
              >
                INICIO
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/eventos"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-white transition-colors duration-300 relative group overflow-hidden py-2"
              >
                EVENTOS
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/djs"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-white transition-colors duration-300 relative group overflow-hidden py-2"
              >
                ARTISTAS
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#servicios"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-white transition-colors duration-300 relative group overflow-hidden py-2"
              >
                SERVICIOS
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#equipo"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-white transition-colors duration-300 relative group overflow-hidden py-2"
              >
                QUIÉNES SOMOS
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a
                href="https://www.notion.so/Next-Stage-Booking-Artistico-177a0ba15b1b80d99163da6be85423af?v=eda3782323e043c9a1fbfd2f97529d71&p=91fc6388b5434390b823e1dd0ca4fde8&pm=s"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-white transition-colors duration-300 relative group overflow-hidden py-2"
              >
                BLOG
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Link
                href="#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-white transition-colors duration-300 relative group overflow-hidden py-2"
              >
                CONTACTO
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-20 flex items-center min-h-[calc(100vh-4rem)] px-4 lg:px-12 pt-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="relative">
              {/* Circular Logo Background */}
              <div className="absolute -top-8 -right-8 lg:-top-16 lg:-right-16 opacity-10">
                <Image
                  src="/images/nextstage-circular-logo.png"
                  alt=""
                  width={120}
                  height={120}
                  className="w-20 h-20 lg:w-32 lg:h-32"
                />
              </div>

              {/* Hero Text */}
              <div className="relative min-h-[180px] lg:min-h-[280px] flex items-center">
                <div className="space-y-5 lg:space-y-7 max-w-5xl">
                  <div className="relative">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight uppercase leading-[1.05]">
                      SOMOS UN BOOKING QUE ENTIENDE LA MÚSICA COMO EXPERIENCIA
                    </h1>
                    <div className="absolute -bottom-2 left-0 w-24 lg:w-32 h-0.5 bg-[#D4CFBC]"></div>
                  </div>
                  <p className="text-sm md:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-90 max-w-4xl">
                    No solo representamos talento, lo hacemos crecer. Next Stage nace con una idea simple: que el
                    talento no se quede quieto, que empiece a ocupar el lugar que merece.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="eventos" className="py-16 lg:py-24 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 lg:mb-20">
            <div className="flex items-center justify-between mb-8">
              <Link href="/eventos" className="group">
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-[0.1em] uppercase group-hover:text-white transition-colors duration-300">
                  EVENTOS
                </h2>
              </Link>
              <div className="w-16 h-px bg-[#D4CFBC]"></div>
            </div>
          </div>

          <div className="relative">
            {events.length === 0 ? (
              <div className="border border-[#D4CFBC]/20 p-8 lg:p-12 bg-black/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 opacity-80">
                    <Image src="/images/nextstage-circular-logo-alt.png" alt="NextStage" width={32} height={32} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-title tracking-tight uppercase">NEXTSTAGE</h3>
                  <div className="flex-1 h-px bg-[#D4CFBC]/60"></div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-title uppercase tracking-[0.1em] mb-2">TO BE ANNOUNCED</div>
                  <p className="opacity-80 mb-6">seguinos en nuestras redes para mantenerte actualizado</p>
                  <div className="flex items-center justify-center gap-4">
                    <Link href="https://www.instagram.com/nextstage.ar" target="_blank" className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all">
                      <Instagram className="w-5 h-5" />
                    </Link>
                    <Link href="https://www.facebook.com/nextstage.ar/" target="_blank" className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all">
                      <Facebook className="w-5 h-5" />
                    </Link>
                    <Link href="https://linktr.ee/nextstagebooking" target="_blank" className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all">
                      <Linktree className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="overflow-hidden cursor-grab active:cursor-grabbing"
                  ref={eventCarouselRef}
                  onMouseDown={(e) => handleMouseDown(e, eventCarouselRef)}
                  onMouseMove={(e) => handleMouseMove(e, eventCarouselRef)}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={(e) => handleTouchStart(e, eventCarouselRef)}
                  onTouchMove={(e) => handleTouchMove(e, eventCarouselRef)}
                  onTouchEnd={handleMouseUp}
                >
                  <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${currentEventIndex * 100}%)` }}
                  >
                    {events.map((event, index) => (
                      <div key={event.id} className="w-full flex-shrink-0 px-2 lg:px-4">
                        <Link href={`/eventos#${event.slug}`}>
                          <Card className="bg-transparent border border-[#D4CFBC]/20 hover:border-[#D4CFBC] transition-all duration-700 overflow-hidden group cursor-pointer">
                            <div className="relative h-48 md:h-64 lg:h-80">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                              <div className="absolute top-4 lg:top-6 right-4 lg:right-6">
                                <Badge className="bg-[#D4CFBC] text-[#181313] font-bold tracking-[0.1em] uppercase text-xs lg:text-sm">
                                  {event.date}
                                </Badge>
                              </div>
                              <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 right-4 lg:right-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-[0.1em] mb-2 lg:mb-4 uppercase">
                                  {event.title}
                                </h3>
                                <div className="w-full h-px bg-[#D4CFBC] mb-2 lg:mb-4"></div>
                                <div className="flex items-center justify-between text-xs lg:text-sm opacity-90 tracking-[0.1em] uppercase">
                                  <span>{event.location}</span>
                                  <span>{event.venue}</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <button
                  onClick={prevEvent}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-6 bg-transparent border border-[#D4CFBC] text-[#D4CFBC] p-3 lg:p-4 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500"
                >
                  <ChevronLeft size={16} className="lg:w-5 lg:h-5" />
                </button>
                <button
                  onClick={nextEvent}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-6 bg-transparent border border-[#D4CFBC] text-[#D4CFBC] p-3 lg:p-4 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500"
                >
                  <ChevronRight size={16} className="lg:w-5 lg:h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artistas" className="py-16 lg:py-24 px-4 lg:px-12 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/djs" className="group">
              <h2 className="text-4xl md:text-6xl font-bold tracking-[0.1em] uppercase group-hover:text-white transition-all duration-500">
                ARTISTAS
              </h2>
            </Link>
            <div className="w-16 h-px bg-[#D4CFBC]"></div>
          </div>

          <div className="relative">
            <div
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              ref={djCarouselRef}
              onMouseDown={(e) => handleMouseDown(e, djCarouselRef)}
              onMouseMove={(e) => handleMouseMove(e, djCarouselRef)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart(e, djCarouselRef)}
              onTouchMove={(e) => handleTouchMove(e, djCarouselRef)}
              onTouchEnd={handleMouseUp}
            >
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ 
                  transform: getDJTransform() 
                }}
              >
                {artists.map((artist, index) => (
                  <div 
                    key={artist.id} 
                    className="w-full lg:w-1/3 flex-shrink-0 px-2 lg:px-4"
                  >
                    <Link href={`/djs/${artist.slug}`} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg bg-[#2a2424]/50 border border-[#D4CFBC]/20 group-hover:border-[#D4CFBC] transition-all duration-500">
                        <div className="aspect-[4/5] relative overflow-hidden">
                          <Image
                            src={artist.image}
                            alt={artist.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-bold tracking-[0.1em] uppercase mb-2 text-[#D4CFBC] group-hover:text-white transition-colors duration-300">
                            {artist.name}
                          </h3>
                          <span className="text-xs tracking-[0.2em] opacity-70 uppercase">ARTISTAS</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevDJ}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-6 bg-transparent border border-[#D4CFBC] text-[#D4CFBC] p-3 lg:p-4 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500"
            >
              <ChevronLeft size={16} className="lg:w-5 lg:h-5" />
            </button>
            <button
              onClick={nextDJ}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-6 bg-transparent border border-[#D4CFBC] text-[#D4CFBC] p-3 lg:p-4 hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500"
            >
              <ChevronRight size={16} className="lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipo" className="py-32 px-4 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/nextstage-circular-logo.png"
            alt="Background Logo"
            width={800}
            height={800}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-32">
            <div className="relative mb-16">
              <div className="flex items-center mb-8">
                <div className="flex-1 h-px bg-[#D4CFBC]"></div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase mx-8 relative">
                  QUIÉNES
                  <span className="block text-4xl md:text-6xl lg:text-7xl mt-2">SOMOS</span>
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 border-2 border-[#D4CFBC] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#D4CFBC] rounded-full"></div>
                  </div>
                </h2>
                <div className="flex-1 h-px bg-[#D4CFBC]"></div>
              </div>
            </div>
          </div>

          <div className="mb-32">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div className="relative">
                <div className="absolute -left-8 top-0 w-1 h-full bg-gradient-to-b from-[#D4CFBC] to-transparent"></div>
                <div className="relative z-10 bg-[#181313] border border-[#D4CFBC]/20 p-12 hover:border-[#D4CFBC] transition-all duration-700">
                  <div className="flex items-center mb-8">
                    <div className="w-8 h-px bg-[#D4CFBC] mr-4"></div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-wider uppercase">NUESTRA MISIÓN</h3>
                  </div>
                  <p className="text-lg leading-relaxed opacity-90 mb-8">
                    En Nextstage, nos dedicamos a convertir sueños en realidades dentro de la industria musical.
                    Representamos y desarrollamos talentos emergentes y consolidados, creando puentes entre artistas y
                    las principales productoras, bares, eventos y plataformas de difusión en Argentina y más allá.
                  </p>
                  <p className="text-lg leading-relaxed opacity-90">
                    Somos una forma distinta de impulsar talento. Nextstage no es solo una agencia; somos un socio
                    estratégico que entiende la dinámica emocional y profesional de los artistas.
                  </p>
                  <div className="mt-8 flex items-center">
                    <div className="w-12 h-12 border border-[#D4CFBC] rounded-full flex items-center justify-center mr-4">
                      <span className="text-sm font-bold">01</span>
                    </div>
                    <div className="flex-1 h-px bg-[#D4CFBC]/30"></div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -right-8 top-0 w-1 h-full bg-gradient-to-b from-[#D4CFBC] to-transparent"></div>
                <div className="relative z-10 bg-[#181313] border border-[#D4CFBC]/20 p-12 hover:border-[#D4CFBC] transition-all duration-700">
                  <div className="flex items-center mb-8">
                    <div className="w-8 h-px bg-[#D4CFBC] mr-4"></div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-wider uppercase">NUESTROS VALORES</h3>
                  </div>
                  <div className="space-y-8">
                    {[
                      { title: "COMPROMISO", desc: "Nos involucramos al 100% en el desarrollo de cada artista." },
                      { title: "INNOVACIÓN", desc: "Aplicamos estrategias modernas para alcanzar el éxito." },
                      {
                        title: "TRANSPARENCIA",
                        desc: "Construimos relaciones basadas en la confianza y el respeto mutuo.",
                      },
                      { title: "PASIÓN", desc: "Nos mueve el amor por la música y el talento creativo." },
                    ].map((value, index) => (
                      <div key={index} className="relative pl-8">
                        <div className="absolute left-0 top-2 w-4 h-4 border border-[#D4CFBC] rotate-45"></div>
                        <h4 className="text-lg font-black tracking-wider uppercase mb-2 text-[#D4CFBC]">
                          {value.title}
                        </h4>
                        <p className="text-sm opacity-80 leading-relaxed">{value.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center">
                    <div className="w-12 h-12 border border-[#D4CFBC] rounded-full flex items-center justify-center mr-4">
                      <span className="text-sm font-bold">02</span>
                    </div>
                    <div className="flex-1 h-px bg-[#D4CFBC]/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-32">
            <div className="text-center mb-20">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-px bg-[#D4CFBC]"></div>
                <h3 className="text-3xl md:text-4xl font-black tracking-wider uppercase mx-8">NUESTRO DIFERENCIAL</h3>
                <div className="w-16 h-px bg-[#D4CFBC]"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "EXPERIENCIA EN LA INDUSTRIA",
                  desc: "Somos un equipo apasionado por la música y los eventos, con experiencia trabajando junto a artistas, productoras y marcas.",
                },
                {
                  number: "02",
                  title: "RED DE CONTACTOS",
                  desc: "Relación directa con bares, clubes, festivales y otros actores de la escena musical en Tucumán y Argentina.",
                },
                {
                  number: "03",
                  title: "INNOVACIÓN Y CREATIVIDAD",
                  desc: "Estrategias únicas y adaptadas para cada proyecto, combinando creatividad con gestión profesional.",
                },
              ].map((item, index) => (
                <div key={index} className="group relative">
                  <div className="bg-[#181313] border border-[#D4CFBC]/20 p-8 h-full hover:border-[#D4CFBC] transition-all duration-700 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4CFBC] to-transparent"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div className="text-4xl font-black text-[#D4CFBC]/20 group-hover:text-[#D4CFBC]/40 transition-colors duration-700">
                          {item.number}
                        </div>
                        <div className="w-8 h-8 border border-[#D4CFBC] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#D4CFBC] rounded-full"></div>
                        </div>
                      </div>
                      <h4 className="text-lg font-black tracking-wider uppercase mb-6 leading-tight">{item.title}</h4>
                      <p className="text-sm opacity-80 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-2 lg:py-4 px-4 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 lg:mb-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-[0.1em] uppercase">SERVICIOS</h2>
              <div className="w-16 h-px bg-[#D4CFBC]"></div>
            </div>
            <p className="text-lg opacity-80 max-w-3xl">
              Ofrecemos soluciones integrales tanto para artistas que buscan desarrollar su carrera como para
              productoras que necesitan talento de calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Services for Artists */}
            <div>
              <h3 className="text-2xl font-bold tracking-[0.1em] uppercase mb-8 text-[#D4CFBC]">PARA ARTISTAS</h3>
              <Accordion type="multiple" className="space-y-4">
                <AccordionItem value="representacion" className="border-b border-[#D4CFBC]/20">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <h4 className="text-lg font-bold tracking-wider uppercase text-[#D4CFBC]">
                      REPRESENTACIÓN ARTÍSTICA PERSONALIZADA
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-sm opacity-80 leading-relaxed text-[#D4CFBC]">
                      Construimos planes de carrera personalizados adaptados a los objetivos individuales de cada
                      artista, combinando sus talentos con las demandas del mercado.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="gestion" className="border-b border-[#D4CFBC]/20">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <h4 className="text-lg font-bold tracking-wider uppercase text-[#D4CFBC]">
                      GESTIÓN DE PRESENTACIONES
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-sm opacity-80 leading-relaxed text-[#D4CFBC]">
                      Nos encargamos de negociar y coordinar presentaciones en eventos, clubes y festivales,
                      garantizando condiciones justas y adecuadas.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="produccion" className="border-b border-[#D4CFBC]/20">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <h4 className="text-lg font-bold tracking-wider uppercase text-[#D4CFBC]">
                      PRODUCCIÓN Y PROMOCIÓN MUSICAL
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-sm opacity-80 leading-relaxed text-[#D4CFBC]">
                      Apoyamos la creación de música original y difundimos lanzamientos en plataformas digitales con
                      estrategias de marketing específicas.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="redes" className="border-b border-[#D4CFBC]/20">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <h4 className="text-lg font-bold tracking-wider uppercase text-[#D4CFBC]">
                      PRESENCIA EN REDES SOCIALES
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-sm opacity-80 leading-relaxed text-[#D4CFBC]">
                      Diseñamos estrategias de branding personal, gestionando contenido y creando comunidades activas en
                      torno a los artistas.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Services for Producers */}
            <div>
              <h3 className="text-2xl font-bold tracking-[0.1em] uppercase mb-8 text-[#D4CFBC]">PARA PRODUCTORAS</h3>
              <Accordion type="multiple" className="space-y-4">
                <AccordionItem value="talento" className="border-b border-[#D4CFBC]/20">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <h4 className="text-lg font-bold tracking-wider uppercase text-[#D4CFBC]">
                      ACCESO A TALENTO EXCLUSIVO
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-sm opacity-80 leading-relaxed text-[#D4CFBC]">
                      Representamos una cartera cuidadosamente seleccionada de artistas, garantizando experiencias memorables
                      en cualquier escenario.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="seleccion" className="border-b border-[#D4CFBC]/20">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <h4 className="text-lg font-bold tracking-wider uppercase text-[#D4CFBC]">SELECCIÓN Y CURADURÍA</h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-sm opacity-80 leading-relaxed text-[#D4CFBC]">
                      Ayudamos a seleccionar artistas adecuados para los eventos, considerando el perfil del público y
                      las tendencias musicales.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="negociaciones" className="border-b border-[#D4CFBC]/20">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <h4 className="text-lg font-bold tracking-wider uppercase text-[#D4CFBC]">
                      NEGOCIACIONES SIMPLIFICADAS
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-sm opacity-80 leading-relaxed text-[#D4CFBC]">
                      Facilitamos el proceso de contratación, gestionando aspectos administrativos para que las
                      productoras se concentren en la producción.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="marketing" className="border-b border-[#D4CFBC]/20">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <h4 className="text-lg font-bold tracking-wider uppercase text-[#D4CFBC]">
                      ESTRATEGIAS DE MARKETING
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-sm opacity-80 leading-relaxed text-[#D4CFBC]">
                      Colaboramos en la promoción de eventos mediante campañas digitales y alianzas estratégicas,
                      asegurando máxima exposición.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      

      {/* Shared Contact Footer */}
      <SharedContactFooter />

      {/* Scroll To Top */}
      <ScrollToTop />
    </div>
  )
}
