/**
 * Crea un objeto libro con validaciones.
 * Lanza un error si algún campo obligatorio es inválido-erroneo, no discriminacion a los invalidos.
 * @param {string} titulo
 * @param {string} autor
 * @param {string} genero
 * @param {string} idioma
 * @param {number} precio
 * @param {string} formato
 * @param {string} isbn
 * @param {string} descripcion
 * @param {string} estado
 * @param {string} ubicacion
 * @param {string} fecha_publicacion
 * @param {string} editorial
 * @param {number} paginas
 * @param {string} dimensiones
 * @param {string} peso
 * @returns {Object} Libro validado
 */
const crearLibro = (
  titulo, autor, genero, idioma, precio, formato, isbn, descripcion, estado, ubicacion, fecha_publicacion, editorial, paginas, dimensiones, peso
) => {
  // Validaciones estroctas
  if (!titulo || !autor || !genero || !idioma || !precio || !formato || !isbn || !descripcion || !estado || !ubicacion || !fecha_publicacion || !editorial || !paginas || !dimensiones || !peso) {
    throw new Error('Todos los campos son obligatorios y deben tener un valor válido.');
  }
  if (typeof precio !== 'number' || precio <= 0) {
    throw new Error('El precio debe ser un número positivo.');
  }
  if (typeof paginas !== 'number' || paginas <= 0) {
    throw new Error('El número de páginas debe ser un número positivo.');
  }
  return {
    titulo: titulo.trim(),
    autor: autor.trim(),
    genero: genero.trim().toLowerCase(),
    idioma: idioma.trim().toLowerCase(),
    precio,
    formato: formato.trim().toLowerCase(),
    isbn: isbn.trim(),
    descripcion: descripcion.trim(),
    estado: estado.trim().toLowerCase(),
    ubicacion: ubicacion.trim(),
    fecha_publicacion: fecha_publicacion.trim(),
    editorial: editorial.trim().toLowerCase(),
    paginas,
    dimensiones: dimensiones.trim(),
    peso: peso.trim(),
    fecha_agregado: new Date().toISOString(),
  };
};
/*## Descripción General

Este proyecto implementa un **Sistema de Gestión de Libros**
 desarrollado en JavaScript que utiliza una estructura de datos tipo **pila (stack)**
  para almacenar y gestionar información bibliográfica. El sistema incluye un menú interactivo en consola que 
  permite realizar diversas operaciones sobre la colección de libros. */

/**
 * Sistema de Gestión de Libros
 * -----------------------------------
 * Este archivo implementa un sistema de gestión de libros en consola usando una pila (stack).
 * Permite agregar, eliminar, mostrar libros, ver estadísticas y reiniciar la colección.
 * Todas las operaciones se realizan mediante un menú interactivo en consola.
 */

const readline = require("readline");
/**
 * Inicia el menú interactivo en consola para gestionar la biblioteca.
 * Permite seleccionar entre mostrar libros, agregar, borrar, ver estadísticas, reiniciar o salir.
 */
const rl = readline.createInterface({
    input: process.stdin, // Entrada estándar (teclado)
    output: process.stdout, // Salida estándar (consola)
  });
const iniciarMenu = () => {
  
  /**
   * Muestra el menú principal y gestiona la selección del usuario.
   */
  const menu = () => {
    console.log("<====MENU BIBLIOTECA====>");
    console.log("1.Mostrar Libros Actuales");
    console.log("2.Agregar 10 libros más");
    console.log("3.Quitar 5 libros");
    console.log("4.Mostrar estadisticas");
    console.log("5.Resetear a 20 libros por defecto");
    console.log("6.Salir del programa");
    console.log("7.Resumenes de este segmento");
    console.log("==================================");
    rl.question("elige una opcion:", (respuesta) => {
      switch (respuesta.trim()) {
        case "1":
          cargarLibreria();
          break;
        case "2":
          cargar10libros();
          break;
        case "3":
          borrar5libros();
          break;
        case "4":
          estadistica();
          break;
        case "5":
          reiniciarPila();
          break;
        case "6":
          barraCarga("Saliendo del programa").then(() => {
            console.log("Gracias por usar el sistema de gestión de libros.");
            rl.close(); // Cierra la interfaz de readline
          });
          break;
        case "7":
          iniciarMenu2();

          break;
        default:
          console.log("Opción no reconocida. Por favor, elige una opción válida.");
          menu();
          break;
      }
    });
  }
  menu();
 
};

