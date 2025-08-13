import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validación
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    console.log("📧 Enviando email de contacto con Gmail...")
    const result = await emailService.sendContactFormEmail({
      name,
      email,
      subject,
      message
    })

    if (result) {
      console.log("✅ Email enviado exitosamente con Gmail")
      const stats = emailService.getStats()
      return NextResponse.json(
        { message: "¡Mensaje enviado correctamente! Te contactaremos pronto.", provider: stats.provider },
        { status: 200 }
      )
    }

    throw new Error("Fallo desconocido al enviar email")
  } catch (error) {
    console.error("❌ Error processing contact form:", error)
    return NextResponse.json(
      { error: "Error interno del servidor. Por favor intenta nuevamente." },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const healthStatus = await emailService.checkProvidersHealth()
    const stats = emailService.getStats()
    return NextResponse.json({ status: "ok", stats, health: healthStatus })
  } catch (error) {
    console.error("❌ Error checking email service health:", error)
    return NextResponse.json({ error: "Error checking service health" }, { status: 500 })
  }
}
