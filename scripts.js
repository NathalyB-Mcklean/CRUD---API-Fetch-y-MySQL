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
                text: result.message
            });
            limpiarFormulario();
            listarProductos();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.message
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
        const response = await fetch('registrar.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            mostrarResultadosBusqueda(result.data);
        }
    } catch (error) {
        console.error('Error en búsqueda:', error);
    }
}

// Función para listar todos los productos
async function listarProductos() {
    // Implementar según necesites - puedes crear un caso "Listar" en el switch
}

// Función para limpiar formulario
function limpiarFormulario() {
    document.getElementById('formProducto').reset();
    document.getElementById('productoId').value = '';
    document.getElementById('btnGuardar').textContent = 'Guardar Producto';
    document.getElementById('btnCancelar').style.display = 'none';
}

// Función para editar producto
function editarProducto(id, codigo, producto, precio, cantidad) {
    document.getElementById('productoId').value = id;
    document.getElementById('codigo').value = codigo;
    document.getElementById('producto').value = producto;
    document.getElementById('precio').value = precio;
    document.getElementById('cantidad').value = cantidad;
    
    document.getElementById('btnGuardar').textContent = 'Actualizar Producto';
    document.getElementById('btnCancelar').style.display = 'inline-block';
}

// Mostrar resultados de búsqueda
function mostrarResultadosBusqueda(productos) {
    const contenedor = document.getElementById('listaProductos');
    
    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="text-muted">No se encontraron productos</p>';
        return;
    }
    
    let html = '<div class="list-group">';
    productos.forEach(prod => {
        html += `
            <div class="list-group-item">
                <h6>${prod.producto} (${prod.codigo})</h6>
                <p>Precio: $${prod.precio} | Cantidad: ${prod.cantidad}</p>
                <button class="btn btn-sm btn-outline-primary" onclick="editarProducto(${prod.id}, '${prod.codigo}', '${prod.producto}', ${prod.precio}, ${prod.cantidad})">Editar</button>
            </div>
        `;
    });
    html += '</div>';
    
    contenedor.innerHTML = html;
}

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', function() {
    // listarProductos(); // Implementar si necesitas listar todos al cargar
});