# 📧 Configuración del Sistema de Emails - NextStage

## 🚀 Configuración Rápida

### 1. Crear cuenta en Resend
- Ve a [https://resend.com](https://resend.com)
- Crea una cuenta gratuita
- Verifica tu dominio o usa el dominio de prueba

### 2. Obtener API Key
- En el dashboard de Resend, ve a "API Keys"
- Crea una nueva API key
- Copia la key (empieza con `re_`)

### 3. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Email Configuration
RESEND_API_KEY=re_tu_api_key_aqui
CONTACT_EMAIL=nextstagebooking@gmail.com
NODE_ENV=development
```

### 4. Reiniciar el servidor
```bash
npm run dev
```

## 🔧 Funcionalidades Implementadas

### ✅ Formulario de Contacto
- Validación de campos
- Manejo de estados (loading, success, error)
- Emails HTML y texto plano
- Diseño responsive y accesible

### ✅ API Route
- Validación de datos
- Envío real de emails
- Manejo de errores
- Logs detallados

### ✅ Template de Email
- Diseño profesional con branding de NextStage
- Información completa del contacto
- Timestamp con zona horaria de Argentina
- Versión HTML y texto plano

## 📋 Estructura del Email

```
┌─────────────────────────────────────┐
│           NEXTSTAGE BOOKING         │
│        Nuevo mensaje de contacto    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Nombre: [Nombre del contacto]      │
│ Email: [Email del contacto]        │
│ Asunto: [Asunto del mensaje]       │
│                                     │
│ Mensaje:                            │
│ [Contenido del mensaje]             │
│                                     │
│ ─────────────────────────────────── │
│ Enviado desde nextstage.com         │
│ Fecha: [Timestamp]                  │
└─────────────────────────────────────┘
```

## 🚨 Solución de Problemas

### Error: "RESEND_API_KEY no está configurada"
- Verifica que el archivo `.env.local` existe
- Asegúrate de que la variable `RESEND_API_KEY` esté definida
- Reinicia el servidor después de cambiar las variables

### Error: "Error al enviar el email"
- Verifica que tu API key sea válida
- Revisa los logs del servidor para más detalles
- Asegúrate de que tu cuenta de Resend esté activa

### Emails no llegan a Gmail
- Verifica la carpeta de spam
- Asegúrate de que `CONTACT_EMAIL` esté configurado correctamente
- Revisa los logs del servidor para confirmar el envío

## 📊 Monitoreo

### Logs del Servidor
- ✅ Email enviado exitosamente
- ❌ Error al enviar email
- ❌ RESEND_API_KEY no configurada

### Dashboard de Resend
- Estadísticas de envío
- Historial de emails
- Estado de entrega

## 🔒 Seguridad

- API keys nunca se exponen en el frontend
- Validación de campos en frontend y backend
- Rate limiting recomendado para producción
- Logs de auditoría para seguimiento

## 🚀 Producción

### Variables de Entorno
```bash
RESEND_API_KEY=re_production_key
CONTACT_EMAIL=nextstagebooking@gmail.com
NODE_ENV=production
```

### Dominio Verificado
- Verifica tu dominio en Resend
- Usa `noreply@tudominio.com` como remitente
- Configura SPF, DKIM y DMARC

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs del servidor
2. Verifica la configuración de variables de entorno
3. Confirma que tu cuenta de Resend esté activa
4. Revisa el dashboard de Resend para errores
