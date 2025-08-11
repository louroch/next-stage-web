"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ArrowLeft } from "@/components/ui/icons"
import { useScrollPosition } from "@/hooks/useScrollPosition"

interface SharedNavbarProps {
  currentPage?: string
}

export default function SharedNavbar({ currentPage }: SharedNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isNavbarVisible } = useScrollPosition()

  const navItems = [
    { href: "/", label: "INICIO", isActive: currentPage === "home", isExternal: false },
    { href: "/eventos", label: "EVENTOS", isActive: currentPage === "eventos", isExternal: false },
    { href: "/djs", label: "ARTISTAS", isActive: currentPage === "djs", isExternal: false },
    { href: "/#servicios", label: "SERVICIOS", isActive: false, isExternal: false },
    { href: "/#equipo", label: "QUIÉNES SOMOS", isActive: false, isExternal: false },
    { href: "https://www.notion.so/Next-Stage-Booking-Artistico-177a0ba15b1b80d99163da6be85423af?v=eda3782323e043c9a1fbfd2f97529d71&p=91fc6388b5434390b823e1dd0ca4fde8&pm=s", label: "BLOG", isActive: false, isExternal: true },
    { href: "/#contacto", label: "CONTACTO", isActive: false, isExternal: false },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
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
            {navItems.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-all duration-300 relative group overflow-hidden py-2"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-white transition-all duration-300 relative group overflow-hidden py-2"
                  onClick={closeMobileMenu}
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden z-[100] relative"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-[#181313] z-[90] lg:hidden">
            <button
              onClick={closeMobileMenu}
              className="absolute top-8 left-8 w-12 h-12 rounded-full border border-[#D4CFBC] flex items-center justify-center hover:bg-[#D4CFBC] hover:text-[#181313] transition-all duration-300"
              aria-label="Close menu"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex flex-col items-center justify-center h-full space-y-12 text-xl font-medium tracking-[0.2em] uppercase">
              {navItems.map((item) => {
                if (item.isExternal) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors duration-300 relative group overflow-hidden py-2"
                      onClick={closeMobileMenu}
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  )
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-white transition-colors duration-300 relative group overflow-hidden py-2"
                    onClick={closeMobileMenu}
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-[#D4CFBC] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
