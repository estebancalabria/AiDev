# Laboratorio: Agente de Corrección Automática en Angular 20

Este laboratorio guía a los participantes para crear un **agente que corrige automáticamente un proyecto Angular 20** con errores, usando Node.js y un LLM (Groq API / OpenAI).

Se trabajará sobre un proyecto **micro-frontend Angular** con errores simulados, y el agente iterará hasta que compile correctamente.

---

## Pre-requisitos

* Node.js >= 18
* Angular CLI >= 20 (`npm install -g @angular/cli`)
* NPM / Yarn
* Groq API Key 
* Editor de código (VS Code recomendado)

---

## 1. Crear el proyecto Angular con errores

1. Crear proyecto base:

```cmd
   ng new micro-frontend --routing --style=scss
```

2. Crear componente `usuarios`:

```cmd
ng generate component usuarios
```

3. Agregar errores intencionales:

* En `usuarios.ts`:

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // backend Groq
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class Usuarios implements OnInit {

  usuarios: any[] = []  // ERROR 1: mal tipado, usar any en lugar de interface correcta

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsuarios()
  }

  loadUsuarios() {
    // ERROR 2: typo en console
    consol.log('Cargando usuarios...');

    // Petición a backend Groq simulado
    this.http.get('https://groq.io/api/usuarios').subscribe((data: any) => {
      this.usuarios = data
    })
  }

}

```

Pretar atencion errores por ejemplo
```ts
consol.log('Cargando usuarios...');
this.usuarios = usuariosData;
```

* En `usuarios.html`:

```html
<li *ngFor="let user of usuarios">{{user.nombre}}</li>
```

> Nota: Esto simula errores comunes de typos y variables inexistentes.

---

## 2. Preparar el agente Node.js

1. Crear carpeta `agente` dentro del proyecto:

```cmd
  mkdir agente
```

2. Crear `agente.js` y `config.js` dentro de `agente` (ver código ya corregido).

3. Configurar `config.js` con tus credenciales y parámetros:

```javascript
module.exports = {
  GROQ_API_KEY: 'TU_API_KEY_AQUI',
  MAX_ITERATIONS: 5,
  LLM_MODEL: 'gpt-4o-mini',
  ANGULAR_PROJECT_PATH: '../'
};
```

4. Codigo `agente.js`

```javascript
const path = require('path');
const ANGULAR_PROJECT_PATH = path.resolve(__dirname, '..');

const fs = require('fs-extra');

const { execSync } = require('child_process');

const OpenAI = require('openai');
const { GROQ_API_KEY, MAX_ITERATIONS, LLM_MODEL } = require('./config');

