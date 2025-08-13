"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SharedContactFooter from "@/components/shared-contact-footer"
import { Instagram, Facebook, Music, ExternalLink, Calendar, ArrowLeft, YouTube, Spotify, Linktree } from "@/components/ui/icons"
import { use, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { notFound } from "next/navigation"
import SharedNavbar from "@/components/shared-navbar"
import ScrollToTop from "@/components/scroll-to-top"

interface SocialLinks {
  instagram?: string
  spotify?: string
  youtube?: string
  linktree?: string
}

interface DJData {
  name: string
  genres: string[]
  image: string
  shortBio: string
  fullBio: string[]
  collaborations: string[]
  socialLinks?: SocialLinks
  galleryImages?: string[]
}

const djsData: Record<string, DJData> = {
  "dani-leon": {
    name: "DANI LEÓN",
    genres: ["ORGANIC HOUSE", "MELODIC TECHNO", "PROGRESSIVE"],
    image: "/images/dani-leon.webp",
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
    socialLinks: {
      instagram: "https://www.instagram.com/danielleon5?igsh=MTAwdGlqOWU0Z2xiOQ==",
    },
    galleryImages: [
      "/images/dani 1.webp",
      "/images/dani 2.webp",
      "/images/dani 3.webp",
      "/images/dani 4.webp",
    ],
  },
  balta: {
    name: "BALTA",
    genres: ["INDIE DANCE", "PROGRESSIVE", "MELODIC TECHNO"],
    image: "/images/balta.webp",
    shortBio:
      "DJ y productor originario de Tucumán, encuentra en los sonidos melódicos su forma de expresión más auténtica.",
    fullBio: [
      "BALTA es DJ y productor argentino oriundo de Tucumán, con una propuesta musical enfocada en los grooves envolventes y las melodías con identidad. Un artista con una versatilidad que le permite adaptarse a todo tipo de género, con un sonido que combina lo emocional con lo técnico.",
      "Después de una etapa clave en México, donde tocó en espacios como On Heaven, Bestiario y El Cenote Buuts'Ha, volvió al país con una mirada más amplia y un enfoque artístico potenciado. Esta experiencia lo ayudó a redefinir su dirección musical sin perder su esencia.",
      "Tras su vuelta a Argentina orientó su estilo hacia el progressive, melodic techno e indie dance. Formó parte de Medusa Club compartiendo cabina con referentes como Shai T y Valdovinos, y sigue ampliando su recorrido con nuevos lanzamientos y proyectos.",
      "Actualmente, BALTA continúa expandiendo su identidad musical a través de su primer track y su primera creación audiovisual, ambos desarrollados bajo su propia productora: Green Groove.",
    ],
    collaborations: ["Nacho Khan", "Luciano Le Bihan", "LeandroCor", "SHAI T", "Valdovinos"],
    socialLinks: {
      instagram: "https://www.instagram.com/balta.dj",
      linktree: "https://linktr.ee/balta.dj?fbclid=PAQ0xDSwMIdjhleHRuA2FlbQIxMQABp_QQKDugkWIX29IKtZG5b68F67-YPM9m3Nm-0b38nDIQm8RdSHvHkG6YpOV8_aem_3CyafQwf7iDmIgcDthkafA",
      youtube: "https://m.youtube.com/@BALTAMusicc?fbclid=PAQ0xDSwMIdk1leHRuA2FlbQIxMAABpwtDED1X2-_wELJ8Kxuk5YVELsKtuDK5rC7Y9vJujE8NVyb-6RQ9skJEg8-N_aem_yodPWxtvFjY24giyRJTeow",
    },
    galleryImages: [
      "/images/balta 1.webp",
      "/images/balta 2.webp",
      "/images/balta 3.webp",
      "/images/balta 4.webp",
    ],
  },
  "kevin-balbi": {
    name: "KEVIN BALBI",
    genres: ["TECH HOUSE", "UK GARAGE", "DEEP HOUSE"],
    image: "/images/kevin-balbi.webp",
    shortBio: "DJ y productor tucumano que hace del house su idioma y del groove su pasaporte.",
    fullBio: [
      "Kevin Balbi no solo pone música, crea escenarios donde el ritmo manda. DJ y productor tucumano, hace del house su idioma y del groove su pasaporte. Sus sets son viajes musicales que recorren El Tech House, el UK Garage, el Deep y el Minimal House.",
      "Para Kevin, cada mezcla es una invitación a moverse, sentir y dejarse llevar. Porque su música no solo se escucha: se baila, se vive y se recuerda.",
      "Su filosofía 'si la música no se comparte, no es música' se siente en cada presentación: b2b con colegas, invitados sorpresa y una entrega total que convierte sus shows en experiencias compartidas, siempre en sintonía con el momento y el lugar.",
      "Con una trayectoria breve pero intensa, Kevin ya dejó huella en escenarios como Boris, Casa Croix, Brucks, Symbiosis y Secret Garden. En este último, sorprendió con su primer set de Afro House, sumando un nuevo color a su propuesta.",
    ],
    collaborations: ["Daniel León", "Green Groove Collective"],
    socialLinks: {
      instagram: "https://www.instagram.com/kevinbalbi.music?igsh=enRxZnF0MWRlM3o3",
      youtube: "https://m.youtube.com/@kevinbalbimusic?fbclid=PAQ0xDSwMIdo1leHRuA2FlbQIxMAABp5eUv5WFqhzCheC2nMe0w-Y432rKsfAG8V7SNOxEQrpWwug5acPCT5Yko0td_aem_GjH74lrZDWT-NhZNYY-H7w",
    },
    galleryImages: [
      "/images/kevin 1.webp",
      "/images/kevin 2.webp",
      "/images/kevin 3.webp",
      "/images/kevin 4.webp",
    ],
  },
  "unusual-soul": {
    name: "UNUSUAL SOUL",
    genres: ["PROGRESSIVE"],
    image: "/images/unusual-soul.webp",
    shortBio: "DJ y productor detallista, meticuloso y apasionado por el progressive, con melodías hipnóticas y profundidad emocional.",
    fullBio: [
      "Unusual Soul no solo busca sonar bien, busca resonar.",
      "DJ y productor detallista, meticuloso y apasionado por el progressive, su sonido combina melodías hipnóticas, estructuras sólidas y una profundidad emocional que invita a viajar con los ojos cerrados.",
      "Nacido en Tucumán, encontró en el universo sonoro de referentes como Hernán Cattáneo, Cid Inc. y Nick Warren el impulso que lo llevó a descubrir y pulir su propia identidad artística.",
      "Durante años, se enfocó en crecer desde adentro hacia afuera: perfeccionó sus habilidades, lanzó música en sellos como Mango Alley, Juicebox y Warpp, y fue ganando el apoyo de grandes nombres de la escena nacional e internacional.",
      "Hoy, el siguiente paso es claro: quiere compartir más su música en vivo, llevarla a la pista, y conectar con públicos que puedan sentir lo que él siente al crear.",
      "Unusual Soul abre una nueva etapa en su camino: un salto que lo acerca más a su esencia y lo proyecta directo a su Next Stage.",
    ],
    collaborations: ["Malena Narvay", "Oh My Pop!", "Axel Giova"],
    socialLinks: {
      spotify: "https://open.spotify.com/intl-es/artist/6YBBrivtOKECLloC5BnCwF?si=VAt39HGHTcOr--FRzOnSNA&nd=1&utm_medium=organic&product=open&%24full_url=https%3A%2F%2Fopen.spotify.com%2Fartist%2F6YBBrivtOKECLloC5BnCwF%3Fsi%3DVAt39HGHTcOr--FRzOnSNA&%24android_redirect_timeout=3000&feature=organic&_branch_match_id=1483899023354337287&_branch_referrer=H4sIAAAAAAAAA72NwUrEMBRFvybdTVsbHVAI0lbriGJBRXBVMknaeUyahJcXB1347baCvyDcxeUeLudAFOJVUcTgCcbPXIaQW3DH4jqg10mR8MG4jFXnY7J2SGjFYb0wXrOqW7Li%2FO%2Bt%2FLxMEgkiLWX73jQIH9Q%2F3LaP1rcXjWtPHeNdBMZv3mril7u73avqcbPpnr969%2FJU%2F6qktXupjv%2BgY9XW6YWerV7pNHrQAxoNaBQNBLPxiQQvyzIbjaSERnicpAOVfaMZDSK4adijP0WD4t5FkhPK%2BQediOnNVwEAAA%3D%3D&fbclid=PAQ0xDSwMIdtBleHRuA2FlbQIxMAABp2ETLFnjldJH6D9o9np0pSsAqOwgvGdlZhsctPXqeg5acPCT5Yko0td_aem_pFjVuFD2i4nB7aBjXBm1rA",
      instagram: "https://www.instagram.com/unusualsoul.music?igsh=MXU1c3QwZHNmbm11Zw==",
    },
    galleryImages: [
      "/images/unusual 1.webp",
      "/images/unusual 2.webp",
      "/images/unusual 3.webp",
      "/images/unusual 4.webp",
    ],
  },
}

export default function DJProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const dj = djsData[resolvedParams.slug as keyof typeof djsData]

  if (!dj) {
    notFound()
  }
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number; images: string[] }>({ open: false, index: 0, images: [] })
  const galleryImages = dj.galleryImages && dj.galleryImages.length > 0
    ? dj.galleryImages
    : Array.from({ length: 6 }, () => dj.image)

  // Zoom/Pan state for lightbox
  const [zoomScale, setZoomScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (lightbox.open) {
      // reset zoom on open or image change
      setZoomScale(1)
      setOffset({ x: 0, y: 0 })
    }
  }, [lightbox.open, lightbox.index])

  // prevent background scroll when lightbox is open
  useEffect(() => {
    if (!lightbox.open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox.open])

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  return (
    <div className="min-h-screen bg-[#181313] text-[#D4CFBC]">
      <SharedNavbar currentPage="djs" />
      
      {/* Spacer for fixed navbar */}
      <div className="h-20 lg:h-20"></div>


      {/* Back to Artists */}
      <div className="px-6 lg:px-8 pt-2 pb-6">
        <Link
          href="/djs"
          className="inline-flex items-center text-[#D4CFBC] hover:text-white transition-colors duration-300 mb-8 group"
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
              <div className="flex items-center space-x-6 mb-8">
                {dj.socialLinks?.instagram && (
                  <Link
                    href={dj.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                    title="Instagram"
                  >
                    <Instagram size={16} className="group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                )}
                {dj.socialLinks?.spotify && (
                  <Link
                    href={dj.socialLinks.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                    title="Spotify"
                  >
                    <Spotify size={16} className="group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                )}
                {dj.socialLinks?.youtube && (
                  <Link
                    href={dj.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                    title="YouTube"
                  >
                    <YouTube size={16} className="group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                )}
                {dj.socialLinks?.linktree && (
                  <Link
                    href={dj.socialLinks.linktree}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group"
                    title="Linktree"
                  >
                    <Linktree size={16} className="group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                )}
              </div>

              {/* Sin botón de booking: el formulario está debajo */}
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
            {galleryImages.map((src, idx) => (
              <button
                key={idx}
                className="relative aspect-square bg-[#2a2424] rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => setLightbox({ open: true, index: idx, images: galleryImages })}
              >
                <Image
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isMounted && lightbox.open && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox({ open: false, index: 0, images: [] })}
          onWheel={(e) => {
            e.preventDefault()
            const delta = -e.deltaY
            setZoomScale((s) => {
              const next = Math.min(3, Math.max(1, s + delta * 0.0015))
              if (next === 1) setOffset({ x: 0, y: 0 })
              return next
            })
          }}
        >
          <button
            className="absolute top-4 right-4 text-white border border-white/40 px-3 py-1 uppercase tracking-widest"
            onClick={() => setLightbox({ open: false, index: 0, images: [] })}
          >
            Cerrar
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white border border-white/40 px-3 py-1"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((s) => ({ ...s, index: (s.index - 1 + (s.images.length || 1)) % (s.images.length || 1) }))
              setZoomScale(1)
              setOffset({ x: 0, y: 0 })
            }}
          >
            ‹
          </button>
          <div
            className={`max-w-[90vw] max-h-[85vh] ${zoomScale > 1 ? "cursor-grab" : "cursor-default"}`}
            onMouseDown={(e) => {
              if (zoomScale === 1) return
              setIsDragging(true)
              setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
            }}
            onMouseMove={(e) => {
              if (!isDragging) return
              setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onDoubleClick={(e) => {
              e.stopPropagation()
              setZoomScale((s) => (s === 1 ? 2 : 1))
              if (zoomScale === 1) setOffset({ x: 0, y: 0 })
            }}
          >
            <Image
              src={lightbox.images[lightbox.index] || "/placeholder.svg"}
              alt={`Lightbox ${lightbox.index + 1}`}
              width={1600}
              height={1200}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain select-none"
              draggable={false}
              style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomScale})` }}
            />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white border border-white/40 px-3 py-1"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((s) => ({ ...s, index: (s.index + 1) % (s.images.length || 1) }))
              setZoomScale(1)
              setOffset({ x: 0, y: 0 })
            }}
          >
            ›
          </button>
        </div>, document.body)
      }

      <SharedContactFooter />
      <ScrollToTop />
    </div>
  )
}
