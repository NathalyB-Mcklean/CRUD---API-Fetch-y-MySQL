// Variables globales
let productosActuales = [];
let filtroActual = '';

// Función principal para enviar datos del formulario
document.getElementById('formProducto').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const productoId = document.getElementById('productoId').value;
    
    // Determinar si es Guardar o Modificar
    const accion = productoId ? 'Modificar' : 'Guardar';
    formData.append('accion', accion);
    
    enviarDatos(formData);
});

// Función para enviar datos via Fetch
async function enviarDatos(formData) {
    try {
        const response = await fetch('registrar.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: result.message,
                timer: 2000,
                showConfirmButton: false
            });
            limpiarFormulario();
            buscarProductos(); // Actualizar la lista
        } else {
            let mensajeError = result.message;
            if (result.errors && result.errors.length > 0) {
                mensajeError += '<br><br><small>' + result.errors.join('<br>') + '</small>';
            }
            
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: mensajeError
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor'
        });
    }
}

// Función para buscar productos
async function buscarProductos() {
    const termino = document.getElementById('buscarTermino').value;
    const formData = new FormData();
    formData.append('accion', 'Buscar');
    formData.append('termino', termino);
    
    try {
        // Mostrar carga
        document.getElementById('listaProductos').innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Buscando...</span>
                </div>
                <p class="mt-2 text-muted">Buscando productos...</p>
            </div>
        `;
        
        const response = await fetch('registrar.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            productosActuales = result.data;
            aplicarFiltro(); // Aplicar el filtro actual a los nuevos datos
        } else {
            document.getElementById('listaProductos').innerHTML = 
                '<div class="text-center py-4"><p class="text-muted">No se encontraron productos</p></div>';
            productosActuales = [];
        }
    } catch (error) {
        console.error('Error en búsqueda:', error);
        document.getElementById('listaProductos').innerHTML = 
            '<div class="text-center py-4"><p class="text-danger">Error al buscar productos</p></div>';
    }
}

// Función para aplicar filtros
function aplicarFiltro() {
    const filtro = document.getElementById('filtroOrden').value;
    filtroActual = filtro;
    
    let productosFiltrados = [...productosActuales];
    
    switch(filtro) {
        case 'nombre_asc':
            productosFiltrados.sort((a, b) => a.producto.localeCompare(b.producto));
            break;
        case 'nombre_desc':
            productosFiltrados.sort((a, b) => b.producto.localeCompare(a.producto));
            break;
        case 'precio_asc':
            productosFiltrados.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
            break;
        case 'precio_desc':
            productosFiltrados.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
            break;
        case 'cantidad_asc':
            productosFiltrados.sort((a, b) => parseInt(a.cantidad) - parseInt(b.cantidad));
            break;
        case 'cantidad_desc':
            productosFiltrados.sort((a, b) => parseInt(b.cantidad) - parseInt(a.cantidad));
            break;
        default:
            // Sin filtro, mantener orden original
            break;
    }
    
    mostrarResultadosBusqueda(productosFiltrados);
}

// Función para limpiar formulario
function limpiarFormulario() {
    document.getElementById('formProducto').reset();
    document.getElementById('productoId').value = '';
    document.getElementById('btnGuardar').innerHTML = '<i class="bi bi-check-circle"></i> Guardar Producto';
    document.getElementById('btnCancelar').style.display = 'none';
}

// Función para editar producto
function editarProducto(id, codigo, producto, precio, cantidad) {
    document.getElementById('productoId').value = id;
    document.getElementById('codigo').value = codigo;
    document.getElementById('producto').value = producto;
    document.getElementById('precio').value = precio;
    document.getElementById('cantidad').value = cantidad;
    
    document.getElementById('btnGuardar').innerHTML = '<i class="bi bi-arrow-clockwise"></i> Actualizar Producto';
    document.getElementById('btnCancelar').style.display = 'inline-block';
    
    // Scroll suave al formulario
    document.querySelector('.col-lg-5').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Función para cancelar edición
function cancelarEdicion() {
    limpiarFormulario();
    Swal.fire({
        icon: 'info',
        title: 'Edición cancelada',
        timer: 1500,
        showConfirmButton: false
    });
}

// FUNCIÓN CORREGIDA PARA ELIMINAR PRODUCTO
function eliminarProducto(id, producto) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a eliminar el producto: "${producto}"`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                // Mostrar loading
                Swal.fire({
                    title: 'Eliminando...',
                    text: 'Por favor espere',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const formData = new FormData();
                formData.append('accion', 'Eliminar');
                formData.append('id', id);
                
                const response = await fetch('registrar.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Eliminado!',
                        text: result.message,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    // Actualizar la lista después de eliminar
                    buscarProductos();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.message || 'No se pudo eliminar el producto'
                    });
                }
            } catch (error) {
                console.error('Error al eliminar:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'No se pudo conectar con el servidor'
                });
            }
        }
    });
}

