# 🐕 Doggy App - Logos

Este directorio contiene todos los logos y assets visuales para la aplicación Doggy.

## 📁 Archivos incluidos

### Logos SVG
- **`doggy-logo.svg`** - Logo principal (256x256px) con efectos de sombra y detalles
- **`doggy-logo-with-text.svg`** - Logo con texto "Doggy" y subtítulo (400x200px)
- **`doggy-favicon.svg`** - Versión simplificada para favicon (64x64px)

### Herramientas
- **`convert-to-png.html`** - Herramienta web para convertir SVGs a PNG

## 🎨 Características del diseño

### Paleta de colores
- **Primario**: Gradiente de coral a turquesa (#FF6B6B → #4ECDC4 → #45B7D1)
- **Secundario**: Tonos de gris oscuro (#2C3E50, #34495E)
- **Acentos**: Rosa suave (#FFB3B3, #FF8E8E)

### Elementos del logo
- **Cabeza de perro**: Forma principal con orejas caídas
- **Ojos**: Negros con reflejos blancos para dar vida
- **Nariz**: Forma ovalada en gradiente oscuro
- **Boca**: Sonrisa amigable con lengua visible
- **Patas**: Pequeños círculos que sugieren movimiento
- **Efectos**: Sombras suaves y elementos decorativos

## 📱 Uso recomendado

### Para la aplicación
- **Logo principal**: Usar `doggy-logo.svg` en pantallas de bienvenida y configuraciones
- **Logo con texto**: Usar `doggy-logo-with-text.svg` en headers y páginas principales
- **Favicon**: Usar `doggy-favicon.svg` convertido a PNG para el favicon del navegador

### Tamaños recomendados
- **Favicon**: 32x32px, 64x64px
- **Icono de app**: 128x128px, 256x256px
- **Logo en header**: 200x100px (versión con texto)
- **Logo principal**: 256x256px

## 🔧 Conversión a PNG

Para convertir los SVGs a PNG:

1. Abre `convert-to-png.html` en tu navegador
2. Haz clic en los botones de descarga para obtener los PNG
3. Guarda los archivos en el directorio correspondiente

### Comandos alternativos (si tienes herramientas instaladas)

```bash
# Con ImageMagick
magick doggy-favicon.svg -resize 64x64 favicon.png

# Con Inkscape
inkscape --export-png=favicon.png --export-width=64 --export-height=64 doggy-favicon.svg
```

## 🎯 Personalización

Los logos están diseñados para ser fácilmente personalizables:

- **Colores**: Modifica los gradientes en la sección `<defs>`
- **Tamaño**: Ajusta el `viewBox` y las dimensiones
- **Elementos**: Añade o quita elementos como las patas o efectos decorativos

## 📄 Licencia

Estos logos son parte del proyecto Doggy y están bajo la misma licencia MIT del proyecto principal.