if (!GROQ_API_KEY) {
  console.error('⚠️ No GROQ_API_KEY definido.');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

// Ejecuta build y captura errores
function getBuildErrors() {
  try {
    execSync('ng build --configuration development', {
      cwd: ANGULAR_PROJECT_PATH,
      encoding: 'utf8',
      shell: true,
      stdio: 'pipe',
      env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' } // Deshabilita colores
    });
    return null; // No hay errores
  } catch (e) {
    let output = (e.stdout || '') + (e.stderr || '');
    // Elimina códigos ANSI de color
    output = output.replace(/\x1b\[[0-9;]*m/g, '');
    return output;
  }
}

// Parsea errores usando REGEX sobre todo el texto de una vez
function parseErrors(buildOutput) {
  const errors = [];
  
  console.log(`🔍 DEBUG: Output tiene ${buildOutput.length} caracteres`);
  console.log(`🔍 DEBUG: Primeros 200 chars: "${buildOutput.substring(0, 200)}"`);
  console.log(`🔍 DEBUG: Buscando patrones [ERROR] y [WARNING]...`);
  
  // Patrón: cualquier cosa + [ERROR] o [WARNING] + mensaje + archivo:línea:col
  // Usamos [\s\S] para capturar TODO incluyendo saltos de línea
  const pattern = /\[(ERROR|WARNING)\]\s+([^\n]+?)[\s\S]*?(src\/[^:]+):(\d+):(\d+):/g;
  
  let match;
  let matchCount = 0;
  while ((match = pattern.exec(buildOutput)) !== null) {
    matchCount++;
    console.log(`   ✓ Match ${matchCount}: ${match[1]} en ${match[3]}:${match[4]}:${match[5]}`);
    
    errors.push({
      type: match[1],
      message: match[2].trim(),
      file: match[3],
      line: match[4],
      col: match[5],
      context: []
    });
  }
  
  console.log(`📊 RESULTADO: ${errors.length} errores parseados\n`);
  
  return errors;
}

// Agrupa errores por archivo
function groupByFile(errors) {
  const groups = {};
  for (const err of errors) {
    if (!groups[err.file]) {
      groups[err.file] = [];
    }
    groups[err.file].push(err);
  }
  return groups;
}

// Llama a LLM para corregir un archivo con todos sus errores
async function fixFileWithErrors(filePath, fileErrors) {
  const absPath = path.resolve(ANGULAR_PROJECT_PATH, filePath);
  
  if (!fs.existsSync(absPath)) {
    throw new Error(`Archivo no existe: ${absPath}`);
  }
  
  const content = fs.readFileSync(absPath, 'utf-8');
  
  // Formatea errores de forma clara
  const errorList = fileErrors.map((err, idx) => {
    return `${idx + 1}. [${err.type}] Línea ${err.line}, Columna ${err.col}
   ${err.message}
   ${err.context.join('\n   ')}`;
  }).join('\n\n');

  const prompt = `Sos un experto en Angular y TypeScript. Corregí este archivo que tiene errores de compilación.

ARCHIVO: ${filePath}
${'='.repeat(60)}
${content}
${'='.repeat(60)}

ERRORES A CORREGIR:
${errorList}

INSTRUCCIONES:
1. Corregí TODOS los errores listados arriba
2. Para errores de typo (consol → console): corregí el nombre
3. Para variables inexistentes (usuariosData): definí la variable o usá datos mock apropiados
4. Para warnings de *ngFor sin CommonModule: agregá el import y ponelo en @Component.imports
5. NO hagas cambios innecesarios fuera de las correcciones
6. Mantené el formato y estilo del código original

Devolvé ÚNICAMENTE el contenido del archivo corregido, sin explicaciones ni markdown.`;

  const response = await openai.chat.completions.create({
    model: LLM_MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });

  let fixed = response.choices[0].message.content.trim();
  
  // Limpia markdown si lo agregó
  fixed = fixed.replace(/```(?:typescript|ts|html|javascript|js)?\n?/g, '');
  fixed = fixed.replace(/```$/g, '');
  
  return fixed;
}

async function main() {
  for (let iter = 1; iter <= MAX_ITERATIONS; iter++) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`🔄 ITERACIÓN ${iter}/${MAX_ITERATIONS}`);
    console.log('='.repeat(70));

    console.log('📦 Ejecutando build...');
    const buildOutput = getBuildErrors();

    if (!buildOutput) {
      console.log('✅ BUILD EXITOSO - No hay errores\n');
      console.log('🎉 PROYECTO LIMPIO Y LISTO');
      break;
    }

    console.log('⚠️ Build falló. Parseando errores...\n');
    
    const errors = parseErrors(buildOutput);
    
    // DEBUG: muestra lo que parseó
    console.log(`🔍 DEBUG: Parseados ${errors.length} errores`);
    if (errors.length > 0) {
      errors.forEach((e, i) => {
        console.log(`   ${i + 1}. ${e.type} en ${e.file}:${e.line}:${e.col}`);
      });
      console.log('');
    }
    
    if (errors.length === 0) {
      console.log('❌ No se pudieron parsear errores estructurados');
      console.log('\n📄 Output completo del build:');
      console.log(buildOutput);
      break;
    }

    console.log(`📋 Detectados ${errors.length} errores en total\n`);
    
    // Agrupa por archivo
    const fileGroups = groupByFile(errors);
    const fileCount = Object.keys(fileGroups).length;
    
    console.log(`📁 Archivos afectados: ${fileCount}\n`);
    
    // Corrige cada archivo CON TODOS SUS ERRORES de una vez
    for (const [file, fileErrors] of Object.entries(fileGroups)) {
      console.log(`🔧 ${file}`);
      console.log(`   ${fileErrors.length} error(es) a corregir:`);
      
      fileErrors.forEach((err, idx) => {
        console.log(`   ${idx + 1}. [${err.type}] Línea ${err.line}: ${err.message.substring(0, 60)}...`);
      });
      
      try {
        console.log(`   🤖 Llamando a LLM para correcciones...`);
        const fixed = await fixFileWithErrors(file, fileErrors);
        
        const absPath = path.resolve(ANGULAR_PROJECT_PATH, file);
        fs.writeFileSync(absPath, fixed, 'utf-8');
        
        console.log(`   ✅ Archivo corregido y guardado\n`);
      } catch (e) {
        console.error(`   ❌ Error: ${e.message}\n`);
      }
    }

    console.log('⏳ Esperando 2 segundos antes de re-verificar...');
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n' + '='.repeat(70));
  console.log('🏁 AGENTE FINALIZADO');
  console.log('='.repeat(70));
  
  // Verificación final
  console.log('\n🔍 Verificación final...');
  const finalCheck = getBuildErrors();
  
  if (!finalCheck) {
    console.log('✅ Build final: EXITOSO');
    console.log('\n🎊 El proyecto está completamente limpio y listo para usar');
  } else {
    console.log('⚠️ Aún hay problemas. Ejecutá manualmente:');
    console.log('   cd ..');
    console.log('   ng build');
  }
}

main().catch(err => {
  console.error('💥 Error fatal:', err);
  process.exit(1);
});
```

---

## 3. Ejecutar el agente

1. Abrir terminal en la carpeta `agente`.
2. Ejecutar:

```bash
node agente.js
```

3. El agente realizará las siguientes acciones:

* Ejecuta `ng build --configuration development`
* Captura los errores de compilación
* Parsea errores por archivo
* Llama al LLM para corregir cada archivo
* Sobrescribe los archivos con la versión corregida
* Repite hasta que el build sea exitoso o se alcance `MAX_ITERATIONS`

4. Verificación final:

* Si el build final es exitoso, el proyecto estará limpio y listo.
* Si quedan errores, se muestran en consola para corrección manual.

5. Ejemplo de Salida

```bash
C:\Cursos\migracion-ia\micro-frontend\agente>node agente

======================================================================
🔄 ITERACIÓN 1/200
======================================================================
📦 Ejecutando build...
⚠️ Build falló. Parseando errores...

🔍 DEBUG: Output tiene 1462 caracteres
🔍 DEBUG: Primeros 200 chars: "> Building...
✔ Console Ninja extension is connected to Angular, see https://tinyurl.com/2vt8jxzw
√ Building...
Application bundle generation failed. [1.758 seconds] - 2025-12-03T15:29:56.694Z

▲ [W"
🔍 DEBUG: Buscando patrones [ERROR] y [WARNING]...
   ✓ Match 1: WARNING en src/app/usuarios/usuarios.html:3:7
   ✓ Match 2: ERROR en src/app/usuarios/usuarios.ts:21:4
   ✓ Match 3: ERROR en src/app/usuarios/usuarios.ts:24:20
📊 RESULTADO: 3 errores parseados

🔍 DEBUG: Parseados 3 errores
   1. WARNING en src/app/usuarios/usuarios.html:3:7
   2. ERROR en src/app/usuarios/usuarios.ts:21:4
   3. ERROR en src/app/usuarios/usuarios.ts:24:20

📋 Detectados 3 errores en total

📁 Archivos afectados: 2

🔧 src/app/usuarios/usuarios.html
   1 error(es) a corregir:
   1. [WARNING] Línea 3: N...
   🤖 Llamando a LLM para correcciones...
   ✅ Archivo corregido y guardado

🔧 src/app/usuarios/usuarios.ts
   2 error(es) a corregir:
   1. [ERROR] Línea 21: T...
   2. [ERROR] Línea 24: T...
   🤖 Llamando a LLM para correcciones...
   ✅ Archivo corregido y guardado

⏳ Esperando 2 segundos antes de re-verificar...

======================================================================
🔄 ITERACIÓN 2/200
======================================================================
📦 Ejecutando build...
✅ BUILD EXITOSO - No hay errores

🎉 PROYECTO LIMPIO Y LISTO

======================================================================
🏁 AGENTE FINALIZADO
======================================================================

🔍 Verificación final...
✅ Build final: EXITOSO

🎊 El proyecto está completamente limpio y listo para usar

C:\Cursos\migracion-ia\micro-frontend\agente>
C:\Cursos\migracion-ia\micro-frontend\agente>node agente

======================================================================
🔄 ITERACIÓN 1/200
======================================================================
📦 Ejecutando build...
✅ BUILD EXITOSO - No hay errores

🎉 PROYECTO LIMPIO Y LISTO

======================================================================
🏁 AGENTE FINALIZADO
======================================================================

🔍 Verificación final...
^C
C:\Cursos\migracion-ia\micro-frontend\agente>
```

---

## 4.Version del Agente en C#

```c#
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

class Program
{
    static readonly string AngularProjectPath = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, ".."));
    static readonly string GroqApiKey = "....";
    static readonly string LlmModel = "openai/gpt-oss-20b";
    static readonly int MaxIterations = 200;

    static async Task Main(string[] args)
    {
        if (string.IsNullOrWhiteSpace(GroqApiKey))
        {
            Console.WriteLine("⚠️ No GROQ_API_KEY definido.");
            return;
        }

        var httpClient = new HttpClient();
        httpClient.BaseAddress = new Uri("https://api.groq.com/openai/v1/");
        httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {GroqApiKey}");

        for (int iter = 1; iter <= MaxIterations; iter++)
        {
            Console.WriteLine(new string('=', 70));
            Console.WriteLine($"🔄 ITERACIÓN {iter}/{MaxIterations}");
            Console.WriteLine(new string('=', 70));

            Console.WriteLine("📦 Ejecutando build...");
            string? buildOutput = await GetBuildErrorsAsync();

            if (buildOutput == null)
            {
                Console.WriteLine("✅ BUILD EXITOSO - No hay errores\n");
                Console.WriteLine("🎉 PROYECTO LIMPIO Y LISTO");
                break;
            }

            Console.WriteLine("⚠️ Build falló. Parseando errores...\n");
            var errors = ParseErrors(buildOutput);

            Console.WriteLine($"🔍 DEBUG: Parseados {errors.Count} errores");
            if (errors.Any())
            {
                for (int i = 0; i < errors.Count; i++)
                {
                    var e = errors[i];
                    Console.WriteLine($"   {i + 1}. {e.Type} en {e.File}:{e.Line}:{e.Col}");
                }
                Console.WriteLine();
            }

            if (!errors.Any())
            {
                Console.WriteLine("❌ No se pudieron parsear errores estructurados");
                Console.WriteLine("\n📄 Output completo del build:");
                Console.WriteLine(buildOutput);
                break;
            }

            Console.WriteLine($"📋 Detectados {errors.Count} errores en total\n");

            var fileGroups = errors.GroupBy(e => e.File).ToDictionary(g => g.Key, g => g.ToList());
            Console.WriteLine($"📁 Archivos afectados: {fileGroups.Count}\n");

            foreach (var kvp in fileGroups)
            {
                string file = kvp.Key;
                var fileErrors = kvp.Value;

                Console.WriteLine($"🔧 {file}");
                Console.WriteLine($"   {fileErrors.Count} error(es) a corregir:");

                for (int i = 0; i < fileErrors.Count; i++)
                {
                    var err = fileErrors[i];
                    string msgPreview = err.Message.Length > 60 ? err.Message.Substring(0, 60) + "..." : err.Message;
                    Console.WriteLine($"   {i + 1}. [{err.Type}] Línea {err.Line}: {msgPreview}");
                }

                try
                {
                    Console.WriteLine("   🤖 Llamando a LLM para correcciones...");
                    string fixedContent = await FixFileWithErrorsAsync(httpClient, file, fileErrors);
                    string absPath = Path.GetFullPath(Path.Combine(AngularProjectPath, file));
                    await File.WriteAllTextAsync(absPath, fixedContent);
                    Console.WriteLine("   ✅ Archivo corregido y guardado\n");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"   ❌ Error: {ex.Message}\n");
                }
            }

            Console.WriteLine("⏳ Esperando 2 segundos antes de re-verificar...");
            await Task.Delay(2000);
        }

        Console.WriteLine(new string('=', 70));
        Console.WriteLine("🏁 AGENTE FINALIZADO");
        Console.WriteLine(new string('=', 70));

        Console.WriteLine("\n🔍 Verificación final...");
        string? finalCheck = await GetBuildErrorsAsync();
        if (finalCheck == null)
        {
            Console.WriteLine("✅ Build final: EXITOSO");
            Console.WriteLine("\n🎊 El proyecto está completamente limpio y listo para usar");
        }
        else
        {
            Console.WriteLine("⚠️ Aún hay problemas. Ejecutá manualmente:");
            Console.WriteLine("   cd ..");
            Console.WriteLine("   ng build");
        }
    }

    static async Task<string?> GetBuildErrorsAsync()
    {
        try
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = "ng",
                Arguments = "build --configuration development",
                WorkingDirectory = AngularProjectPath,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
                Environment =
                {
                    ["NO_COLOR"] = "1",
                    ["FORCE_COLOR"] = "0"
                }
            };

            using var process = Process.Start(startInfo)!;
            string stdout = await process.StandardOutput.ReadToEndAsync();
            string stderr = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            if (process.ExitCode == 0) return null;

            string output = (stdout + stderr).Replace("\r", "");
            // Elimina ANSI color codes
            output = Regex.Replace(output, @"\x1B\[[0-9;]*[mK]", "");
            return output;
        }
        catch (Exception ex)
        {
            return $"Error al ejecutar ng build: {ex.Message}";
        }
    }

    static List<BuildError> ParseErrors(string buildOutput)
    {
        var errors = new List<BuildError>();
        Console.WriteLine($"🔍 DEBUG: Output tiene {buildOutput.Length} caracteres");
        Console.WriteLine($"🔍 DEBUG: Primeros 200 chars: \"{buildOutput.Substring(0, Math.Min(200, buildOutput.Length))}\"");
        Console.WriteLine("🔍 DEBUG: Buscando patrones [ERROR] y [WARNING]...");

        // Patrón: [ERROR] o [WARNING], mensaje, archivo:línea:col
        var pattern = new Regex(@"\[(ERROR|WARNING)\]\s+([^\n]+?)[\s\S]*?(src/[^:]+):(\d+):(\d+):", RegexOptions.Multiline);
        var matches = pattern.Matches(buildOutput);

        for (int i = 0; i < matches.Count; i++)
        {
            var match = matches[i];
            Console.WriteLine($"   ✓ Match {i + 1}: {match.Groups[1].Value} en {match.Groups[3].Value}:{match.Groups[4].Value}:{match.Groups[5].Value}");
            errors.Add(new BuildError
            {
                Type = match.Groups[1].Value,
                Message = match.Groups[2].Value.Trim(),
                File = match.Groups[3].Value,
                Line = match.Groups[4].Value,
                Col = match.Groups[5].Value
            });
        }

        Console.WriteLine($"📊 RESULTADO: {errors.Count} errores parseados\n");
        return errors;
    }

    static async Task<string> FixFileWithErrorsAsync(HttpClient client, string filePath, List<BuildError> fileErrors)
    {
        string absPath = Path.GetFullPath(Path.Combine(AngularProjectPath, filePath));
        if (!File.Exists(absPath))
            throw new FileNotFoundException($"Archivo no existe: {absPath}");

        string content = await File.ReadAllTextAsync(absPath);

        var errorList = string.Join("\n\n", fileErrors.Select((err, idx) =>
            $"{idx + 1}. [{err.Type}] Línea {err.Line}, Columna {err.Col}\n   {err.Message}"
        ));

        string prompt = $@"Sos un experto en Angular y TypeScript. Corregí este archivo que tiene errores de compilación.

ARCHIVO: {filePath}
{new string('=', 60)}
{content}
{new string('=', 60)}

ERRORES A CORREGIR:
{errorList}

INSTRUCCIONES:
1. Corregí TODOS los errores listados arriba
2. Para errores de typo (consol → console): corregí el nombre
3. Para variables inexistentes (usuariosData): definí la variable o usá datos mock apropiados
4. Para warnings de *ngFor sin CommonModule: agregá el import y ponelo en @Component.imports
5. NO hagas cambios innecesarios fuera de las correcciones
6. Mantené el formato y estilo del código original

Devolvé ÚNICAMENTE el contenido del archivo corregido, sin explicaciones ni markdown.";

        var requestBody = new
        {
            model = LlmModel,
            messages = new[] { new { role = "user", content = prompt } },
            temperature = 0.0
        };

        var json = JsonSerializer.Serialize(requestBody);
        var contentHttp = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await client.PostAsync("chat/completions", contentHttp);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(responseJson);
        string fixedCode = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? "";

        // Limpia markdown
        fixedCode = Regex.Replace(fixedCode, @"```(?:typescript|ts|html|javascript|js)?\r?\n?", "", RegexOptions.IgnoreCase);
        fixedCode = Regex.Replace(fixedCode, @"```$", "", RegexOptions.Multiline);
        return fixedCode.Trim();
    }
}

class BuildError
{
    public string Type { get; init; } = "";
    public string Message { get; init; } = "";
    public string File { get; init; } = "";
    public string Line { get; init; } = "";
    public string Col { get; init; } = "";
}
```

---

## 5. Tips para el laboratorio

* Mantener `MAX_ITERATIONS` bajo (3-5) para pruebas iniciales.
* Agregar más errores intencionales para probar el agente.
* Revisar cada archivo corregido para ver cómo el LLM interpreta los prompts.
* Este flujo es 100% local: **no modifica repositorios externos**.

---

## 6. Objetivo del ejercicio

* Aprender a integrar **Node.js + LLMs** para corrección automática de código Angular.
* Entender el ciclo de **leer errores, parsear, enviar al LLM y sobrescribir archivos**.
* Experimentar con Angular 20 y micro-frontends en un contexto de **migración asistida por IA**.

---

Si querés, puedo hacer **una versión visual resumida en pasos numerados y diagramas ASCII**, ideal para slide o presentación para los alumnos. Esto ayudaría a que lo entiendan en 2 minutos.

¿Querés que haga eso también?
