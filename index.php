<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Productos - Fetch API</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body class="bg-light">
    <!-- Header -->
    <nav class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
            <span class="navbar-brand mb-0 h1">
                <i class="bi bi-box-seam"></i> GESTIÓN DE PRODUCTOS
            </span>
        </div>
    </nav>

    <!-- Barra de Búsqueda -->
    <div class="container mt-4">
        <div class="card shadow-sm border-0">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-3">
                        <h5 class="mb-0">Buscar productos</h5>
                    </div>
                    <div class="col-md-9">
                        <div class="input-group">
                            <input type="text" class="form-control" id="buscarTermino" placeholder="Buscar por código o nombre...">
                            <button class="btn btn-primary" onclick="buscarProductos()">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container mt-4 mb-5">
        <div class="row g-4">
            <!-- Columna del Formulario -->
            <div class="col-lg-5">
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-dark text-white">
                        <h5 class="mb-0">Gestión de productos</h5>
                    </div>
                    <div class="card-body p-4">
                        <form id="formProducto">
                            <input type="hidden" id="productoId" name="id">
                            
                            <div class="mb-3">
                                <label for="codigo" class="form-label fw-semibold">Código</label>
                                <input type="text" class="form-control" id="codigo" name="codigo" required placeholder="Ej: PROD001">
                            </div>
                            
                            <div class="mb-3">
                                <label for="producto" class="form-label fw-semibold">Producto</label>
                                <input type="text" class="form-control" id="producto" name="producto" required placeholder="Nombre del producto">
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="precio" class="form-label fw-semibold">Precio</label>
                                    <div class="input-group">
                                        <span class="input-group-text">$</span>
                                        <input type="number" step="0.01" class="form-control" id="precio" name="precio" required placeholder="0.00">
                                    </div>
                                </div>
                                
                                <div class="col-md-6 mb-3">
                                    <label for="cantidad" class="form-label fw-semibold">Cantidad</label>
                                    <input type="number" class="form-control" id="cantidad" name="cantidad" required placeholder="0">
                                </div>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-success btn-lg" id="btnGuardar">
                                    Guardar producto
                                </button>
                                <button type="button" class="btn btn-warning" id="btnCancelar" style="display:none;">
                                    Cancelar edición
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <!-- Columna de la Lista -->
            <div class="col-lg-7">
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Lista de productos</h5>
                        <div class="filtros">
                            <select id="filtroOrden" class="form-select form-select-sm">
                                <option value="">Ordenar por...</option>
                                <option value="nombre_asc">Nombre (A-Z)</option>
                                <option value="nombre_desc">Nombre (Z-A)</option>
                                <option value="precio_asc">Precio (Menor a Mayor)</option>
                                <option value="precio_desc">Precio (Mayor a Menor)</option>
                                <option value="cantidad_asc">Cantidad (Menor a Mayor)</option>
                                <option value="cantidad_desc">Cantidad (Mayor a Menor)</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="listaProductos" class="table-responsive"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>