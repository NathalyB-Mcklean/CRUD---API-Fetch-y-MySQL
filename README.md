# **Laboratorio - Sistema CRUD de Productos con PHP y Fetch API**

## **Descripción del Proyecto**

Este proyecto implementa un **sistema completo de gestión de productos** (CRUD) desarrollado con tecnologías web modernas. El sistema permite realizar operaciones básicas de Create, Read, Update y Delete sobre un catálogo de productos, integrando una interfaz moderna con Bootstrap, comunicación asíncrona mediante Fetch API y un backend robusto con PHP orientado a objetos.

## **Características Principales**

### **Funcionalidades CRUD Completas**
- ✅ **Crear** nuevos productos con validación de datos
- ✅ **Leer** y listar productos con sistema de búsqueda
- ✅ **Actualizar** información de productos existentes  
- ✅ **Eliminar** productos con confirmación de seguridad

### **Características Avanzadas**
- 🔍 **Búsqueda en tiempo real** por código o nombre de producto
- 📊 **Sistema de filtros múltiples** (nombre, precio, cantidad)
- 📤 **Exportación de datos** a formato CSV
- 🎨 **Interfaz responsive** con Bootstrap 5
- ⚡ **Comunicación asíncrona** con Fetch API
- 💫 **Feedback visual** con SweetAlert2
- 🛡️ **Validaciones** en cliente y servidor

## **Tecnologías Implementadas**

### **Frontend**
- **HTML5** - Estructura semántica
- **Bootstrap 5.2.3** - Framework CSS para diseño responsive
- **Bootstrap Icons** - Librería de iconos
- **SweetAlert2** - Sistema de alertas y notificaciones
- **JavaScript ES6+** - Programación del lado del cliente
- **Fetch API** - Comunicación asíncrona con el servidor

### **Backend**
- **PHP 7+** - Lenguaje de programación del servidor
- **PDO (PHP Data Objects)** - Conexión segura a base de datos
- **MySQL** - Sistema de gestión de base de datos
- **Programación Orientada a Objetos** - Paradigma de desarrollo

### **Arquitectura**
- **Patrón MVC** - Modelo-Vista-Controlador
- **JSON** - Formato de intercambio de datos
- **RESTful** - Estilo arquitectónico para APIs

## **Requisitos del Sistema**

### **Software Requerido**
- Servidor web (Apache, Nginx)
- PHP 7.4 o superior
- MySQL 5.7 o superior
- Navegador web moderno

### **Recomendado**
- XAMPP o WAMP para entorno de desarrollo
- Visual Studio Code o similar
- phpMyAdmin para gestión de base de datos

## **Instalación y Configuración**

### **1. Configuración de Base de Datos**

```sql
CREATE DATABASE productosdb;
USE productosdb;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL,
    producto VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    cantidad INT NOT NULL
);
```

### **2. Creación de Usuario de Base de Datos**

```sql
CREATE USER 'usuario_productos'@'localhost' IDENTIFIED BY 'clave_segura123';
GRANT ALL PRIVILEGES ON productosdb.* TO 'usuario_productos'@'localhost';
FLUSH PRIVILEGES;
```

### **3. Configuración de la Aplicación**

1. Colocar los archivos del proyecto en el directorio del servidor web
2. Actualizar las credenciales de base de datos en `Modelo/conexion.php`
3. Acceder a la aplicación mediante `index.php`

## **Estructura del Proyecto**

```
proyecto_crud_productos/
├── Modelo/
│   ├── conexion.php          # Clase DB - Gestión de conexiones
│   └── Productos.php         # Clase Producto - Lógica de negocio
├── registrar.php             # Controlador principal
├── index.php                 # Vista - Interfaz de usuario
├── script.js                 # Cliente - Lógica frontend
└── README.md                 # Documentación
```

## **Uso del Sistema**

### **Gestión de Productos**
1. **Agregar Producto**: Complete el formulario y haga clic en "Guardar Producto"
2. **Buscar Productos**: Use el campo de búsqueda para filtrar resultados
3. **Editar Producto**: Haga clic en el ícono de edición (lápiz) en la lista
4. **Eliminar Producto**: Haga clic en el ícono de eliminar (basura) con confirmación

### **Filtros y Ordenamiento**
- Ordenar por nombre (A-Z, Z-A)
- Ordenar por precio (menor-mayor, mayor-menor)  
- Ordenar por cantidad (menor-mayor, mayor-menor)

### **Exportación de Datos**
- Exporte la lista actual a formato CSV usando el botón "Exportar"

## **Desarrollo y Aprendizaje**

### **Objetivos Cumplidos**
- ✅ Implementación completa de operaciones CRUD
- ✅ Integración de Fetch API para comunicación asíncrona
- ✅ Desarrollo con PHP Orientado a Objetos
- ✅ Diseño responsive con Bootstrap
- ✅ Validaciones en cliente y servidor
- ✅ Manejo de errores y feedback al usuario

### **Tecnologías Aprendidas**
- Programación del lado del servidor con PHP
- Gestión de bases de datos con PDO y MySQL
- Desarrollo de interfaces modernas con Bootstrap
- Comunicación asíncrona con JavaScript Fetch API
- Implementación de patrones de diseño MVC
- Validación y sanitización de datos

## **Información del Desarrollador**

---

**Este sistema CRUD ha sido desarrollado como parte del curso de Ingeniería Web en la Universidad Tecnológica de Panamá:**

### Nathaly Bonilla Mcklean
- **Correos de contacto**:
  - **Institucional**: nathaly.bonilla1@utp.ac.pa
  - **GitHub**: githubmcklean@gmail.com
  - **Profesional**: nbmcklean@gmail.com

### Abdiel Abrego
- **Correos de contacto**:
  - **Institucional**: abdiel.abrego1@utp.ac.pa
  - **Profesional**: aabdiel200412@gmail.com
---

<p align="center">
  <strong>Universidad Tecnológica de Panamá</strong><br>
  Facultad de Ingeniería de Sistemas Computacionales<br>
  Ingeniería de Software<br>
  II Semestre 2025
</p>