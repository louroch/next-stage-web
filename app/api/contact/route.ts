import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    // Check if email service is available
    const stats = emailService.getStats()
    if (stats.totalProviders === 0) {
      console.error("❌ No hay proveedores de email configurados")
      return NextResponse.json(
        { error: "Servicio de email no disponible. Contacta al administrador." },
        { status: 500 }
      )
    }

    console.log("📧 Enviando email de contacto...")
    console.log("📊 Proveedores disponibles:", stats.providers.map(p => p.name).join(", "))

    // Send email using our backend service
    const result = await emailService.sendContactFormEmail({
      name,
      email,
      subject,
      message
    })

    if (result.success) {
      console.log(`✅ Email enviado exitosamente con ${result.provider}`)
      return NextResponse.json(
        {
          message: "¡Mensaje enviado correctamente! Te contactaremos pronto.",
          provider: result.provider
        },
        { status: 200 }
      )
    } else {
      throw new Error(`Error con ${result.provider}: ${result.error}`)
    }

  } catch (error) {
    console.error("❌ Error processing contact form:", error)
    
    // Check if it's a provider error
    if (error.message.includes('Todos los proveedores de email fallaron')) {
      return NextResponse.json(
        {
          error: "Error temporal del servicio de email. Por favor intenta nuevamente en unos minutos.",
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        error: "Error interno del servidor. Por favor intenta nuevamente.",
      },
      { status: 500 }
    )
  }
}

// Endpoint para verificar el estado de los proveedores de email
export async function GET() {
  try {
    const healthStatus = await emailService.checkProvidersHealth()
    const stats = emailService.getStats()
    
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      stats,
      health: healthStatus
    })
  } catch (error) {
    console.error("❌ Error checking email service health:", error)
    return NextResponse.json(
      { error: "Error checking service health" },
      { status: 500 }
    )
  }
}
