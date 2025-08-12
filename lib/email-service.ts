import nodemailer from 'nodemailer'

// Configuración simplificada solo para Gmail
interface EmailData {
  to: string | string[]
  subject: string
  html: string
  text: string
  from?: string
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null
  private isInitialized = false

  constructor() {
    this.initializeGmail()
  }

  private async initializeGmail() {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('❌ Gmail no configurado - faltan GMAIL_USER o GMAIL_PASS')
      return
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      })

      // Verificar la conexión
      await this.transporter.verify()
      this.isInitialized = true
      console.log('✅ Email Service Gmail inicializado correctamente')
    } catch (error) {
      console.error('❌ Error al inicializar Gmail:', error)
      this.transporter = null
      this.isInitialized = false
    }
  }

  async sendEmail(emailData: EmailData) {
    if (!this.isInitialized || !this.transporter) {
      throw new Error('Servicio de email no disponible. Contacta al administrador.')
    }

    try {
      const mailOptions = {
        from: emailData.from || process.env.GMAIL_USER || process.env.CONTACT_EMAIL || 'nextstagebooking@gmail.com',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        replyTo: emailData.from || process.env.CONTACT_EMAIL || process.env.GMAIL_USER
      }

      const result = await this.transporter.sendMail(mailOptions)
      console.log('✅ Email enviado correctamente:', result.messageId)
      return result
    } catch (error) {
      console.error('❌ Error al enviar email:', error)
      throw new Error('Error al enviar email. Intenta nuevamente.')
    }
  }

  async sendContactFormEmail(contactData: {
    name: string
    email: string
    subject: string
    message: string
  }) {
    const emailData: EmailData = {
      to: process.env.CONTACT_EMAIL || 'nextstagebooking@gmail.com',
      subject: `Nuevo mensaje de contacto: ${contactData.subject}`,
      html: this.generateContactFormHTML(contactData),
      text: this.generateContactFormText(contactData),
      from: process.env.CONTACT_EMAIL || 'nextstagebooking@gmail.com'
    }

    return this.sendEmail(emailData)
  }

  private generateContactFormHTML(contactData: {
    name: string
    email: string
    subject: string
    message: string
  }) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nuevo mensaje de contacto</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #D4CFBC;">Nuevo mensaje de contacto</h2>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Nombre:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Asunto:</strong> ${contactData.subject}</p>
              <p><strong>Mensaje:</strong></p>
              <p style="white-space: pre-wrap;">${contactData.message}</p>
            </div>
            <p style="font-size: 12px; color: #666;">
              Este mensaje fue enviado desde el formulario de contacto de Next Stage.
            </p>
          </div>
        </body>
      </html>
    `
  }

  private generateContactFormText(contactData: {
    name: string
    email: string
    subject: string
    message: string
  }) {
    return `
Nuevo mensaje de contacto

Nombre: ${contactData.name}
Email: ${contactData.email}
Asunto: ${contactData.subject}

Mensaje:
${contactData.message}

---
Este mensaje fue enviado desde el formulario de contacto de Next Stage.
    `.trim()
  }

  async checkProvidersHealth() {
    if (!this.isInitialized || !this.transporter) {
      return {
        status: 'error',
        message: 'Servicio no inicializado',
        provider: 'Gmail'
      }
    }

    try {
      await this.transporter.verify()
      return {
        status: 'healthy',
        message: 'Gmail funcionando correctamente',
        provider: 'Gmail'
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Error en Gmail',
        provider: 'Gmail',
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  getStats() {
    return {
      provider: 'Gmail',
      isInitialized: this.isInitialized,
      status: this.isInitialized ? 'active' : 'inactive'
    }
  }
}

export const emailService = new EmailService()