const iniciarMenu2 = () => {
  
  /**
   * Muestra el menú principal y gestiona la selección del usuario.
   */
  const menu2 = () => {
    console.log("<====LOS RESUMENES====>");
    console.log("1. Escoger 5 libros que tengan una editorial en especifico");
   
    console.log("==================================");
    rl.question("elige una opcion:", (respuesta) => {
      switch (respuesta.trim()) {
        case "1":
          //funcion misma editorial
          funMismaEdit()
          break;
        case "2":
          
          break;
        case "3":
    
          break;
        case "4":
          
          break;
        case "5":
          
          break;
        case "6":
      
          break;
        case "7":
         
          break;
        default:
          console.log("Opción no reconocida. Por favor, elige una opción válida.");
          menu2();
          break;
      }
    });
  }
  menu2();
 
};

/**
 * Muestra una barra de carga animada en consola.
 * @param {string} mensaje - Mensaje a mostrar junto a la barra de carga.
 * @param {number} ciclos - Número de ciclos de animación (por defecto 3).
 * @returns {Promise<void>} Promesa que se resuelve al finalizar la animación.
 */
function barraCarga(mensaje = "Cargando...", ciclos = 3) {
  return new Promise((resolve) => {
    // Array con los símbolos para la barra de carga
    const barra = ['-', '\\', '|', '/'];
    let i = 0;
    let totalIteraciones = ciclos * barra.length;
    const intervalo = setInterval(() => {
      process.stdout.write(`\r${barra[i % barra.length]} ${mensaje}`);
      i++;
      if (i >= totalIteraciones) {
        clearInterval(intervalo);
        process.stdout.write(`\r${mensaje}... Hecho!\n`);
        resolve();
      }
    }, 200); // velocidad de cambio
  });
}
/**
 * Pila principal donde se almacenan todos los libros.
 * @type {Array<Object>} Cada objeto representa un libro con sus propiedades.
 */
var pila = [];

//FUNCIONES PRINCIPALES DEL MENU
/**
 * Carga 20 libros predeterminados en la pila y muestra el menú.
 * Utiliza la barra de carga para simular el proceso.
 * @async
 * @returns {Promise<void>}
 */