// Mostrar resultados de búsqueda en tabla
function mostrarResultadosBusqueda(productos) {
    const contenedor = document.getElementById('listaProductos');
    
    if (productos.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-inbox display-1 text-muted"></i>
                <p class="mt-3 text-muted">No se encontraron productos</p>
                <button class="btn btn-primary mt-2" onclick="limpiarBusqueda()">
                    <i class="bi bi-arrow-counterclockwise"></i> Mostrar todos
                </button>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="table-container">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th class="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    productos.forEach(prod => {
        // Escapar comillas simples para evitar errores en JavaScript
        const codigoEscapado = prod.codigo.replace(/'/g, "\\'");
        const productoEscapado = prod.producto.replace(/'/g, "\\'");
        
        html += `
            <tr>
                <td><strong>${prod.codigo}</strong></td>
                <td>${prod.producto}</td>
                <td>
                    <span class="badge bg-success fs-6">
                        $${parseFloat(prod.precio).toFixed(2)}
                    </span>
                </td>
                <td>
                    <span class="badge ${prod.cantidad > 10 ? 'bg-primary' : 'bg-warning'} fs-6">
                        ${prod.cantidad} unidades
                    </span>
                </td>
                <td class="text-center">
                    <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-outline-primary" 
                                onclick="editarProducto(${prod.id}, '${codigoEscapado}', '${productoEscapado}', ${prod.precio}, ${prod.cantidad})"
                                title="Editar producto">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger" 
                                onclick="eliminarProducto(${prod.id}, '${productoEscapado}')"
                                title="Eliminar producto">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
        <div class="mt-3 p-3 bg-light rounded">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <span class="text-muted">
                        <i class="bi bi-info-circle"></i> 
                        Mostrando <strong>${productos.length}</strong> producto(s)
                        ${filtroActual ? ` • Ordenado por: <strong>${document.getElementById('filtroOrden').options[document.getElementById('filtroOrden').selectedIndex].text}</strong>` : ''}
                    </span>
                </div>
                <div class="col-md-6 text-end">
                    <button class="btn btn-sm btn-outline-secondary" onclick="exportarTabla()">
                        <i class="bi bi-download"></i> Exportar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    contenedor.innerHTML = html;
}

// Función para limpiar búsqueda
function limpiarBusqueda() {
    document.getElementById('buscarTermino').value = '';
    buscarProductos();
}

// Función para exportar tabla (simple)
function exportarTabla() {
    const tabla = document.querySelector('.table');
    let csv = [];
    
    // Encabezados
    let headers = [];
    tabla.querySelectorAll('thead th').forEach(th => {
        headers.push(th.textContent.trim());
    });
    csv.push(headers.join(','));
    
    // Datos
    tabla.querySelectorAll('tbody tr').forEach(tr => {
        let row = [];
        tr.querySelectorAll('td').forEach(td => {
            // Remover elementos HTML y obtener solo texto
            let text = td.textContent.trim();
            // Remover "unidades" y "$" para limpiar datos
            text = text.replace('unidades', '').replace('$', '').trim();
            row.push(text);
        });
        csv.push(row.join(','));
    });
    
    // Descargar archivo
    const csvContent = "data:text/csv;charset=utf-8," + csv.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "productos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    Swal.fire({
        icon: 'success',
        title: 'Exportado',
        text: 'Los productos se han exportado a CSV',
        timer: 2000,
        showConfirmButton: false
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos al iniciar
    buscarProductos();
    
    // Agregar evento al filtro
    document.getElementById('filtroOrden').addEventListener('change', aplicarFiltro);
    
    // Agregar evento al botón cancelar
    document.getElementById('btnCancelar').addEventListener('click', cancelarEdicion);
    
    // Buscar al presionar Enter en el campo de búsqueda
    document.getElementById('buscarTermino').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarProductos();
        }
    });
    
    // Buscar automáticamente al escribir (con debounce)
    let searchTimeout;
    document.getElementById('buscarTermino').addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(buscarProductos, 500);
    });
});

// Función para ver todos los productos (sin término de búsqueda)
function verTodosLosProductos() {
    document.getElementById('buscarTermino').value = '';
    buscarProductos();
}