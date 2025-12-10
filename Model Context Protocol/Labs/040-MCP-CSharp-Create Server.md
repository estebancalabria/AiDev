
# Laboratorio - Creando un Servidor MCP de Prueba en DotNEt

## Requerimientos

* DotNet
* Visual Studio Code

## Pasos

* Crear un proyecto en la Consola

```
dotnet new console --name MCPServerDemo
```

* Ir a la carpeta

```
cd MCPServerDemo
```

* Agregar las dependencia a ModelContextProtocl

```
dotnet add package ModelContextProtocol --prerelease
```

* Agregar las dependencia a Microsoft.Extensions.Hosting
```
dotnet add package Microsoft.Extensions.Hosting
```

* Modificar Archivo Program.cs

```c#
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ModelContextProtocol;
using System.Threading.Tasks;

// Se utiliza Host.CreateEmptyApplicationBuilder(settings: null) para el transporte STDIO.
var builder = Host.CreateEmptyApplicationBuilder(settings: null);

// Configuración del servidor MCP
builder.Services.AddMcpServer()
    // Conexión usando el transporte STDIO
    .WithStdioServerTransport()
    // Busca y registra automáticamente las herramientas marcadas con [McpServerTool]
    // (como la herramienta 'Hello') en el ensamblado.
    .WithToolsFromAssembly(); 

var app = builder.Build();

// Inicia el servidor
await app.RunAsync();
```

* Agregar el archivo HelloTool.cs

```c#
// McpHelloServer/HelloTools.cs

using System.ComponentModel;
using ModelContextProtocol.Server;
using System.Text.Json.Serialization;


// 1. Marcar la clase como contenedor de herramientas MCP
[McpServerToolType]
public static class HelloTools
{
    // Definición del tipo de objeto que representa el resultado de la herramienta
    // En MCP, las herramientas suelen devolver objetos ToolResult
    public record ToolResult(
        [property: JsonPropertyName("content")] List<ToolResultContent> Content
    );
    
    // Definición del contenido de texto (similar a { type: "text", text: "..." })
    public record ToolResultContent(
        [property: JsonPropertyName("type")] string Type,
        [property: JsonPropertyName("text")] string Text
    );

    /// <summary>
    /// Herramienta que devuelve un saludo personalizado en español.
    /// </summary>
    /// <param name="name">El nombre de la persona a saludar.</param>
    /// <returns>Un objeto ToolResult con el saludo.</returns>
    [McpServerTool, Description("Returns a greeting in Spanish")]
    public static Task<ToolResult> HelloTool(
        [Description("Person's name")] string name)
    {
        var response = new ToolResult(
            Content: new List<ToolResultContent>
            {
                new("text", $"¡Hola {name}! Te saluda tu servidor MCP .NET desde C#.")
            }
        );
        
        // Retornar la respuesta como una tarea asíncrona
        return Task.FromResult(response);
    }
}
```

* Compilar el proyecto

```bash
dotnet publish -c Release -r win-x64 --self-contained true
```

* Para invocarlo usar el mcp.json en carpeta .vscode

```json
{
    "servers": {
        "mcp-dotnet-hello": {
            "command": "C:\\...\\MCPServerDemo.exe",
            "args": [] 
        }
    }
}
```