const cargar20Libros = async () => {
  await barraCarga("Cargando libros predeterminados");
  try {
    pila.push(
      crearLibro("El Señor de los Anillos: La Comunidad del Anillo", "J.R.R. Tolkien", "fantasía", "español", 45000, "tapa dura", "ISBN-001", "Un clásico de la literatura fantástica.", "nuevo", "Biblioteca Central", "1954-07-29", "Minotauro", 576, "23x15 cm", "800g"),
      crearLibro("1984", "George Orwell", "ficción", "español", 35000, "tapa blanda", "ISBN-002", "Distopía sobre el control y la vigilancia.", "usado", "Biblioteca Central", "1949-06-08", "Secker & Warburg", 328, "20x13 cm", "400g"),
      crearLibro("Cien años de soledad", "Gabriel García Márquez", "ficción", "español", 40000, "tapa dura", "ISBN-003", "La historia de la familia Buendía en Macondo.", "nuevo", "Biblioteca Central", "1967-05-30", "Sudamericana", 417, "21x14 cm", "500g"),
      crearLibro("Don Quijote de la Mancha", "Miguel de Cervantes", "ficción", "español", 30000, "tapa blanda", "ISBN-004", "La obra cumbre de la literatura española.", "como nuevo", "Biblioteca Central", "1605-01-16", "Francisco de Robles", 863, "24x16 cm", "900g"),
      crearLibro("Los miserables", "Victor Hugo", "ficción", "español", 42000, "ebook", "ISBN-005", "Novela histórica sobre justicia y redención.", "excelente", "Biblioteca Central", "1862-01-01", "A. Lacroix, Verboeckhoven & Cie.", 1232, "25x18 cm", "1.2kg"),
      crearLibro("Harry Potter y la piedra filosofal", "J.K. Rowling", "fantasía", "español", 38000, "tapa dura", "ISBN-006", "El inicio de la saga de Harry Potter.", "nuevo", "Biblioteca Central", "1997-06-26", "Bloomsbury", 223, "21x14 cm", "350g"),
      crearLibro("El Hobbit", "J.R.R. Tolkien", "fantasía", "español", 36000, "tapa blanda", "ISBN-007", "Aventura épica en la Tierra Media.", "bueno", "Biblioteca Central", "1937-09-21", "Allen & Unwin", 310, "20x13 cm", "450g"),
      crearLibro("El nombre del viento", "Patrick Rothfuss", "fantasía", "español", 50000, "tapa dura", "ISBN-008", "La primera parte de Crónica del asesino de reyes.", "nuevo", "Biblioteca Central", "2007-03-27", "DAW Books", 662, "24x16 cm", "850g"),
      crearLibro("Los juegos del hambre", "Suzanne Collins", "ciencia ficción", "español", 34000, "ebook", "ISBN-009", "La primera entrega de la trilogía de los juegos del hambre.", "nuevo", "Biblioteca Central", "2008-09-14", "Scholastic Press", 374, "20x13 cm", "500g"),
      crearLibro("Fahrenheit 451", "Ray Bradbury", "ciencia ficción", "español", 30000, "tapa blanda", "ISBN-010", "Una sociedad distópica donde los libros están prohibidos.", "usado", "Biblioteca Central", "1953-10-19", "Ballantine Books", 194, "19x12 cm", "320g"),
      crearLibro("El código Da Vinci", "Dan Brown", "misterio", "español", 37000, "tapa blanda", "ISBN-011", "Thriller de misterio y conspiraciones religiosas.", "nuevo", "Biblioteca Central", "2003-03-18", "Doubleday", 454, "22x14 cm", "600g"),
      crearLibro("La sombra del viento", "Carlos Ruiz Zafón", "ficción", "español", 42000, "tapa dura", "ISBN-012", "Primera novela de la saga El Cementerio de los Libros Olvidados.", "excelente", "Biblioteca Central", "2001-04-17", "Planeta", 565, "23x15 cm", "700g"),
      crearLibro("El alquimista", "Paulo Coelho", "ficción", "español", 28000, "ebook", "ISBN-013", "Una parábola sobre seguir los sueños.", "nuevo", "Biblioteca Central", "1988-01-01", "HarperTorch", 208, "20x13 cm", "300g"),
      crearLibro("El retrato de Dorian Gray", "Oscar Wilde", "ficción", "español", 32000, "tapa blanda", "ISBN-014", "Historia sobre la belleza, el arte y la moralidad.", "bueno", "Biblioteca Central", "1890-07-01", "Lippincott's Monthly Magazine", 254, "21x14 cm", "400g"),
      crearLibro("Dune", "Frank Herbert", "ciencia ficción", "español", 50000, "tapa dura", "ISBN-015", "La epopeya de ciencia ficción más famosa de todos los tiempos.", "nuevo", "Biblioteca Central", "1965-08-01", "Chilton Books", 688, "24x16 cm", "900g"),
      crearLibro("Neuromante", "William Gibson", "ciencia ficción", "español", 38000, "ebook", "ISBN-016", "Obra pionera del subgénero cyberpunk.", "excelente", "Biblioteca Central", "1984-07-01", "Ace Books", 271, "20x13 cm", "350g"),
      crearLibro("El perfume", "Patrick Süskind", "ficción", "español", 36000, "tapa blanda", "ISBN-017", "Historia de un asesino con un olfato prodigioso.", "nuevo", "Biblioteca Central", "1985-01-01", "Diogenes Verlag", 255, "20x13 cm", "400g"),
      crearLibro("El club de la lucha", "Chuck Palahniuk", "ficción", "español", 34000, "tapa dura", "ISBN-018", "Novela que inspiró la famosa película.", "usado", "Biblioteca Central", "1996-08-17", "W. W. Norton", 218, "21x14 cm", "380g"),
      crearLibro("American Gods", "Neil Gaiman", "fantasía", "español", 46000, "tapa dura", "ISBN-019", "Mezcla de mitología y realidad contemporánea.", "nuevo", "Biblioteca Central", "2001-06-19", "William Morrow", 465, "24x16 cm", "750g"),
      crearLibro("El libro de arena", "Jorge Luis Borges", "ficción", "español", 30000, "ebook", "ISBN-020", "Colección de cuentos fantásticos de Borges.", "bueno", "Biblioteca Central", "1975-01-01", "Emecé Editores", 181, "19x12 cm", "300g")
    );
  } catch (error) {
    console.error('Error al crear libros predeterminados:', error.message);
  }
  iniciarMenu();
};
// Ejecución inicial: carga los 20 libros por defecto y muestra el menú principal
cargar20Libros();

