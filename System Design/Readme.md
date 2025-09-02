\## IA para System Design (Disenio de Sistemaas)



\### Diagram GPT



Herramienta para digramar y generar la arquitectura de la aplicacion



> https://www.eraser.io/diagramgpt



Prompt utilizado (mas pro si lo pasaramos por chaatgpt)



```

Generame un diagraama de arquitectrua para una aplicacion tipo netflix que voy a hacer deploy en Azure

```



Ver imagen en diagramgpt/



\* Permite importar diagramas de otras herramientas como Draw.io o lucidchart

\* Permite subir los diagramas a github

\* Permite exprotar los diagramas como imagen





\### Lenguaje general para hacer diagramas



Mermaid

> https://mermaid.live/



ChatGPT y cualquier llm (en especial Claude) saben generar diagramas mermaid...



Por ejemplo a ChatGPT le puedo decir



```

Generame un diagrama de secuenca en mermaid que muestre en detalle la autenticacion oauth

```



y me va  a generar algo como lo siquitente



```mermaid

sequenceDiagram

&nbsp;   participant Usuario

&nbsp;   participant Cliente as Aplicación Cliente

&nbsp;   participant Navegador

&nbsp;   participant ServidorAutorizacion as Servidor de Autorización

&nbsp;   participant ServidorRecursos as Servidor de Recursos



&nbsp;   Usuario->>Navegador: Accede a la aplicación

&nbsp;   Navegador->>Cliente: Solicita acceso a un recurso protegido

&nbsp;   Cliente->>Navegador: Redirige al Servidor de Autorización<br/>con client\_id, scope, redirect\_uri



&nbsp;   Navegador->>ServidorAutorizacion: Solicitud de autorización

&nbsp;   ServidorAutorizacion->>Usuario: Pide credenciales y consentimiento

&nbsp;   Usuario->>ServidorAutorizacion: Ingresa credenciales y otorga permisos



&nbsp;   ServidorAutorizacion->>Navegador: Redirige a redirect\_uri<br/>con código de autorización

&nbsp;   Navegador->>Cliente: Entrega el código de autorización



&nbsp;   Cliente->>ServidorAutorizacion: Intercambia código por Access Token<br/>(+ Client Secret)

&nbsp;   ServidorAutorizacion->>Cliente: Devuelve Access Token (+ opcional Refresh Token)



&nbsp;   Cliente->>ServidorRecursos: Solicita recurso con Access Token

&nbsp;   ServidorRecursos->>Cliente: Devuelve recurso protegido

&nbsp;   Cliente->>Usuario: Muestra los datos autorizados



```



Claude soporta Mermaid con sus artefactos de forma nativa. Se le puede pedir algo como\\\\

Prompt para Claude:

```

Haceme un artefacto con el diagrama de clases mermaid para un videoclub. Que sea completo, profesional y listo para una aplicacion del mundo real. Solo la parte del modelo.

```

&nbsp;   

y va a generarar algo asi directamente como artefacto:

&nbsp;    

