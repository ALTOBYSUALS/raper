#!/bin/bash

echo "🔧 FIX CRÍTICO IPHONE - APLICANDO A TODAS LAS PÁGINAS"
echo "=================================================="

# Cambiar directorio a raper-2.webflow
cd raper-2.webflow

# Contadores
count=0
files_updated=0

# Encontrar todos los archivos HTML y aplicar los cambios
for file in *.html; do
    if [ -f "$file" ]; then
        echo "📝 Procesando: $file"
        
        # Verificar si el archivo necesita el meta tag
        if ! grep -q 'name="format-detection"' "$file"; then
            echo "  ⚡ Agregando meta tag telephone=no"
            # Agregar meta tag después de viewport
            sed -i.bak 's|<meta content="width=device-width, initial-scale=1" name="viewport">|<meta content="width=device-width, initial-scale=1" name="viewport">\n  <meta name="format-detection" content="telephone=no">|g' "$file"
        fi
        
        # Cambiar formato de números de teléfono
        if grep -q '978-1978' "$file"; then
            echo "  📞 Cambiando formato número US: 978-1978 → 978•1978"
            sed -i.bak 's/978-1978/978•1978/g' "$file"
            ((files_updated++))
        fi
        
        if grep -q '3422 6971' "$file"; then
            echo "  📞 Cambiando formato número AR: 3422 6971 → 3422•6971"
            sed -i.bak 's/3422 6971/3422•6971/g' "$file"
            ((files_updated++))
        fi
        
        # Agregar CSS específico para iOS si no existe
        if ! grep -q "FIX CRÍTICO PARA IPHONE" "$file"; then
            echo "  🎨 Agregando CSS anti-detección iOS"
            # Buscar el cierre de </head> y agregar CSS antes
            sed -i.bak 's|</head>|  \n  <!-- ===== FIX CRÍTICO PARA IPHONE - ANTI-DETECCIÓN TELÉFONOS ===== -->\n  <style>\n    .footer-contact .phone, .mobile-menu-contact .phone, span.phone {\n      color: rgba(255, 255, 255, 0.8) !important;\n      text-decoration: none !important;\n      -webkit-text-decoration: none !important;\n      -webkit-text-decoration-line: none !important;\n      text-decoration-line: none !important;\n      -webkit-appearance: none !important;\n      pointer-events: none !important;\n      -webkit-touch-callout: none !important;\n      user-select: none !important;\n    }\n    @supports (-webkit-touch-callout: none) {\n      .footer-contact .phone, .mobile-menu-contact .phone {\n        color: rgba(255, 255, 255, 0.8) !important;\n        text-decoration: none !important;\n        -webkit-text-decoration: none !important;\n        border: none !important;\n        background: transparent !important;\n      }\n    }\n  </style>\n</head>|g' "$file"
        fi
        
        ((count++))
        echo "  ✅ Completado"
    fi
done

echo ""
echo "📊 RESUMEN:"
echo "  - Archivos procesados: $count"
echo "  - Archivos con números actualizados: $files_updated"
echo ""
echo "🚀 Para aplicar cambios ejecutar:"
echo "  git add -A && git commit -m '🔧 FIX MASIVO IPHONE: Meta tags + formato teléfonos + CSS anti-detección' && git push origin main"
echo ""
echo "⚠️  BACKUP: Los archivos .bak contienen las versiones originales"
echo "🧹 Para limpiar backups: rm *.bak" 