/**
 * Agrega 10 libros adicionales a la pila (siempre los mismos títulos) y muestra el menú.
 * Utiliza la barra de carga para simular el proceso.
 * @async
 * @returns {Promise<void>}
 */
const cargar10libros = async () => {
  await barraCarga("Cargando 10 libros adicionales");
  try {
    pila.push(
      crearLibro("Dune", "Frank Herbert", "ciencia ficción", "español", 50000, "tapa dura", "ISBN-021", "La epopeya de ciencia ficción más famosa de todos los tiempos.", "nuevo", "Biblioteca Central", "1965-08-01", "Chilton Books", 688, "24x16 cm", "900g"),
      crearLibro("Neuromante", "William Gibson", "ciencia ficción", "español", 38000, "ebook", "ISBN-022", "Obra pionera del subgénero cyberpunk.", "excelente", "Biblioteca Central", "1984-07-01", "Ace Books", 271, "20x13 cm", "350g"),
      crearLibro("El perfume", "Patrick Süskind", "ficción", "español", 36000, "tapa blanda", "ISBN-023", "Historia de un asesino con un olfato prodigioso.", "nuevo", "Biblioteca Central", "1985-01-01", "Diogenes Verlag", 255, "20x13 cm", "400g"),
      crearLibro("El club de la lucha", "Chuck Palahniuk", "ficción", "español", 34000, "tapa dura", "ISBN-024", "Novela que inspiró la famosa película.", "usado", "Biblioteca Central", "1996-08-17", "W. W. Norton", 218, "21x14 cm", "380g"),
      crearLibro("American Gods", "Neil Gaiman", "fantasía", "español", 46000, "tapa dura", "ISBN-025", "Mezcla de mitología y realidad contemporánea.", "nuevo", "Biblioteca Central", "2001-06-19", "William Morrow", 465, "24x16 cm", "750g"),
      crearLibro("El libro de arena", "Jorge Luis Borges", "ficción", "español", 30000, "ebook", "ISBN-026", "Colección de cuentos fantásticos de Borges.", "bueno", "Biblioteca Central", "1975-01-01", "Emecé Editores", 181, "19x12 cm", "300g"),
      crearLibro("Pedro Páramo", "Juan Rulfo", "ficción", "español", 32000, "tapa blanda", "ISBN-027", "Obra maestra del realismo mágico mexicano.", "nuevo", "Biblioteca Central", "1955-01-01", "Fondo de Cultura Económica", 124, "20x13 cm", "250g"),
      crearLibro("Rayuela", "Julio Cortázar", "ficción", "español", 40000, "tapa dura", "ISBN-028", "Novela experimental considerada una de las más influyentes del siglo XX.", "excelente", "Biblioteca Central", "1963-06-28", "Sudamericana", 600, "23x15 cm", "700g"),
      crearLibro("La casa de los espíritus", "Isabel Allende", "ficción", "español", 42000, "tapa dura", "ISBN-029", "Saga familiar que combina historia y realismo mágico.", "nuevo", "Biblioteca Central", "1982-01-01", "Plaza & Janés", 481, "22x14 cm", "650g"),
      crearLibro("Los detectives salvajes", "Roberto Bolaño", "ficción", "español", 45000, "tapa blanda", "ISBN-030", "Novela de culto de la literatura latinoamericana contemporánea.", "nuevo", "Biblioteca Central", "1998-01-01", "Editorial Anagrama", 609, "23x15 cm", "700g")
    );
  } catch (error) {
    console.error('Error al crear libros adicionales:', error.message);
  }
  iniciarMenu();
};

