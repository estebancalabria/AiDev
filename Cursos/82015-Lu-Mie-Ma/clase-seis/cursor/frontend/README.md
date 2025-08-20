# E-commerce Frontend

Frontend del e-commerce desarrollado en HTML, CSS y JavaScript vanilla con Tailwind CSS.

## Características

- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Interfaz Moderna**: Utiliza Tailwind CSS para un diseño atractivo
- **Navegación SPA**: Single Page Application con navegación fluida
- **Carrito de Compras**: Gestión completa del carrito con persistencia
- **Búsqueda en Tiempo Real**: Búsqueda de productos con debounce
- **Filtros por Categoría**: Filtrado de productos por categorías
- **Checkout Completo**: Formulario de pago con validación
- **Notificaciones Toast**: Sistema de notificaciones para el usuario

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **Tailwind CSS**: Framework CSS utility-first (via CDN)
- **JavaScript ES6+**: Funcionalidad moderna del navegador
- **Font Awesome**: Iconos vectoriales
- **Fetch API**: Comunicación con el backend

## Estructura de Archivos

```
frontend/
├── index.html          # Página principal
├── js/
│   └── app.js         # Lógica principal de la aplicación
└── README.md          # Este archivo
```

## Funcionalidades

### 1. Navegación
- **Inicio**: Página de bienvenida con botones de acción
- **Productos**: Catálogo de productos con filtros
- **Carrito**: Gestión del carrito de compras

### 2. Gestión de Productos
- Visualización en grilla responsive
- Filtrado por categorías
- Búsqueda en tiempo real
- Información detallada de cada producto

### 3. Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Cálculo automático del total
- Persistencia de datos

### 4. Checkout
- Formulario de información del cliente
- Validación de campos requeridos
- Procesamiento de órdenes
- Confirmación de pedido

### 5. Características Adicionales
- Loading states
- Notificaciones toast
- Manejo de errores
- Diseño responsive

## Uso

1. **Abrir el archivo**: Abre `index.html` en tu navegador
2. **Navegar**: Usa los botones de navegación para moverte entre secciones
3. **Explorar productos**: Navega por el catálogo y usa los filtros
4. **Agregar al carrito**: Haz clic en "Agregar al Carrito" en cualquier producto
5. **Gestionar carrito**: Modifica cantidades o elimina productos
6. **Checkout**: Completa el formulario de pago para finalizar la compra

## Requisitos

- Navegador web moderno con soporte para ES6+
- Backend API funcionando en `http://localhost:3000`
- Conexión a internet para CDNs (Tailwind CSS, Font Awesome)

## Personalización

### Colores
Los colores principales se pueden modificar en el archivo `index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',    // Azul principal
                secondary: '#1E40AF',  // Azul secundario
                accent: '#F59E0B'      // Amarillo/naranja
            }
        }
    }
}
```

### Imágenes
Las imágenes de los productos se cargan desde Unsplash. Puedes cambiar las URLs en el backend o usar tus propias imágenes.

### Estilos
Todos los estilos están basados en Tailwind CSS. Puedes modificar las clases CSS directamente en el HTML o agregar estilos personalizados.

## Compatibilidad

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## Notas de Desarrollo

- La aplicación está diseñada como SPA (Single Page Application)
- Utiliza Fetch API para comunicación con el backend
- Implementa debounce para la búsqueda en tiempo real
- Maneja estados de carga y errores de manera elegante
- Es completamente responsive y accesible 