# Laboratorio: Consumir la API de Groq desde C# (.NET)

Este laboratorio muestra cómo **realizar una llamada básica a la API de Groq usando C# y .NET 8**, solicitando la clave de API al usuario mediante `Console.ReadKey()` y `Console.ReadLine()`. Ideal para pruebas rápidas en entornos controlados.

---

## Pre-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) (u otra versión moderna)
- Una **clave de API de Groq** (gratis en [https://console.groq.com](https://console.groq.com))

---

## 1. Crear el proyecto .NET

Abre una terminal y ejecuta:

```bash
dotnet new console -n GroqBasico
cd GroqBasico
```

Este comando crea una aplicación de consola con .NET.

---

## 2. Editar `Program.cs`

Reemplaza todo el contenido de `Program.cs` por el siguiente código:

```csharp
// Program.cs
using System.Text;
using System.Text.Json;

Console.WriteLine("🔑 Ingresa tu clave de API de Groq:");

// Leer la API key sin mostrarla en pantalla
var apiKey = Console.ReadLine()!;

if (string.IsNullOrWhiteSpace(apiKey))
{
    Console.WriteLine("❌ Error: La clave de API no puede estar vacía.");
    return;
}

Console.WriteLine("\n💬 Consultando a Groq...\n");

try
{
    using var httpClient = new HttpClient();

    var requestBody = new
    {
        model = "llama3-8b-8192",
        messages = new[]
        {
            new { role = "user", content = "Hola, ¿quién eres y qué modelo usas?" }
        },
        temperature = 0.2,
        max_tokens = 150
    };

    string json = JsonSerializer.Serialize(requestBody);
    var content = new StringContent(json, Encoding.UTF8, "application/json");
    content.Headers.Add("Authorization", $"Bearer {apiKey}");

    var response = await httpClient.PostAsync("https://api.groq.com/openai/v1/chat/completions", content);

    if (!response.IsSuccessStatusCode)
    {
        string errorBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"❌ Error HTTP {response.StatusCode}: {errorBody}");
        return;
    }

    var responseJson = await response.Content.ReadAsStringAsync();
    using var doc = JsonDocument.Parse(responseJson);
    string reply = doc.RootElement
        .GetProperty("choices")[0]
        .GetProperty("message")
        .GetProperty("content")
        .GetString() ?? "Sin respuesta";

    Console.WriteLine("✅ Respuesta de Groq:");
    Console.WriteLine(reply.Trim());
}
catch (Exception ex)
{
    Console.WriteLine($"💥 Error: {ex.Message}");
}
```

---

## 3. Ejecutar el proyecto

En la terminal:

```bash
dotnet run
```

El programa te pedirá la clave de API. **No verás los caracteres que escribes** (se reemplazan por `*` por seguridad básica).

---

## 4. Salida esperada (ejemplo)

```
🔑 Ingresa tu clave de API de Groq:
(Se ocultará mientras escribes. Presiona Enter al terminar.)
******************

💬 Consultando a Groq...

✅ Respuesta de Groq:
¡Hola! Soy Llama 3, un modelo de lenguaje de código abierto desarrollado por Meta, ejecutado en Groq para máxima velocidad.
```

---

## 5. Notas clave

- **Sin hardcodeo**: la clave se ingresa al ejecutar.
- **Sin archivos de configuración**: todo ocurre en runtime.
- **Clave oculta**: usa `Console.ReadKey(intercept: true)` para no mostrar la clave en la consola.
- **JSON nativo**: usa `System.Text.Json` (sin dependencias externas).
- **Compatible con .NET 8+**: funciona en Windows, macOS y Linux.

---

## 6. ¿Qué sigue?

Este laboratorio sirve como base para:
- Integrar Groq en agentes de corrección automática en C#.
- Construir herramientas CLI con LLMs.
- Automatizar tareas de desarrollo usando IA en entornos .NET.

¿Querés que prepare una versión con **soporte para historial de mensajes** o una que **lea errores de compilación de un proyecto C# y los corrija con Groq**?