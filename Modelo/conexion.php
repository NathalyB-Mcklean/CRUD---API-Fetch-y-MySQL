<?php
class DB {
    private $pdo;
    
    public function __construct() {
        try {
            $this->pdo = new PDO(
                "mysql:host=localhost;dbname=productosdb;charset=utf8", 
                "usuario_productos", 
                "clave_segura123"
            );
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }
    
    // Método para INSERT
    public function insertSeguro($tabla, $datos) {
        $campos = implode(", ", array_keys($datos));
        $placeholders = ":" . implode(", :", array_keys($datos));
        
        $sql = "INSERT INTO $tabla ($campos) VALUES ($placeholders)";
        $stmt = $this->pdo->prepare($sql);
        
        return $stmt->execute($datos);
    }
    
    // Método para UPDATE
    public function updateSeguro($tabla, $datos, $where) {
        $set = "";
        foreach($datos as $campo => $valor) {
            $set .= "$campo = :$campo, ";
        }
        $set = rtrim($set, ", ");
        
        $sql = "UPDATE $tabla SET $set WHERE $where";
        $stmt = $this->pdo->prepare($sql);
        
        return $stmt->execute($datos);
    }
    
    // Método para SELECT (retorna array)
    public function query($sql, $params = []) {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    // Método para ejecutar consultas que no retornan datos (DELETE, etc.)
    public function execute($sql, $params = []) {
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($params);
    }
    
    // Alias para compatibilidad
    public function Arreglos($sql) {
        return $this->query($sql);
    }
}
?>