/**
 * Muestra todos los libros actualmente en la pila por consola.
 * Utiliza la barra de carga antes de mostrar los libros.
 * @async
 * @returns {Promise<void>}
 */
const cargarLibreria = async () => {
  await barraCarga("Cargando libreria");
  pila.forEach((libro) => console.log(libro));
  iniciarMenu();
};

/**
 * Elimina los últimos 5 libros agregados a la pila (si existen) y muestra el menú.
 * Utiliza la barra de carga antes de eliminar.
 * @async
 * @returns {Promise<void>}
 */
const borrar5libros = async () => {
  await barraCarga("Borrando 5 libros");
  if (pila.length > 0) {
    for (let i = 0; i < 5; i++) {
      const datoBorrado = pila.pop();
      if (datoBorrado) {
        console.log("Borrando: ", datoBorrado);
      }
    }
  }
  iniciarMenu();
};

/**
 * Muestra estadísticas de la colección de libros:
 * - Total de libros
 * - Precio total y promedio
 * - Total de géneros y cantidad por género
 * Utiliza la barra de carga antes de mostrar los datos.
 * @async
 * @returns {Promise<void>}
 */
const estadistica = async () => {
  await barraCarga("Cargando estadisticas");
  if (pila.length === 0) {
    console.log("No existen libros");
  } else {
    const totalLibros = pila.length;
    const totalPrecio = pila.reduce((acum, libro) => acum + libro.precio, 0);
    const precioPromedio = totalPrecio / totalLibros;
    const totalGeneros = [...new Set(pila.map((libro) => libro.genero))].length;
    const cadaGenero = pila.reduce((acom, libro) => {
      const genero = libro.genero;
      acom[genero] = (acom[genero] || 0) + 1;
      return acom;
    }, {});
    console.log("=====================");
    console.log("Total de libros:", totalLibros);
    console.log("Precio total de libros: $", totalPrecio);
    console.log("Precio promedio de libros: $", precioPromedio.toFixed(2));
    console.log("Total de géneros:", totalGeneros);
    console.log("Estadísticas por género:", cadaGenero);
  }
  iniciarMenu();
};

/**
 * Reinicia la pila de libros a los 20 libros por defecto.
 * Vacía la pila y vuelve a cargar los libros iniciales.
 * Utiliza la barra de carga antes de reiniciar.
 * @async
 * @returns {Promise<void>}
 */
const reiniciarPila = async () => {
  await barraCarga("Reinicio");
  pila = [];
  await cargar20Libros();
  console.log("Pila reiniciada a 20 libros por defecto");
  iniciarMenu();
};
//FIN


/*=====================SECCION DE MANEJO DE ARRAYS AVANZADOS=========================== */

/*1. Modifica el array de libros en el cual tengas 5 libros por una editorial específica.
2. Realizar uso del array Method .map y listar los libros por **Titulo**, **Autor, Editorial** y **Precio**
3. Crear 10 iteraciones diferentes manteniendo el atributo **Titulo* */

//Objetivo: modificar el array para que tenga 5 libros con una editorial especifica

