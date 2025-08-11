import { type NextRequest, NextResponse } from "next/server"

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

    // Log the contact form submission for development
    const contactData = {
      name,
      email,
      subject: `NEXTSTAGE - ${subject}`,
      message,
      timestamp: new Date().toISOString(),
      to: "nextstagebooking@gmail.com",
    }

    console.log("📧 Contact Form Submission:", contactData)

    // In a production environment, you would:
    // 1. Add RESEND_API_KEY to your environment variables
    // 2. Use Resend or similar service to send actual emails
    // 3. Replace this console.log with actual email sending

    // Simulate successful email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        message: "¡Mensaje enviado correctamente! Te contactaremos pronto.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor. Por favor intenta nuevamente.",
      },
      { status: 500 },
    )
  }
}
