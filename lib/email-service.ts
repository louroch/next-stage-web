import nodemailer from 'nodemailer'

// Configuración de múltiples proveedores de email
interface EmailProvider {
  name: string
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

interface EmailData {
  to: string | string[]
  subject: string
  html: string
  text: string
  from?: string
}

class EmailService {
  private providers: EmailProvider[] = []
  private currentProviderIndex = 0
  private isInitialized = false

  constructor() {
    console.log('🔧 Inicializando Email Service...')
    console.log('🔍 Variables de entorno disponibles:')
    console.log('GMAIL_USER:', process.env.GMAIL_USER ? '✅ Configurado' : '❌ No configurado')
    console.log('GMAIL_PASS:', process.env.GMAIL_PASS ? '✅ Configurado' : '❌ No configurado')
    console.log('OUTLOOK_USER:', process.env.OUTLOOK_USER ? '✅ Configurado' : '❌ No configurado')
    console.log('OUTLOOK_PASS:', process.env.OUTLOOK_PASS ? '✅ Configurado' : '❌ No configurado')
    console.log('SENDGRID_USER:', process.env.SENDGRID_USER ? '✅ Configurado' : '❌ No configurado')
    console.log('SENDGRID_PASS:', process.env.SENDGRID_PASS ? '✅ Configurado' : '❌ No configurado')
    console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Configurado' : '❌ No configurado')
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL || '❌ No configurado')
    
    this.initializeProviders()
  }

  private initializeProviders() {
    // Gmail (SMTP)
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      console.log('📧 Configurando proveedor Gmail...')
      this.providers.push({
        name: 'Gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      })
      console.log('✅ Proveedor Gmail agregado')
    } else {
      console.log('❌ Gmail no configurado - faltan GMAIL_USER o GMAIL_PASS')
    }

    // Outlook/Hotmail (SMTP)
    if (process.env.OUTLOOK_USER && process.env.OUTLOOK_PASS) {
      console.log('📧 Configurando proveedor Outlook...')
      this.providers.push({
        name: 'Outlook',
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.OUTLOOK_USER,
          pass: process.env.OUTLOOK_PASS
        }
      })
      console.log('✅ Proveedor Outlook agregado')
    } else {
      console.log('❌ Outlook no configurado - faltan OUTLOOK_USER o OUTLOOK_PASS')
    }

    // SendGrid (SMTP)
    if (process.env.SENDGRID_USER && process.env.SENDGRID_PASS) {
      console.log('📧 Configurando proveedor SendGrid...')
      this.providers.push({
        name: 'SendGrid',
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASS
        }
      })
      console.log('✅ Proveedor SendGrid agregado')
    } else {
      console.log('❌ SendGrid no configurado - faltan SENDGRID_USER o SENDGRID_PASS')
    }

    // Resend (como respaldo)
    if (process.env.RESEND_API_KEY) {
      console.log('✅ Resend configurado como respaldo')
    } else {
      console.log('❌ Resend no configurado')
    }

    this.isInitialized = true
    console.log(`🚀 Email Service inicializado con ${this.providers.length} proveedores`)
    
