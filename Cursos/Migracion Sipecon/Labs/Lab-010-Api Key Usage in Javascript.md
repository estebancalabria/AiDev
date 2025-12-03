Perfecto, Esteban. A continuación te presento el **laboratorio actualizado**, con la **API key de Groq hardcodeada directamente en el código** (como pediste), manteniendo el mismo estilo limpio, claro y listo para copiar y pegar.

---

# Laboratorio: Consumir la API de Groq desde Node.js (con API key en código)

Este laboratorio muestra cómo **realizar una llamada básica a la API de Groq usando Node.js**, con la clave de API **hardcodeada directamente en el archivo**. Es ideal para pruebas rápidas, prototipado local o entornos controlados.

> ⚠️ **Advertencia**: Nunca commitees este archivo si contiene tu clave real. Úsalo solo en entornos locales o temporales.

---

## Pre-requisitos

- Node.js >= 18  
- Una **clave de API de Groq** (gratis en [https://console.groq.com](https://console.groq.com))

---

## 1. Crear el proyecto Node.js

```bash
mkdir groq-basico
cd groq-basico
npm init -y
```

> No se requieren dependencias: Node.js 18+ incluye `fetch` nativo.

---

## 2. Crear el script `groq.js`

```javascript
// groq.js

// 🔑 Reemplazá esta clave por tu propia API key de Groq
const GROQ_API_KEY = 'gsk_tu_clave_real_aqui';

if (!GROQ_API_KEY || GROQ_API_KEY.startsWith('gsk_tu_clave')) {
  console.error('❌ Error: debes reemplazar GROQ_API_KEY con tu clave real en el código.');
  process.exit(1);
}

async function callGroq() {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // modelo rápido y gratuito
        messages: [
          { role: 'user', content: 'Hola, ¿quién eres y qué modelo usas?' }
        ],
        temperature: 0.2,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error HTTP ${response.status}:`, errorText);
      return;
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sin respuesta';
    console.log('\n✅ Respuesta de Groq:');
    console.log(reply.trim());
  } catch (err) {
    console.error('💥 Error al llamar a Groq:', err.message);
  }
}

// Ejecutar
callGroq();
```

---

## 3. Ejecutar el script

1. Ve a [https://console.groq.com](https://console.groq.com) y copia tu clave de API.
2. Reemplaza la línea:

   ```javascript
   const GROQ_API_KEY = 'gsk_tu_clave_real_aqui';
   ```

   por tu clave real, por ejemplo:

   ```javascript
   const GROQ_API_KEY = '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';
   ```

3. Ejecuta en la terminal:

   ```bash
   node groq.js
   ```

---

## 4. Salida esperada

```
✅ Respuesta de Groq:
¡Hola! Soy Llama 3, un modelo de lenguaje de código abierto desarrollado por Meta, ejecutado en la plataforma Groq.
```

---

## 5. Notas clave

- **Sin dependencias externas**: usa `fetch` nativo de Node.js 18+.
- **Sin archivos de entorno**: la clave está en el código (ideal para pruebas rápidas).
- **Validación integrada**: si no cambias la clave de ejemplo, el script se detiene con un error claro.
- **Modelo gratuito**: `llama3-8b-8192` es rápido, gratuito y suficiente para prototipado.

---

## Siguiente paso

Una vez que este script funcione, estarás listo para integrar Groq en flujos más complejos, como el **agente de corrección automática de Angular**.

¿Querés que prepare ahora una versión de este laboratorio con **soporte para TypeScript** o con **múltiples mensajes en el historial**?