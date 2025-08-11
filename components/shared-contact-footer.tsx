"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Facebook, WhatsApp, Linktree } from "@/components/ui/icons"

export default function SharedContactFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    if (submitStatus !== "idle") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle")
        setStatusMessage("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setStatusMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setStatusMessage(result.message || "Mensaje enviado correctamente")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.error || "Error al enviar el mensaje. Inténtalo de nuevo.")
      }
    } catch (error) {
      console.error("Error:", error)
      setSubmitStatus("error")
      setStatusMessage("Error de conexión. Verifica tu internet e inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Contact Section */}
      <section id="contacto" className="py-16 sm:py-20 lg:py-24 px-4 lg:px-12 bg-[#181313]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.1em] uppercase text-[#D4CFBC]">BOOKING</h2>
              <div className="w-12 sm:w-16 h-px bg-[#D4CFBC]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    required
                    className="bg-transparent border-0 border-b border-[#D4CFBC]/30 text-[#D4CFBC] placeholder:text-[#D4CFBC]/50 focus:border-[#D4CFBC] tracking-[0.1em] rounded-none px-0 py-3 sm:py-4 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Email"
                    required
                    className="bg-transparent border-0 border-b border-[#D4CFBC]/30 text-[#D4CFBC] placeholder:text-[#D4CFBC]/50 focus:border-[#D4CFBC] tracking-[0.1em] rounded-none px-0 py-3 sm:py-4 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Asunto"
                    required
                    className="bg-transparent border-0 border-b border-[#D4CFBC]/30 text-[#D4CFBC] placeholder:text-[#D4CFBC]/50 focus:border-[#D4CFBC] tracking-[0.1em] rounded-none px-0 py-3 sm:py-4 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Mensaje"
                    rows={4}
                    required
                    className="bg-transparent border-0 border-b border-[#D4CFBC]/30 text-[#D4CFBC] placeholder:text-[#D4CFBC]/50 focus:border-[#D4CFBC] tracking-[0.1em] rounded-none px-0 py-3 sm:py-4 resize-none text-sm sm:text-base"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="text-green-400 text-sm tracking-[0.1em] animate-fade-in">{statusMessage}</div>
                )}
                {submitStatus === "error" && (
                  <div className="text-red-400 text-sm tracking-[0.1em] animate-fade-in">{statusMessage}</div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-transparent border border-[#D4CFBC] text-[#D4CFBC] hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-500 font-bold tracking-[0.2em] px-8 sm:px-12 py-3 sm:py-4 disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto"
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-bold tracking-[0.1em] mb-6 uppercase text-[#D4CFBC]">CONTACTO</h3>
                <div className="space-y-4 text-sm tracking-[0.1em] text-[#D4CFBC]">
                  <div>NEXTSTAGEBOOKING@GMAIL.COM</div>
                  <div>+34 600 123 456</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-[0.1em] mb-6 uppercase text-[#D4CFBC]">REDES</h3>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  <Link
                    href="https://www.instagram.com/nextstage.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group text-[#D4CFBC]"
                  >
                    <Instagram size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/nextstage.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group text-[#D4CFBC]"
                  >
                    <Facebook size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <Link
                    href="https://api.whatsapp.com/send?phone=543814781887&fbclid=PAQ0xDSwMHJ4RleHRuA2FlbQIxMAABpyOa7Qbzrla0GeMDiu2OnqYFLcO-fuZr-STK5WujO06HZdCiIJH4Ch9vZOnQ_aem_yETdk4r4lbOX0JCQmBa_Mg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group text-[#D4CFBC]"
                  >
                    <WhatsApp size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <Link
                    href="https://linktr.ee/nextstagebooking?fbclid=PAQ0xDSwMHJ8NleHRuA2FlbQIxMQABp-sX24PSxrDsX9ys4K19lwV3lxxs8eM713XriVJtc0AAkj0vMFZwEbql4bNV_aem_bFaHlJnhABHk82i2S54Mzg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 border border-[#D4CFBC]/30 hover:border-[#D4CFBC] flex items-center justify-center transition-all duration-500 group text-[#D4CFBC]"
                  >
                    <Linktree size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 sm:py-16 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            <div>
              <div className="w-24 sm:w-32 mb-6">
                <Image
                  src="/images/nextstage-logo.png"
                  alt="NEXTSTAGE"
                  width={128}
                  height={32}
                  className="w-full h-auto opacity-70"
                />
              </div>
              <p className="text-xs opacity-50 leading-relaxed tracking-[0.1em] uppercase text-[#D4CFBC]">
                REPRESENTACIÓN DE ARTISTAS
                <br />
                PRODUCCIÓN DE EVENTOS
                <br />
                ESTRATEGIA MUSICAL
              </p>
            </div>

            <div>
              <h4 className="font-bold tracking-[0.1em] mb-6 uppercase text-sm text-[#D4CFBC]">ENLACES</h4>
              <div className="space-y-3 text-xs tracking-[0.1em] uppercase text-[#D4CFBC]">
                <Link href="/" className="block hover:text-white transition-colors duration-500">
                  INICIO
                </Link>
                <Link href="/#equipo" className="block hover:text-white transition-colors duration-500">
                  QUIÉNES SOMOS
                </Link>
                <Link href="/djs" className="block hover:text-white transition-colors duration-500">
                  ARTISTAS
                </Link>
                <Link href="/#servicios" className="block hover:text-white transition-colors duration-500">
                  SERVICIOS
                </Link>
                <Link href="/eventos" className="block hover:text-white transition-colors duration-500">
                  EVENTOS
                </Link>
                <Link href="#contacto" className="block hover:text-white transition-colors duration-500">
                  CONTACTO
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold tracking-[0.1em] mb-6 uppercase text-sm text-[#D4CFBC]">SERVICIOS</h4>
              <div className="space-y-3 text-xs tracking-[0.1em] uppercase text-[#D4CFBC]">
                <p>BOOKING</p>
                <p>MANAGEMENT</p>
                <p>PRODUCCIÓN</p>
                <p>CONSULTORÍA</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold tracking-[0.1em] mb-6 uppercase text-sm text-[#D4CFBC]">PARTNERS</h4>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="w-14 h-7 sm:w-16 sm:h-8 bg-[#D4CFBC]/10 border border-[#D4CFBC]/20"></div>
                <div className="w-14 h-7 sm:w-16 sm:h-8 bg-[#D4CFBC]/10 border border-[#D4CFBC]/20"></div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#D4CFBC]/20 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs opacity-50 text-center sm:text-left tracking-[0.1em] uppercase text-[#D4CFBC]">
              © 2025 NEXTSTAGE. TODOS LOS DERECHOS RESERVADOS.
            </p>
            <div className="flex space-x-6 sm:space-x-8 text-xs tracking-[0.1em] uppercase text-[#D4CFBC]">
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
    </>
  )
}
