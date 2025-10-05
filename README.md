# 🚀 Knowledge Engine Frontend

Una plataforma moderna para explorar y analizar papers científicos con interfaz React + Vite.

## ✨ Características

- 📊 **Dashboard interactivo** con estadísticas y gráficos
- 📚 **Explorador de papers** con búsqueda y filtros avanzados
- 💬 **Chat inteligente** para consultas sobre papers
- 📈 **Visualizaciones** interactivas con Recharts
- 🎨 **Diseño responsive** optimizado para todos los dispositivos

## 🛠️ Tecnologías

- **React 18** - Framework frontend
- **Vite** - Build tool y servidor de desarrollo
- **React Router** - Navegación
- **Framer Motion** - Animaciones
- **Recharts** - Gráficos interactivos
- **Lucide React** - Iconos
- **Axios** - Cliente HTTP

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm 8+

### Pasos para ejecutar:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ccm2326/AndroLace-Insight.git
   cd AndroLace-Insight
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 📋 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linter de código
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Navegación principal
│   ├── Sidebar.jsx     # Barra lateral
│   └── ChatWidget.jsx  # Widget de chat
├── pages/              # Páginas principales
│   ├── HomePage.jsx    # Dashboard
│   ├── PapersPage.jsx  # Lista de papers
│   ├── PaperDetailPage.jsx # Detalle de paper
│   ├── ChatPage.jsx    # Chat completo
│   └── VisualizationsPage.jsx # Gráficos
├── services/           # Servicios API
│   └── api.js         # Cliente HTTP
├── data/              # Datos mock
│   └── mockData.js    # Datos de ejemplo
└── App.jsx            # Componente principal
```

## 🌐 Deploy

El proyecto está configurado para deploy automático en Render:

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18

## 🔧 Configuración

Copia `env.example` a `.env` y configura las variables:

```bash
cp env.example .env
```

Variables disponibles:
- `VITE_API_URL` - URL del backend
- `VITE_APP_NAME` - Nombre de la aplicación
- `VITE_ENABLE_CHAT` - Habilitar chat
- `VITE_ENABLE_VISUALIZATIONS` - Habilitar visualizaciones

## 📊 Datos Mock

El proyecto incluye datos de ejemplo:
- 5 papers científicos completos
- Autores y keywords asociados
- Datos de visualización simulados
- Respuestas de chat contextuales

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autor

**Camila Carpio Mollo**
- GitHub: [@ccm2326](https://github.com/ccm2326)

## 🔗 Enlaces Útiles

- [Documentación React](https://react.dev/)
- [Documentación Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)

---

⭐ Si te gusta este proyecto, ¡dale una estrella!