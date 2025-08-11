# 🎨 SISTEMA DE TIPOGRAFÍA - NEXT STAGE

## 📚 Fuentes Implementadas

### **TÍTULOS - Special Gothic Expanded One**
- **Uso**: Títulos principales, headlines grandes
- **Clase CSS**: `font-special-gothic`
- **Clase Tailwind**: `font-special-gothic`
- **Ejemplo**: `className="text-6xl font-special-gothic"`

### **SUBTÍTULOS - Timmana**
- **Uso**: Subtítulos, títulos de sección
- **Clase CSS**: `font-timmana`
- **Clase Tailwind**: `font-timmana`
- **Ejemplo**: `className="text-4xl font-timmana italic"`

### **CUERPO DE TEXTO - Roboto**
- **Uso**: Párrafos, texto principal, botones
- **Clase CSS**: `font-roboto`
- **Clase Tailwind**: `font-roboto`
- **Ejemplo**: `className="text-lg font-roboto"`

### **RESPALDO - Inter**
- **Uso**: Fuente de respaldo, elementos del sistema
- **Clase CSS**: `font-inter`
- **Clase Tailwind**: `font-inter`

## 🚀 Cómo Usar

### **1. En Componentes React:**
```tsx
// Título principal
<h1 className="text-6xl font-special-gothic text-[#D4CFBC]">
  NEXT STAGE
</h1>

// Subtítulo
<h2 className="text-3xl font-timmana italic text-[#D4CFBC]">
  Booking Artístico
</h2>

// Párrafo
<p className="text-lg font-roboto text-[#D4CFBC]/80">
  Somos un booking que entiende la música como experiencia.
</p>
```

### **2. En CSS Personalizado:**
```css
.titulo-principal {
  font-family: var(--font-special-gothic);
  font-size: 4rem;
  font-weight: 400;
}

.subtitulo {
  font-family: var(--font-timmana);
  font-size: 2rem;
  font-style: italic;
}

.texto-cuerpo {
  font-family: var(--font-roboto);
  font-size: 1.125rem;
  line-height: 1.6;
}
```

## 📁 Archivos de Fuentes

### **Ubicación:**
```
public/fonts/
├── SpecialGothicExpandedOne-Regular.woff2
└── Timmana-Regular.woff2
```

### **Formato Recomendado:**
- **WOFF2**: Mejor compresión y rendimiento
- **WOFF**: Compatibilidad amplia
- **TTF**: Como respaldo

## ⚠️ Importante

### **Antes de usar las fuentes:**
1. **Descargar** los archivos de fuentes
2. **Colocar** en `public/fonts/`
3. **Verificar** que los nombres coincidan con `lib/fonts.ts`

### **Fuentes de Google (automáticas):**
- ✅ **Roboto**: Se descarga automáticamente
- ✅ **Inter**: Se descarga automáticamente

### **Fuentes personalizadas (requieren archivos):**
- ⚠️ **Special Gothic Expanded One**: Necesita archivo `.woff2`
- ⚠️ **Timmana**: Necesita archivo `.woff2`

## 🔧 Solución de Problemas

### **Si las fuentes no se cargan:**
1. Verificar que los archivos estén en `public/fonts/`
2. Verificar que los nombres coincidan
3. Revisar la consola del navegador por errores
4. Verificar que `lib/fonts.ts` esté importado en `layout.tsx`

### **Fallback automático:**
Si una fuente personalizada falla, se usará automáticamente:
- Inter → system-ui → sans-serif

## 📱 Responsive

### **Tamaños recomendados:**
```tsx
// Mobile
<h1 className="text-4xl font-special-gothic">Título</h1>

// Tablet
<h1 className="text-5xl font-special-gothic">Título</h1>

// Desktop
<h1 className="text-6xl font-special-gothic">Título</h1>
```

## 🎯 Casos de Uso

### **Hero Section:**
```tsx
<h1 className="text-4xl md:text-6xl lg:text-7xl font-special-gothic font-normal tracking-tight">
  SOMOS UN BOOKING QUE ENTIENDE LA MÚSICA COMO EXPERIENCIA
</h1>
```

### **Secciones:**
```tsx
<h2 className="text-3xl md:text-4xl lg:text-5xl font-timmana font-normal italic">
  ARTISTAS
</h2>
```

### **Contenido:**
```tsx
<p className="text-base md:text-lg font-roboto leading-relaxed">
  No solo representamos talento, lo hacemos crecer.
</p>
```

---

**¡Listo para usar!** 🎉
