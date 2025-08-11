import Queue from 'bull'
import { emailService } from './email-service'

// Configurar cola de emails
const emailQueue = new Queue('email-queue', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD
  }
})

// Configurar procesamiento de la cola
emailQueue.process(async (job) => {
  const { emailData, retryCount = 0 } = job.data
  
  try {
    console.log(`📧 Procesando email #${job.id} (intento ${retryCount + 1})`)
    
    const result = await emailService.sendEmail(emailData)
    
    if (result.success) {
      console.log(`✅ Email #${job.id} enviado exitosamente con ${result.provider}`)
      return { success: true, provider: result.provider, messageId: result.messageId }
    } else {
      throw new Error(`Error con ${result.provider}: ${result.error}`)
    }
    
  } catch (error) {
    console.error(`❌ Error procesando email #${job.id}:`, error)
    
    // Reintentar hasta 3 veces
    if (retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000 // Backoff exponencial: 1s, 2s, 4s
      
      console.log(`🔄 Reintentando email #${job.id} en ${delay}ms...`)
      
      // Agregar a la cola nuevamente con delay
      await emailQueue.add(
        'email-retry',
        { emailData, retryCount: retryCount + 1 },
        { delay, attempts: 1 }
      )
      
      return { success: false, error: 'Reintentando...', retryCount: retryCount + 1 }
    } else {
      console.error(`💀 Email #${job.id} falló después de 3 intentos`)
      throw error
    }
  }
})

// Manejar eventos de la cola
emailQueue.on('completed', (job, result) => {
  console.log(`✅ Job #${job.id} completado:`, result)
})

emailQueue.on('failed', (job, err) => {
  console.error(`❌ Job #${job.id} falló:`, err.message)
})

emailQueue.on('stalled', (job) => {
  console.warn(`⚠️ Job #${job.id} se estancó`)
})

// Función para agregar emails a la cola
export async function addEmailToQueue(emailData: {
  to: string | string[]
  subject: string
  html: string
  text: string
  from?: string
}) {
  try {
    const job = await emailQueue.add('email', { emailData, retryCount: 0 })
    console.log(`📬 Email agregado a la cola con ID: ${job.id}`)
    return { success: true, jobId: job.id }
  } catch (error) {
    console.error('❌ Error agregando email a la cola:', error)
    throw error
  }
}

// Función para enviar emails masivos
export async function sendBulkEmails(emails: Array<{
  to: string
  subject: string
  html: string
  text: string
  from?: string
}>) {
  try {
    console.log(`📧 Enviando ${emails.length} emails en lote...`)
    
    const jobs = []
    for (const email of emails) {
      const job = await emailQueue.add('bulk-email', { emailData: email, retryCount: 0 })
      jobs.push(job.id)
    }
    
    console.log(`✅ ${emails.length} emails agregados a la cola`)
    return { success: true, jobIds: jobs, totalEmails: emails.length }
    
  } catch (error) {
    console.error('❌ Error enviando emails masivos:', error)
    throw error
  }
}

// Función para obtener estadísticas de la cola
export async function getQueueStats() {
  try {
    const [waiting, active, completed, failed] = await Promise.all([
      emailQueue.getWaiting(),
      emailQueue.getActive(),
      emailQueue.getCompleted(),
      emailQueue.getFailed()
    ])
    
    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      total: waiting.length + active.length + completed.length + failed.length
    }
  } catch (error) {
    console.error('❌ Error obteniendo estadísticas de la cola:', error)
    return null
  }
}

// Función para limpiar la cola
export async function clearQueue() {
  try {
    await emailQueue.empty()
    console.log('🧹 Cola de emails limpiada')
    return { success: true }
  } catch (error) {
    console.error('❌ Error limpiando la cola:', error)
    throw error
  }
}

// Función para pausar/reanudar la cola
export async function pauseQueue() {
  try {
    await emailQueue.pause()
    console.log('⏸️ Cola de emails pausada')
    return { success: true, status: 'paused' }
  } catch (error) {
    console.error('❌ Error pausando la cola:', error)
    throw error
  }
}

export async function resumeQueue() {
  try {
    await emailQueue.resume()
    console.log('▶️ Cola de emails reanudada')
    return { success: true, status: 'resumed' }
  } catch (error) {
    console.error('❌ Error reanudando la cola:', error)
    throw error
  }
}

export default emailQueue