//funcion para cargar los libros de editorial especifica
const cargarLibrosPorEdit=()=>{
  pila.push(
    crearLibro("El Hobbit", "J.R.R. Tolkien", "fantasía", "español", 36000, "tapa blanda", "ISBN-007", "Aventura épica en la Tierra Media.", "bueno", "Biblioteca Central", "1937-09-21", "Minotauro", 310, "20x13 cm", "450g"),
    crearLibro("El Señor de los Anillos: La Comunidad del Anillo", "J.R.R. Tolkien", "fantasía", "español", 45000, "tapa dura", "ISBN-001", "Un clásico de la literatura fantástica.", "nuevo", "Biblioteca Central", "1954-07-29", "Minotauro", 576, "23x15 cm", "800g"),
    crearLibro("Harry Potter y la piedra filosofal", "J.K. Rowling", "fantasía", "español", 38000, "tapa dura", "ISBN-006", "El inicio de la saga de Harry Potter.", "nuevo", "Biblioteca Central", "1997-06-26", "Minotauro", 223, "21x14 cm", "350g"),
    crearLibro("Cien años de soledad", "Gabriel García Márquez", "ficción", "español", 40000, "tapa dura", "ISBN-003", "La historia de la familia Buendía en Macondo.", "nuevo", "Biblioteca Central", "1967-05-30", "Minotauro", 417, "21x14 cm", "500g"),
    crearLibro("Los juegos del hambre", "Suzanne Collins", "ciencia ficción", "español", 34000, "ebook", "ISBN-009", "La primera entrega de la trilogía de los juegos del hambre.", "nuevo", "Biblioteca Central", "2008-09-14", "Minotauro", 374, "20x13 cm", "500g")
  );
}
cargarLibrosPorEdit();
//ahora estos libros ya existen, toca filtrarlos desde la pila
const funMismaEdit = ()=>{
  const editorialFiltro = "minotauro";
  const mismaEdit = pila.filter(libro =>
    libro.editorial === editorialFiltro
  )
.map(libro=> ({
  titulo: libro.titulo,
  autor: libro.autor,
  editorial: libro.editorial,
  precio: libro.precio
})).slice(0,5);
mismaEdit.forEach((libro) => console.table(libro));
//punto 2: uso de .map para listar los libros por Titulo, Autor, Editorial y Precio
pila.map(libro => ({
  titulo: libro.titulo,
  autor: libro.autor,
  editorial: libro.editorial,
  precio: libro.precio
})).forEach(libro => console.table(libro));


//punto 3 crear 10 iteraciones diferentes manteniendo el atributo Titulo
//it1
pila.map(libro =>({
  titulo: libro.titulo,
  autor: libro.autor,
})).forEach(libro => console.table(libro))
//it2
pila.map(libro =>({
  titulo: libro.titulo,
  precio: libro.precio,
  genero: libro.genero
})).forEach(libro => console.table(libro))
//it3
pila.map(libro =>({
  titulo: libro.titulo,
  estado: libro.estado
})).forEach(libro => console.table(libro))
//it4
pila.map(libro =>([{
  titulo: libro.titulo,
  idioma: libro.idioma,

}])).forEach(libro => console.table(libro))
//it5
pila.map(libro =>({
  titulo: libro.titulo,
  isbn: libro.isbn,
})).forEach(libro => console.table(libro))
//it6
pila.map(libro =>({
  titulo: libro.titulo,
  descripcion: libro.descripcion,
})).forEach(libro => console.table(libro))
//it7
pila.map(libro =>({
  titulo: libro.titulo,
  ubicacion: libro.ubicacion
})).forEach(libro => console.table(libro))
//it8
pila.map(libro =>({
  titulo: libro.titulo,
  fecha_publicacion: libro.fecha_publicacion
})).forEach(libro => console.table(libro))
//it9
pila.map(libro =>({
  titulo: libro.titulo,
  editorial: libro.editorial
})).forEach(libro => console.table(libro))
//it10
pila.map(libro =>({
  titulo: libro.titulo,
  paginas: libro.paginas
})).forEach(libro => console.table(libro))
iniciarMenu2()
}


/*=====================FIN DE SECCION DE MANEJO DE ARRAYS AVANZADOS=========================== */