```

classDiagram

&nbsp;   class Cliente {

&nbsp;       -Long id

&nbsp;       -String nombre

&nbsp;       -String apellido

&nbsp;       -String dni

&nbsp;       -String telefono

&nbsp;       -String email

&nbsp;       -String direccion

&nbsp;       -LocalDate fechaNacimiento

&nbsp;       -LocalDateTime fechaRegistro

&nbsp;       -EstadoCliente estado

&nbsp;       -BigDecimal saldoPendiente

&nbsp;       +registrarCliente()

&nbsp;       +actualizarDatos()

&nbsp;       +suspenderCliente()

&nbsp;       +calcularMultas()

&nbsp;       +obtenerHistorialAlquileres()

&nbsp;   }



&nbsp;   class Pelicula {

&nbsp;       -Long id

&nbsp;       -String titulo

&nbsp;       -String director

&nbsp;       -Integer añoEstreno

&nbsp;       -Integer duracionMinutos

&nbsp;       -String sinopsis

&nbsp;       -ClasificacionEdad clasificacion

&nbsp;       -String paisOrigen

&nbsp;       -String idioma

&nbsp;       -LocalDateTime fechaRegistro

&nbsp;       +buscarPorTitulo()

&nbsp;       +buscarPorDirector()

&nbsp;       +buscarPorGenero()

&nbsp;       +obtenerCopias()

&nbsp;   }



&nbsp;   class Copia {

&nbsp;       -Long id

&nbsp;       -String codigoBarras

&nbsp;       -EstadoCopia estado

&nbsp;       -FormatoCopia formato

&nbsp;       -LocalDate fechaAdquisicion

&nbsp;       -BigDecimal precioCompra

&nbsp;       -String ubicacionFisica

&nbsp;       -Integer vecesAlquilada

&nbsp;       +marcarDisponible()

&nbsp;       +marcarAlquilada()

&nbsp;       +marcarDañada()

&nbsp;       +calcularDepreciacion()

&nbsp;   }



&nbsp;   class Alquiler {

&nbsp;       -Long id

&nbsp;       -LocalDateTime fechaAlquiler

&nbsp;       -LocalDateTime fechaVencimiento

&nbsp;       -LocalDateTime fechaDevolucion

&nbsp;       -BigDecimal precio

&nbsp;       -EstadoAlquiler estado

&nbsp;       -String observaciones

&nbsp;       +calcularMulta()

&nbsp;       +procesarDevolucion()

&nbsp;       +extenderAlquiler()

&nbsp;       +generarRecibo()

&nbsp;   }



&nbsp;   class Empleado {

&nbsp;       -Long id

&nbsp;       -String nombre

&nbsp;       -String apellido

&nbsp;       -String dni

&nbsp;       -String telefono

&nbsp;       -String email

&nbsp;       -LocalDate fechaIngreso

&nbsp;       -BigDecimal salario

&nbsp;       -TipoEmpleado tipo

&nbsp;       -String turno

&nbsp;       -Boolean activo

&nbsp;       +procesarAlquiler()

&nbsp;       +procesarDevolucion()

&nbsp;       +registrarCliente()

&nbsp;       +generarReporte()

&nbsp;   }



&nbsp;   class Sucursal {

&nbsp;       -Long id

&nbsp;       -String nombre

&nbsp;       -String direccion

&nbsp;       -String telefono

&nbsp;       -String email

&nbsp;       -String horarioAtencion

&nbsp;       -Boolean activa

&nbsp;       -Integer capacidadCopias

&nbsp;       +obtenerInventario()

&nbsp;       +transferirCopia()

&nbsp;       +generarReporteVentas()

&nbsp;   }



&nbsp;   class Genero {

&nbsp;       -Long id

&nbsp;       -String nombre

&nbsp;       -String descripcion

&nbsp;       +obtenerPeliculas()

&nbsp;   }



&nbsp;   class Proveedor {

&nbsp;       -Long id

&nbsp;       -String nombre

&nbsp;       -String contacto

&nbsp;       -String telefono

&nbsp;       -String email

&nbsp;       -String direccion

&nbsp;       -Boolean activo

&nbsp;       +obtenerCatalogo()

&nbsp;       +procesarPedido()

&nbsp;   }



&nbsp;   class PedidoCopia {

&nbsp;       -Long id

&nbsp;       -LocalDateTime fechaPedido

&nbsp;       -LocalDateTime fechaEntrega

&nbsp;       -Integer cantidad

&nbsp;       -BigDecimal precioTotal

&nbsp;       -EstadoPedido estado

&nbsp;       +confirmarPedido()

&nbsp;       +procesarEntrega()

&nbsp;       +cancelarPedido()

&nbsp;   }



&nbsp;   class Multa {

&nbsp;       -Long id

&nbsp;       -BigDecimal monto

&nbsp;       -String concepto

&nbsp;       -LocalDateTime fechaGeneracion

&nbsp;       -LocalDateTime fechaPago

&nbsp;       -EstadoMulta estado

&nbsp;       -String metodoPago

&nbsp;       +procesarPago()

&nbsp;       +aplicarDescuento()

&nbsp;   }



&nbsp;   class Pago {

&nbsp;       -Long id

&nbsp;       -BigDecimal monto

&nbsp;       -LocalDateTime fecha

&nbsp;       -MetodoPago metodo

&nbsp;       -String numeroTransaccion

&nbsp;       -String observaciones

&nbsp;       +procesarPago()

&nbsp;       +generarComprobante()

&nbsp;       +anularPago()

&nbsp;   }



&nbsp;   class Reserva {

&nbsp;       -Long id

&nbsp;       -LocalDateTime fechaReserva

&nbsp;       -LocalDateTime fechaVencimiento

&nbsp;       -EstadoReserva estado

&nbsp;       -String observaciones

&nbsp;       +confirmarReserva()

&nbsp;       +cancelarReserva()

&nbsp;       +convertirAAlquiler()

&nbsp;   }



&nbsp;   Cliente "1" --> "0..\*" Alquiler

&nbsp;   Cliente "1" --> "0..\*" Multa

&nbsp;   Cliente "1" --> "0..\*" Pago

&nbsp;   Cliente "1" --> "0..\*" Reserva

&nbsp;   

&nbsp;   Pelicula "1" --> "0..\*" Copia

&nbsp;   Pelicula "\*" --> "\*" Genero

&nbsp;   

&nbsp;   Copia "1" --> "0..\*" Alquiler

&nbsp;   Copia "1" --> "0..\*" Reserva

&nbsp;   

&nbsp;   Alquiler "1" --> "0..\*" Multa

&nbsp;   Alquiler "\*" --> "1" Empleado

&nbsp;   

&nbsp;   Empleado "\*" --> "1" Sucursal

&nbsp;   Copia "\*" --> "1" Sucursal

&nbsp;   

&nbsp;   Proveedor "1" --> "0..\*" PedidoCopia

&nbsp;   PedidoCopia "\*" --> "1" Pelicula

&nbsp;   PedidoCopia "\*" --> "1" Sucursal

&nbsp;   

&nbsp;   Pago "\*" --> "1" Alquiler

&nbsp;   Pago "\*" --> "1" Multa

&nbsp;   Reserva "\*" --> "1" Empleado

```



