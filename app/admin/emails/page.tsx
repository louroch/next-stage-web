"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Play, Pause, Trash2, Mail, CheckCircle, XCircle, Clock } from "@/components/ui/icons"

interface EmailStats {
  totalProviders: number
  currentProvider: string
  providers: Array<{ name: string; host: string }>
}

interface QueueStats {
  waiting: number
  active: number
  completed: number
  failed: number
  total: number
}

interface HealthStatus {
  provider: string
  status: 'healthy' | 'unhealthy' | 'error'
  error?: string
}

export default function EmailAdminPage() {
  const [emailStats, setEmailStats] = useState<EmailStats | null>(null)
  const [queueStats, setQueueStats] = useState<QueueStats | null>(null)
  const [healthStatus, setHealthStatus] = useState<HealthStatus[]>([])
  const [loading, setLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch email service stats
      const statsResponse = await fetch('/api/contact')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setEmailStats(statsData.stats)
        setHealthStatus(statsData.health)
      }

      // Fetch queue stats (if Redis is configured)
      try {
        const queueResponse = await fetch('/api/admin/queue-stats')
        if (queueResponse.ok) {
          const queueData = await queueResponse.json()
          setQueueStats(queueData)
        }
      } catch (error) {
        console.log('Queue stats not available (Redis not configured)')
      }

      setLastRefresh(new Date())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQueueAction = async (action: 'pause' | 'resume' | 'clear') => {
    try {
      const response = await fetch(`/api/admin/queue-${action}`, { method: 'POST' })
      if (response.ok) {
        await fetchData() // Refresh data
      }
    } catch (error) {
      console.error(`Error ${action}ing queue:`, error)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500'
      case 'unhealthy': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />
      case 'unhealthy': return <Clock className="w-4 h-4" />
      case 'error': return <XCircle className="w-4 h-4" />
      default: return <Mail className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Service Dashboard</h1>
          <p className="text-gray-600">Monitoreo y administración del sistema de emails</p>
          
          <div className="flex items-center gap-4 mt-4">
            <Button onClick={fetchData} disabled={loading} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            
            {lastRefresh && (
              <span className="text-sm text-gray-500">
                Última actualización: {lastRefresh.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Service Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Estado del Servicio de Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              {emailStats ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Proveedores Totales:</span>
                    <Badge variant="secondary">{emailStats.totalProviders}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Proveedor Actual:</span>
                    <Badge variant="outline">{emailStats.currentProvider}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Proveedores Configurados:</span>
                    <div className="flex flex-wrap gap-2">
                      {emailStats.providers.map((provider, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {provider.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Cargando estadísticas...
                </div>
              )}
            </CardContent>
          </Card>

          {/* Health Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Estado de Salud
              </CardTitle>
            </CardHeader>
            <CardContent>
              {healthStatus.length > 0 ? (
                <div className="space-y-3">
                  {healthStatus.map((status, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(status.status)}`} />
                        <span className="text-sm font-medium">{status.provider}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status.status)}
                        <Badge 
                          variant={status.status === 'healthy' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {status.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Verificando estado de salud...
                </div>
              )}
            </CardContent>
          </Card>

          {/* Queue Status */}
          {queueStats && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Estado de la Cola de Emails
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{queueStats.waiting}</div>
                    <div className="text-sm text-blue-600">En Espera</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{queueStats.active}</div>
                    <div className="text-sm text-yellow-600">Activos</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{queueStats.completed}</div>
                    <div className="text-sm text-green-600">Completados</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{queueStats.failed}</div>
                    <div className="text-sm text-red-600">Fallidos</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => handleQueueAction('pause')} variant="outline" size="sm">
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </Button>
                  <Button onClick={() => handleQueueAction('resume')} variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Reanudar
                  </Button>
                  <Button onClick={() => handleQueueAction('clear')} variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Limpiar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Configuración del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p>
                Para configurar múltiples proveedores de email, agrega las siguientes variables de entorno:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <code className="text-sm">
                  # Gmail<br/>
                  GMAIL_USER=tu_email@gmail.com<br/>
                  GMAIL_PASS=tu_app_password<br/><br/>
                  
                  # Outlook/Hotmail<br/>
                  OUTLOOK_USER=tu_email@outlook.com<br/>
                  OUTLOOK_PASS=tu_password<br/><br/>
                  
                  # SendGrid<br/>
                  SENDGRID_USER=apikey<br/>
                  SENDGRID_PASS=tu_api_key<br/><br/>
                  
                  # Email de contacto<br/>
                  CONTACT_EMAIL=nextstagebooking@gmail.com
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
