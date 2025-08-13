import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

// Configuración simplificada solo para Gmail
interface EmailData {
  to: string | string[]
  subject: string
  html: string
  text: string
  from?: string
  replyTo?: string
  attachments?: nodemailer.Attachment[]
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null
  private isInitialized = false

  constructor() {
    // Lazy initialization: we'll initialize the transporter only when needed at runtime
  }

  private async initializeGmail() {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('❌ Gmail no configurado - faltan GMAIL_USER o GMAIL_PASS')
      return
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        pool: true,
        maxConnections: 1,
        maxMessages: 100,
        keepAlive: true,
        connectionTimeout: 10000,
        greetingTimeout: 7000,
        socketTimeout: 10000,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      })

      // Verificar la conexión
      if (process.env.EMAIL_VERIFY === 'true') {
        await this.transporter.verify()
      }
      this.isInitialized = true
      console.log('✅ Email Service Gmail inicializado correctamente')
    } catch (error) {
      console.error('❌ Error al inicializar Gmail:', error)
      this.transporter = null
      this.isInitialized = false
    }
  }

  async ensureInitialized() {
    if (!this.isInitialized || !this.transporter) {
      await this.initializeGmail()
    }
  }

  async sendEmail(emailData: EmailData) {
    if (!this.isInitialized || !this.transporter) {
      throw new Error('Servicio de email no disponible. Contacta al administrador.')
    }

    try {
      const fromAddress = emailData.from || process.env.GMAIL_USER || process.env.CONTACT_EMAIL || 'nextstagebooking@gmail.com'
      const mailOptions = {
        from: `"nextstagebooking.com" <${fromAddress}>`,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        replyTo: emailData.replyTo || emailData.from || process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
        attachments: emailData.attachments
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
    await this.ensureInitialized()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextstagebooking.com'
    const headerWebp = path.resolve(process.cwd(), 'public/images/email-header.webp')
    const headerPng = path.resolve(process.cwd(), 'public/images/email-header.png')
    const headerJpg = path.resolve(process.cwd(), 'public/images/email-header.jpg')
    const fallbackHeaderFile = path.resolve(process.cwd(), 'public/images/nextstage-logo.png')

    let attachments: nodemailer.Attachment[] = []
    let headerImageSrc = `${siteUrl}/images/nextstage-logo.png`

    if (fs.existsSync(headerWebp)) {
      attachments.push({ filename: 'email-header.webp', path: headerWebp, cid: 'email-header' })
      headerImageSrc = 'cid:email-header'
    } else if (fs.existsSync(headerPng)) {
      attachments.push({ filename: 'email-header.png', path: headerPng, cid: 'email-header' })
      headerImageSrc = 'cid:email-header'
    } else if (fs.existsSync(headerJpg)) {
      attachments.push({ filename: 'email-header.jpg', path: headerJpg, cid: 'email-header' })
      headerImageSrc = 'cid:email-header'
    } else if (fs.existsSync(fallbackHeaderFile)) {
      attachments.push({ filename: 'nextstage-logo.png', path: fallbackHeaderFile, cid: 'email-header' })
      headerImageSrc = 'cid:email-header'
    }

    const emailData: EmailData = {
      to: process.env.CONTACT_EMAIL || 'nextstagebooking@gmail.com',
      subject: `Nuevo mensaje de contacto: ${contactData.subject}`,
      html: this.generateContactFormHTML(contactData, headerImageSrc, siteUrl),
      text: this.generateContactFormText(contactData, siteUrl),
      from: process.env.GMAIL_USER || process.env.CONTACT_EMAIL || 'nextstagebooking@gmail.com',
      replyTo: contactData.email,
      attachments
    }

    return this.sendEmail(emailData)
  }

  private generateContactFormHTML(contactData: {
    name: string
    email: string
    subject: string
    message: string
  }, headerImageSrc: string, siteUrl: string) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nuevo mensaje de contacto</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; background:#f6f6f6; margin:0;">
          <div style="max-width: 680px; margin: 24px auto; background:#ffffff; box-shadow:0 1px 2px rgba(0,0,0,0.04);">
            <!-- Header -->
            <div style="padding: 20px 24px 8px 24px; text-align:left;">
              <img src="${headerImageSrc}" alt="Next Stage" style="width: 100%; max-height: 120px; object-fit: contain; display:block;">
              <hr style="border:none; border-top:1px solid #E5E5E5; margin: 12px 0 0 0;">
            </div>
            <!-- Body -->
            <div style="padding: 20px 24px;">
            <h2 style="color: #111; margin:0 0 12px 0; font-size: 20px;">Nuevo mensaje de contacto</h2>
            <div style="background: #fafafa; padding: 16px; border-radius: 6px; margin: 12px 0 16px 0; border:1px solid #EEE;">
              <p><strong>Nombre:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Asunto:</strong> ${contactData.subject}</p>
              <p><strong>Mensaje:</strong></p>
              <p style="white-space: pre-wrap;">${contactData.message}</p>
            </div>
            <p style="font-size: 12px; color: #666; margin:0;">
              Este mensaje proviene del formulario de <a href="${siteUrl}" style="color:#222; text-decoration:underline;">nextstagebooking.com</a>.
            </p>
            </div>
            <!-- Footer -->
            <div style="padding: 12px 24px 16px 24px; color:#999; font-size:12px; text-align:center; border-top: 1px solid #F0F0F0;">
              © ${new Date().getFullYear()} Next Stage
            </div>
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
  }, siteUrl: string) {
    return `
Nuevo mensaje de contacto

Nombre: ${contactData.name}
Email: ${contactData.email}
Asunto: ${contactData.subject}

Mensaje:
${contactData.message}

---
Este mensaje proviene del formulario de ${siteUrl}.
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
