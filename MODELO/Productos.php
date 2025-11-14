<?php
require_once "conexion.php";

class Producto {
    private $pdo;
    public $Codigo, $Producto, $Precio, $Cantidad;
    public $errors = [];
    
    public function __construct() {
        $db = new DB();
        $this->pdo = $db;
    }
    
    public function guardar() {
        $data = array(
            "codigo" => $this->Codigo,
            "producto" => $this->Producto,
            "precio" => $this->Precio,
            "cantidad" => $this->Cantidad
        );
        return $this->pdo->insertSeguro("productos", $data);
    }
    
    public function editar($id) {
        $data = array(
            "codigo" => $this->Codigo,
            "producto" => $this->Producto,
            "precio" => $this->Precio,
            "cantidad" => $this->Cantidad
        );
        return $this->pdo->updateSeguro("productos", $data, "id = $id");
    }
    
    public function buscar($termino) {
        $sql = "SELECT * FROM productos WHERE producto LIKE '%$termino%' OR codigo LIKE '%$termino%'";
        return $this->pdo->Arreglos($sql);
    }
    
    // MÉTODO ELIMINAR CORREGIDO
    public function eliminar($id) {
        try {
            // Opción 1: Si tu clase DB tiene método execute()
            if (method_exists($this->pdo, 'execute')) {
                $sql = "DELETE FROM productos WHERE id = ?";
                return $this->pdo->execute($sql, [$id]);
            }
            // Opción 2: Usar PDO directamente
            else {
                $sql = "DELETE FROM productos WHERE id = :id";
                $stmt = $this->pdo->prepare($sql);
                return $stmt->execute(['id' => $id]);
            }
        } catch(PDOException $e) {
            $this->errors[] = "Error al eliminar: " . $e->getMessage();
            return false;
        }
    }
    
    public function validar() {
        $this->errors = [];
        
        if(empty($this->Codigo)) $this->errors[] = "Código es obligatorio";
        if(empty($this->Producto)) $this->errors[] = "Producto es obligatorio";
        if(empty($this->Precio) || $this->Precio <= 0) $this->errors[] = "Precio debe ser mayor a 0";
        if(empty($this->Cantidad) || $this->Cantidad < 0) $this->errors[] = "Cantidad no válida";
        
        return empty($this->errors);
    }
    
    public function setDatos($datos) {
        $this->Codigo = $datos['codigo'] ?? '';
        $this->Producto = $datos['producto'] ?? '';
        $this->Precio = $datos['precio'] ?? 0;
        $this->Cantidad = $datos['cantidad'] ?? 0;
    }
}
?>