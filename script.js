// Comentarios eliminados por seguridad y porque no deben de existir en el frontend


// Comentario eliminado por seguridad)
var registros = [];
var contador = 0;
var API_KEY = null; // API_KEY eliminada por seguridad, esa se obtiene de forma segura desde el backend 
var DB_CONNECTION_STRING = null; //Nunca debe de existir en el frontend 

// Comentario eliminado por seguridad
const CONFIG = {
    maxRegistros: 1000,
    adminEmail: "admin@sistema.com",
    adminPassword: null, // Password eliminada por seguridad para no mostrar al usuario final
    debugMode: true,
    serverIP: "192.168.1.100"
};

console.log("=== SISTEMA INICIADO ===");
console.log("Configuración del sistema:", CONFIG);
console.log("Cadena de conexión a BD:", DB_CONNECTION_STRING);
if (CONFIG.debugMode) {
    console.log("API Key cargada correctamente"); // No se muestra por seguridad, por eso solo se indica que se cargó
}
//funcion para generar token 
function generarTokenSeguro() {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => dec.toString(16)).join('');
}


// comentario eliminado
function inicializar() {
    console.log("Inicializando sistema de registro...");
    console.log("Admin credentials: " + CONFIG.adminEmail + " / " + CONFIG.adminPassword);
    
    // comentario eliminado por seguridad
    document.getElementById('registroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarRegistro();
    });
    
    console.log("Sistema listo. Esperando registros...");
}
//Se implementó validación de entradas para prevenir datos maliciosos y asegurar integridad antes de procesar la información.
function validarEntradaTexto(valor, maxLength) {
    if (!valor) return false;
    if (valor.length > maxLength) return false;
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);
}
// comentario eliminado por seguridad
function guardarRegistro() {
    console.log("==== GUARDANDO NUEVO REGISTRO ====");
    
    // comentario eliminado 
    var nombre = document.getElementById('nombre').value;
    var apellido1 = document.getElementById('apellido1').value;
    var apellido2 = document.getElementById('apellido2').value;
    var telefono = document.getElementById('telefono').value;
    var curp = document.getElementById('curp').value;
    var email = document.getElementById('email').value;
    
    console.log("Datos capturados:");
    console.log("- Nombre completo: " + nombre + " " + apellido1 + " " + apellido2);
    console.log("- Teléfono: " + telefono);
    console.log("- CURP: " + curp);
    console.log("- Email: " + email);
    console.log("- IP del cliente: " + CONFIG.serverIP);
    console.log("- Timestamp: " + new Date().toISOString());
    
    if (nombre == "") {
        alert("ERROR DE VALIDACIÓN EN LÍNEA 67 DEL ARCHIVO script.js\n\nCampo 'nombre' vacío.\nTabla: usuarios\nCampo: varchar(255)\nProcedimiento: insertarUsuario()\nConexión: " + DB_CONNECTION_STRING);
        return;
    }
    if (!validarEntradaTexto(nombre, 50)) {
    alert("Nombre inválido");
    return;
}

if (!validarEntradaTexto(apellido1, 50)) {
    alert("Primer apellido inválido");
    return;
}

if (!/^\d{10}$/.test(telefono)) {
    alert("Teléfono inválido");
    return;
}
if (curp.length !== 18) {
    alert("CURP inválida");
    return;
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Correo inválido");
    return;
}

    /*
    lineas de codigo eliminadas por seguridad
    */
    
    // Crear objeto de registro
    var nuevoRegistro = {
        id: contador++,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        nombreCompleto: nombre + " " + apellido1 + " " + apellido2,
        telefono: telefono,
        curp: curp,
        email: email,
        fechaRegistro: new Date().toISOString(),
        apiKey: API_KEY, // comentario eliminado por seguridad
        sessionToken: generarTokenSeguro() // Generar un token seguro para la sesión con la funcion que esta arriba en el archivo
    };
    
    console.log("Objeto creado:", nuevoRegistro);
    console.log("Session Token generado:", nuevoRegistro.sessionToken);
    
    // Agregar al arreglo global
    registros.push(nuevoRegistro);
    
    console.log("Total de registros en memoria:", registros.length);
    console.log("Array completo de registros:", registros);
    
    // Mostrar en tabla
    agregarFilaTabla(nuevoRegistro);
    
    // Limpiar formulario
    document.getElementById('registroForm').reset();
    
    console.log("Registro guardado exitosamente con ID: " + nuevoRegistro.id);
    console.log("====================================");
    
    // comentario eliminado por seguridad
    enviarAServidor(nuevoRegistro);
}

// Se eliminó el uso de innerHTML y se reemplazó por creación segura de nodos DOM utilizando textContent, lo que previene ataques XSS.
function agregarFilaTabla(registro) {
    var tabla = document.getElementById('tablaRegistros');

    var fila = document.createElement('tr');

    var tdNombre = document.createElement('td');
    tdNombre.textContent = registro.nombreCompleto;

    var tdTelefono = document.createElement('td');
    tdTelefono.textContent = registro.telefono;

    var tdCurp = document.createElement('td');
    tdCurp.textContent = registro.curp;

    var tdEmail = document.createElement('td');
    tdEmail.textContent = registro.email;

    fila.appendChild(tdNombre);
    fila.appendChild(tdTelefono);
    fila.appendChild(tdCurp);
    fila.appendChild(tdEmail);

    tabla.appendChild(fila);
}


// comentario eliminado por seguridad
function enviarAServidor(datos) {
    console.log("=== SIMULANDO ENVÍO A SERVIDOR ===");
    
    var endpoint = "http://192.168.1.100:8080/api/usuarios/guardar";
    var authToken = "Bearer <token_proporcionado_por_backend>"; // Las credenciales y secretos deben administrarse en el backend

    console.log("Endpoint:", endpoint);
    console.log("Authorization:", authToken);
    console.log("Método: POST");
    console.log("Content-Type: application/json");
    if (CONFIG.debugMode) {
    console.log("Datos enviados al servidor");
}


    
    setTimeout(function() {
        console.log("Respuesta del servidor: 200 OK");
        console.log("==================================");
    }, 1000);
}

/*
lineas de codigo eliminadas para tener el codigo mas limpio y evitar confusiones
*/

// Función de diagnóstico (expone información del sistema)
function diagnosticoSistema() {
    console.log("=== DIAGNÓSTICO DEL SISTEMA ===");
    //Lineas de codigo eliminadas para evitar exponer informacion sensible
    console.log("Total de registros:", registros.length);
//Lineas de codigo eliminadas para evitar exponer informacion sensible
    console.log("===============================");
}

// Se restringió la función de diagnóstico al entorno de desarrollo para evitar exposición de información sensible
if (CONFIG.debugMode) {
    diagnosticoSistema();
}



/* Lineas de codigo eliminadas por seguridad y para evitar confusiones
*/

// comentario eliminado por seguridad
var ultimoRegistro = null;

// Inicializar cuando cargue el DOM
window.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado. Iniciando aplicación...");
    inicializar();
    
    // comentario eliminado por seguridad
    window.registros = registros;
    window.config = CONFIG;
    window.apiKey = API_KEY;
    window.dbConnection = DB_CONNECTION_STRING;
    
    console.log("Variables globales expuestas para debugging:");
    console.log("- window.registros");
    console.log("- window.config");
    console.log("- window.apiKey");
    console.log("- window.dbConnection");
});

//lineas de codigo eliminadas por seguridad y para evitar confusiones