# 🛒 E-commerce TechStore

Un e-commerce completo desarrollado con **Node.js** en el backend y **HTML/CSS/JavaScript** en el frontend, con un diseño moderno usando **Tailwind CSS**.

## 🚀 Características Principales

- **Backend API REST** completo con Node.js y Express
- **Frontend moderno** con HTML, CSS y JavaScript vanilla
- **Diseño responsive** usando Tailwind CSS desde CDN
- **Carrito de compras** funcional con persistencia
- **Sistema de búsqueda** en tiempo real
- **Filtros por categorías** de productos
- **Checkout completo** con formulario de pago
- **Gestión de órdenes** y estados
- **Notificaciones toast** para mejor UX

## 🏗️ Arquitectura del Proyecto

```
e-commerce/
├── server/                 # Backend API REST
│   ├── package.json       # Dependencias del servidor
│   ├── server.js          # Servidor principal
│   └── README.md          # Documentación del backend
├── frontend/              # Frontend web
│   ├── index.html         # Página principal
│   ├── js/
│   │   └── app.js        # Lógica del frontend
│   └── README.md          # Documentación del frontend
└── README.md              # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **CORS** - Middleware para CORS
- **Body Parser** - Parsing de requests

### Frontend
- **HTML5** - Estructura semántica
- **Tailwind CSS** - Framework CSS utility-first
- **JavaScript ES6+** - Funcionalidad moderna
- **Font Awesome** - Iconos vectoriales

## 📋 Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** (incluido con Node.js)
- **Navegador web moderno**

## 🚀 Instalación y Ejecución

### 1. Clonar o descargar el proyecto
```bash
git clone <url-del-repositorio>
cd e-commerce
```

### 2. Instalar dependencias del backend
```bash
cd server
npm install
```

### 3. Ejecutar el servidor backend
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor se ejecutará en `http://localhost:3000`

### 4. Abrir el frontend
Abre el archivo `frontend/index.html` en tu navegador web.

## 🔌 Endpoints de la API

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `GET /api/products/category/:category` - Filtrar por categoría
- `GET /api/products/search/:query` - Buscar productos

### Carrito
- `GET /api/cart` - Obtener carrito actual
- `POST /api/cart/add` - Agregar producto al carrito
- `PUT /api/cart/update/:id` - Actualizar cantidad
- `DELETE /api/cart/remove/:id` - Eliminar producto
- `DELETE /api/cart/clear` - Limpiar carrito

### Órdenes
- `GET /api/orders` - Obtener todas las órdenes
- `GET /api/orders/:id` - Obtener orden específica
- `POST /api/orders` - Crear nueva orden
- `PUT /api/orders/:id/status` - Actualizar estado

## 💡 Funcionalidades del Frontend

### Navegación
- **Inicio**: Página de bienvenida con botones de acción
- **Productos**: Catálogo completo con filtros y búsqueda
- **Carrito**: Gestión completa del carrito de compras

### Gestión de Productos
- Visualización en grilla responsive
- Filtrado por categorías
- Búsqueda en tiempo real con debounce
- Información detallada de cada producto

### Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Cálculo automático del total
- Persistencia de datos en el backend

### Checkout
- Formulario de información del cliente
- Validación de campos requeridos
- Procesamiento de órdenes
- Confirmación de pedido exitoso

## 🎨 Personalización

### Colores del Tema
Los colores principales se pueden modificar en `frontend/index.html`:

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

### Productos
Los productos se pueden modificar en `server/server.js` en el array `products`.

### Imágenes
Las imágenes se cargan desde Unsplash. Puedes cambiar las URLs o usar tus propias imágenes.

## 🔧 Desarrollo

### Estructura del Código
- **Modular**: Código organizado en funciones específicas
- **ES6+**: Utiliza características modernas de JavaScript
- **Async/Await**: Manejo asíncrono de operaciones
- **Error Handling**: Manejo robusto de errores

### Características Técnicas
- **SPA**: Single Page Application con navegación fluida
- **Responsive**: Diseño adaptable a todos los dispositivos
- **Accessible**: Implementa buenas prácticas de accesibilidad
- **Performance**: Optimizado para rendimiento

## 🌐 Compatibilidad

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## 📱 Responsive Design

El frontend está completamente optimizado para:
- **Desktop**: Pantallas grandes y medianas
- **Tablet**: Dispositivos táctiles medianos
- **Mobile**: Smartphones y dispositivos pequeños

## 🚀 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Panel de administración
- [ ] Base de datos persistente (MongoDB/PostgreSQL)
- [ ] Sistema de pagos (Stripe/PayPal)
- [ ] Notificaciones por email
- [ ] Historial de pedidos
- [ ] Wishlist de productos
- [ ] Sistema de reseñas y calificaciones

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema:
- Abre un issue en el repositorio
- Contacta al equipo de desarrollo
- Revisa la documentación en cada carpeta

## 🎯 Objetivos del Proyecto

Este e-commerce fue desarrollado como proyecto educativo para demostrar:
- **Arquitectura REST** completa
- **Frontend moderno** sin frameworks pesados
- **Integración** entre frontend y backend
- **Diseño responsive** con Tailwind CSS
- **UX/UI** profesional y atractivo

---

**¡Disfruta explorando TechStore! 🚀** 