Proyecto Figuras Coleccionables

Este proyecto permite **gestionar figuras coleccionables** mediante una API, ofreciendo operaciones como **agregar, buscar, actualizar y eliminar figuras**.  

## **Características**  
- **Agregar** nuevas figuras.  
- **Buscar** figuras por ID.  
- **Listar** todas las figuras disponibles.  
- **Actualizar** información de una figura.  
- **Eliminar** figuras del sistema.  

## **Uso**  

1️⃣ **Enviar solicitudes a la API** con los endpoints definidos.  
2️⃣ **La API responde con la información de las figuras** según la operación.  

### **Ejemplo de solicitud y respuesta**  

📌 **Agregar una figura**  
```json
POST /api/figuras  
{
  "nombre": "Darth Vader",
  "categoria": "Star Wars",
  "precio": 45.99
}
Respuesta
{
  "id": 1,
  "nombre": "Darth Vader",
  "categoria": "Star Wars",
  "precio": 45.99
}


Autor
- 20100184_Guillermo Del Bosque G.