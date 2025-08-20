# Cómo usar Mermaid para generar Diagramas de Entidad-Relación

Mermaid es un lenguaje de marcado ligero que permite crear diagramas de manera rápida y sencilla. Entre sus diagramas, se pueden crear **Diagramas de Entidad-Relación (ER)**, útiles para modelar bases de datos.

## Sintaxis básica de ER

Para definir entidades y relaciones:

erDiagram
ENTIDAD1 {
    TIPO CAMPO1
    TIPO CAMPO2
}
ENTIDAD2 {
    TIPO CAMPO1
    TIPO CAMPO2
}
ENTIDAD1 ||--o{ ENTIDAD2 : "relaciona a"

### Explicación de símbolos

- `||` indica **uno** (cardinalidad mínima 1)  
- `o{` indica **muchos** (cardinalidad máxima)  
- `|o` indica **opcional uno**  
- `}o` indica **opcional muchos**  
- El texto después de `:` describe la relación

## Ejemplo práctico: Clientes y Pedidos

erDiagram
CLIENTE {
    int id
    string nombre
    string email
}
PEDIDO {
    int id
    date fecha
    float total
}
CLIENTE ||--o{ PEDIDO : "realiza"

Este diagrama indica que **un cliente puede realizar muchos pedidos**, pero cada pedido pertenece a **un solo cliente**.

## Recomendaciones

- Mantener nombres claros para entidades y atributos  
- Simplificar relaciones para mejorar la legibilidad  
- Usar plataformas compatibles con Mermaid como **GitHub, VSCode, Obsidian**  
- Dividir diagramas grandes en subdiagramas si es necesario