    if (this.providers.length === 0) {
      console.log('⚠️ ADVERTENCIA: No hay proveedores de email configurados!')
      console.log('💡 Para configurar Gmail, asegúrate de tener en .env.local:')
      console.log('   GMAIL_USER=tu_email@gmail.com')
      console.log('   GMAIL_PASS=tu_app_password')
    }
  }

  private async createTransporter(provider: EmailProvider) {
    try {
      const transporter = nodemailer.createTransport({
        host: provider.host,
        port: provider.port,
        secure: provider.secure,
        auth: provider.auth,
        tls: {
          rejectUnauthorized: false
        }
      })

      // Verificar conexión
      await transporter.verify()
      return transporter
    } catch (error) {
      console.error(`❌ Error creando transporter para ${provider.name}:`, error)
      return null
    }
  }

  private async sendWithProvider(provider: EmailProvider, emailData: EmailData) {
    try {
      const transporter = await this.createTransporter(provider)
      if (!transporter) {
        throw new Error(`No se pudo crear transporter para ${provider.name}`)
      }

      const mailOptions = {
        from: emailData.from || `NextStage <${provider.auth.user}>`,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text
      }

      const result = await transporter.sendMail(mailOptions)
      console.log(`✅ Email enviado exitosamente con ${provider.name}:`, result.messageId)
      return { success: true, provider: provider.name, messageId: result.messageId }
    } catch (error) {
      console.error(`❌ Error enviando email con ${provider.name}:`, error)
      return { success: false, provider: provider.name, error: error.message }
    }
  }

  async sendEmail(emailData: EmailData) {
    if (!this.isInitialized) {
      throw new Error('Email Service no está inicializado')
    }

    if (this.providers.length === 0) {
      throw new Error('No hay proveedores de email configurados')
    }

    // Intentar con cada proveedor hasta que uno funcione
    for (let i = 0; i < this.providers.length; i++) {
      const providerIndex = (this.currentProviderIndex + i) % this.providers.length
      const provider = this.providers[providerIndex]
      
      console.log(`🔄 Intentando enviar email con ${provider.name}...`)
      
      const result = await this.sendWithProvider(provider, emailData)
      
      if (result.success) {
        // Rotar al siguiente proveedor para el próximo envío
        this.currentProviderIndex = (providerIndex + 1) % this.providers.length
        return result
      }
      
      console.log(`⚠️ ${provider.name} falló, intentando siguiente proveedor...`)
    }

    // Si todos los proveedores fallaron
    throw new Error('Todos los proveedores de email fallaron')
  }

  async sendContactFormEmail(contactData: {
    name: string
    email: string
    subject: string
    message: string
  }) {
    const emailData: EmailData = {
      to: process.env.CONTACT_EMAIL || 'nextstagebooking@gmail.com',
      subject: `NEXTSTAGE - ${contactData.subject}`,
      html: this.generateContactFormHTML(contactData),
      text: this.generateContactFormText(contactData)
    }

    return await this.sendEmail(emailData)
  }

  private generateContactFormHTML(contactData: {
    name: string
    email: string
    subject: string
    message: string
  }) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #181313; color: #D4CFBC; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; letter-spacing: 0.1em;">NEXTSTAGE BOOKING</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">Nuevo mensaje de contacto</p>
        </div>
        
        <div style="background-color: white; padding: 30px;">
          <div style="margin-bottom: 20px;">
            <strong style="color: #181313;">Nombre:</strong>
            <p style="margin: 5px 0; color: #666;">${contactData.name}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #181313;">Email:</strong>
            <p style="margin: 5px 0; color: #666;">${contactData.email}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #181313;">Asunto:</strong>
            <p style="margin: 5px 0; color: #666;">${contactData.subject}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #181313;">Mensaje:</strong>
            <p style="margin: 5px 0; color: #666; line-height: 1.6;">${contactData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
            <p>Este mensaje fue enviado desde el formulario de contacto de nextstage.com</p>
            <p>Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
          </div>
        </div>
      </div>
    `
  }

  private generateContactFormText(contactData: {
    name: string
    email: string
    subject: string
    message: string
  }) {
    return `
NEXTSTAGE BOOKING - Nuevo mensaje de contacto

Nombre: ${contactData.name}
Email: ${contactData.email}
Asunto: ${contactData.subject}

Mensaje:
${contactData.message}

---
Este mensaje fue enviado desde el formulario de contacto de nextstage.com
Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' })}
    `
  }

  // Método para verificar el estado de los proveedores
  async checkProvidersHealth() {
    const healthStatus = []
    
    for (const provider of this.providers) {
      try {
        const transporter = await this.createTransporter(provider)
        if (transporter) {
          healthStatus.push({ provider: provider.name, status: 'healthy' })
        } else {
          healthStatus.push({ provider: provider.name, status: 'unhealthy' })
        }
      } catch (error) {
        healthStatus.push({ provider: provider.name, status: 'error', error: error.message })
      }
    }
    
    return healthStatus
  }

  // Método para obtener estadísticas
  getStats() {
    return {
      totalProviders: this.providers.length,
      currentProvider: this.providers[this.currentProviderIndex]?.name || 'none',
      providers: this.providers.map(p => ({ name: p.name, host: p.host }))
    }
  }
}

// Exportar instancia singleton
export const emailService = new EmailService()
export default emailService