\## OTra herramienta para digramas arquitectura



Structurizr



> https://structurizr.com/



Use este prompt en chatgpt



```

Generarme un diagrama de ejemplo de una arquitectura para utilizar con struturizr. Dame el texto en el lenguaje DSL de la herramienta

```



Me genero esto



```

workspace "Ejemplo Arquitectura Web" {



&nbsp;   model {

&nbsp;       user = person "Usuario" {

&nbsp;           description "Un usuario que accede a la aplicación desde un navegador web."

&nbsp;       }



&nbsp;       webApp = softwareSystem "Aplicación Web" {

&nbsp;           description "Sistema de reservas online."



&nbsp;           frontend = container "Frontend" {

&nbsp;               technology "React"

&nbsp;               description "Interfaz web para que los usuarios gestionen sus reservas."

&nbsp;           }



&nbsp;           backend = container "Backend API" {

&nbsp;               technology "Spring Boot"

&nbsp;               description "Expone una API REST para manejar lógica de negocio."

&nbsp;           }



&nbsp;           database = container "Base de Datos" {

&nbsp;               technology "PostgreSQL"

&nbsp;               description "Almacena información de usuarios, reservas y pagos."

&nbsp;           }



&nbsp;           user -> frontend "Usa" "HTTPS"

&nbsp;           frontend -> backend "Consume API" "JSON/HTTPS"

&nbsp;           backend -> database "Lee y escribe datos" "JDBC"

&nbsp;       }

&nbsp;   }



&nbsp;   views {

&nbsp;       systemContext webApp {

&nbsp;           include \*

&nbsp;           autolayout lr

&nbsp;           title "Diagrama de Contexto"

&nbsp;       }



&nbsp;       container webApp {

&nbsp;           include \*

&nbsp;           autolayout lr

&nbsp;           title "Diagrama de Contenedores"

&nbsp;       }



&nbsp;       theme default

&nbsp;   }

}



```





