<?php
header("Content-Type: application/json");

require_once "Modelo/Productos.php";

$producto = new Producto();
$accion = $_POST['accion'] ?? '';

$response = ["success" => false, "message" => "", "accion" => $accion];

switch($accion) {
    case "Guardar":
        $producto->setDatos($_POST);
        
        if($producto->validar()) {
            if($producto->guardar()) {
                $response["success"] = true;
                $response["message"] = "Producto creado exitosamente";
            } else {
                $response["message"] = "Error al guardar el producto";
            }
        } else {
            $response["message"] = "Errores de validación";
            $response["errors"] = $producto->errors;
        }
        break;
        
    case "Modificar":
        $producto->setDatos($_POST);
        $id = $_POST['id'] ?? 0;
        
        if($producto->validar() && $id > 0) {
            if($producto->editar($id)) {
                $response["success"] = true;
                $response["message"] = "Producto actualizado exitosamente";
            } else {
                $response["message"] = "Error al actualizar el producto";
            }
        } else {
            $response["message"] = "Errores de validación o ID inválido";
            $response["errors"] = $producto->errors;
        }
        break;
        
    case "Buscar":
        $termino = $_POST['termino'] ?? '';
        $resultados = $producto->buscar($termino);
        $response["success"] = true;
        $response["data"] = $resultados;
        break;

   case "Eliminar":
    $id = $_POST['id'] ?? 0;
    
    if($id > 0) {
        if($producto->eliminar($id)) {
            $response["success"] = true;
            $response["message"] = "Producto eliminado exitosamente";
        } else {
            $response["message"] = "Error al eliminar el producto";
            $response["errors"] = $producto->errors;
        }
    } else {
        $response["message"] = "ID inválido para eliminar";
    }
    break;
    
    default:
        $response["message"] = "Acción no válida";
}

echo json_encode($response);
?>