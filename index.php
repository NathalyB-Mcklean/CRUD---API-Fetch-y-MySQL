<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Productos - Fetch API</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body class="bg-light">
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <h2 class="mb-4">Gestión de Productos</h2>
                
                <form id="formProducto">
                    <input type="hidden" id="productoId" name="id">
                    
                    <div class="mb-3">
                        <label class="form-label">Código:</label>
                        <input type="text" class="form-control" id="codigo" name="codigo" required>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Producto:</label>
                        <input type="text" class="form-control" id="producto" name="producto" required>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Precio:</label>
                        <input type="number" step="0.01" class="form-control" id="precio" name="precio" required>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Cantidad:</label>
                        <input type="number" class="form-control" id="cantidad" name="cantidad" required>
                    </div>
                    
                    <button type="submit" class="btn btn-success" id="btnGuardar">Guardar Producto</button>
                    <button type="button" class="btn btn-warning" id="btnCancelar" style="display:none;">Cancelar</button>
                </form>
                
                <div class="mt-4">
                    <h4>Buscar Productos</h4>
                    <div class="input-group">
                        <input type="text" class="form-control" id="buscarTermino" placeholder="Buscar producto...">
                        <button class="btn btn-primary" onclick="buscarProductos()">Buscar</button>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <h4>Lista de Productos</h4>
                <div id="listaProductos"></div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>