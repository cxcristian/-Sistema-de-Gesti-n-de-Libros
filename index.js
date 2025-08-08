/*## Descripción General

Este proyecto implementa un **Sistema de Gestión de Libros**
 desarrollado en JavaScript que utiliza una estructura de datos tipo **pila (stack)**
  para almacenar y gestionar información bibliográfica. El sistema incluye un menú interactivo en consola que 
  permite realizar diversas operaciones sobre la colección de libros. */

const readline = require("readline");

const iniciarMenu = () => {
  const rl = readline.createInterface({
    input: process.stdin, // Entrada estándar (teclado)
    output: process.stdout, // Salida estándar (consola)
  });

  const menu = () => {
    console.log("<====MENU BIBLIOTECA====>");
    console.log("1.Mostrar Libros Actuales");
    console.log("2.Agregar 10 libros más");
    console.log("3.Quitar 5 libros");
    console.log("4.Mostrar estadisticas");
    console.log("5.Resetear a 20 libros por defecto");
    console.log("6.Salir del programa");
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

        default:
          console.log("datos no conocidos");
          menu();
          break;
      }
    });
  };
  menu();
};
  function barraCarga(mensaje = "Cargando...", ciclos = 3) {
  return new Promise((resolve) => {
    const barra = ['-', '\\', '|', '/'];
    let i = 0;
    let totalIteraciones = ciclos * barra.length;

    const intervalo = setInterval(() => {
      process.stdout.write(`\r${barra[i % barra.length]} ${mensaje}`);
      i++;

      if (i >= totalIteraciones) {
        clearInterval(intervalo);
        process.stdout.write(`\r${mensaje}... Hecho!\n`);
        resolve(); // Aquí se resuelve la promesa
      }
    }, 200); // velocidad de cambio
  });

}
var pila = [];

//Opcion de cargar los 20 miserables libros por defecto
const cargar20Libros = async() => {
  await barraCarga("Cargando libros predeterminados");
  pila.push(
    {
      titulo: "El Señor de los Anillos: La Comunidad del Anillo",
      autor: "J.R.R. Tolkien",
      genero: "fantasía",
      idioma: "español",
      precio: 45000,
      formato: "tapa dura",
      isbn: "ISBN-001",
      descripcion: "Un clásico de la literatura fantástica.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1954-07-29",
      editorial: "Minotauro",
      paginas: 576,
      dimensiones: "23x15 cm",
      peso: "800g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "1984",
      autor: "George Orwell",
      genero: "ficción",
      idioma: "español",
      precio: 35000,
      formato: "tapa blanda",
      isbn: "ISBN-002",
      descripcion: "Distopía sobre el control y la vigilancia.",
      estado: "usado",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1949-06-08",
      editorial: "Secker & Warburg",
      paginas: 328,
      dimensiones: "20x13 cm",
      peso: "400g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      genero: "ficción",
      idioma: "español",
      precio: 40000,
      formato: "tapa dura",
      isbn: "ISBN-003",
      descripcion: "La historia de la familia Buendía en Macondo.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1967-05-30",
      editorial: "Sudamericana",
      paginas: 417,
      dimensiones: "21x14 cm",
      peso: "500g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "Don Quijote de la Mancha",
      autor: "Miguel de Cervantes",
      genero: "ficción",
      idioma: "español",
      precio: 30000,
      formato: "tapa blanda",
      isbn: "ISBN-004",
      descripcion: "La obra cumbre de la literatura española.",
      estado: "como nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1605-01-16",
      editorial: "Francisco de Robles",
      paginas: 863,
      dimensiones: "24x16 cm",
      peso: "900g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "Los miserables",
      autor: "Victor Hugo",
      genero: "ficción",
      idioma: "español",
      precio: 42000,
      formato: "ebook",
      isbn: "ISBN-005",
      descripcion: "Novela histórica sobre justicia y redención.",
      estado: "excelente",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1862-01-01",
      editorial: "A. Lacroix, Verboeckhoven & Cie.",
      paginas: 1232,
      dimensiones: "25x18 cm",
      peso: "1.2kg",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "Harry Potter y la piedra filosofal",
      autor: "J.K. Rowling",
      genero: "fantasía",
      idioma: "español",
      precio: 38000,
      formato: "tapa dura",
      isbn: "ISBN-006",
      descripcion: "El inicio de la saga de Harry Potter.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1997-06-26",
      editorial: "Bloomsbury",
      paginas: 223,
      dimensiones: "21x14 cm",
      peso: "350g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "El Hobbit",
      autor: "J.R.R. Tolkien",
      genero: "fantasía",
      idioma: "español",
      precio: 36000,
      formato: "tapa blanda",
      isbn: "ISBN-007",
      descripcion: "Aventura épica en la Tierra Media.",
      estado: "bueno",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1937-09-21",
      editorial: "Allen & Unwin",
      paginas: 310,
      dimensiones: "20x13 cm",
      peso: "450g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "El nombre del viento",
      autor: "Patrick Rothfuss",
      genero: "fantasía",
      idioma: "español",
      precio: 50000,
      formato: "tapa dura",
      isbn: "ISBN-008",
      descripcion: "La primera parte de Crónica del asesino de reyes.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "2007-03-27",
      editorial: "DAW Books",
      paginas: 662,
      dimensiones: "24x16 cm",
      peso: "850g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "Los juegos del hambre",
      autor: "Suzanne Collins",
      genero: "ciencia ficción",
      idioma: "español",
      precio: 34000,
      formato: "ebook",
      isbn: "ISBN-009",
      descripcion:
        "La primera entrega de la trilogía de los juegos del hambre.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "2008-09-14",
      editorial: "Scholastic Press",
      paginas: 374,
      dimensiones: "20x13 cm",
      peso: "500g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "Fahrenheit 451",
      autor: "Ray Bradbury",
      genero: "ciencia ficción",
      idioma: "español",
      precio: 30000,
      formato: "tapa blanda",
      isbn: "ISBN-010",
      descripcion: "Una sociedad distópica donde los libros están prohibidos.",
      estado: "usado",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1953-10-19",
      editorial: "Ballantine Books",
      paginas: 194,
      dimensiones: "19x12 cm",
      peso: "320g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "El código Da Vinci",
      autor: "Dan Brown",
      genero: "misterio",
      idioma: "español",
      precio: 37000,
      formato: "tapa blanda",
      isbn: "ISBN-011",
      descripcion: "Thriller de misterio y conspiraciones religiosas.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "2003-03-18",
      editorial: "Doubleday",
      paginas: 454,
      dimensiones: "22x14 cm",
      peso: "600g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "La sombra del viento",
      autor: "Carlos Ruiz Zafón",
      genero: "ficción",
      idioma: "español",
      precio: 42000,
      formato: "tapa dura",
      isbn: "ISBN-012",
      descripcion:
        "Primera novela de la saga El Cementerio de los Libros Olvidados.",
      estado: "excelente",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "2001-04-17",
      editorial: "Planeta",
      paginas: 565,
      dimensiones: "23x15 cm",
      peso: "700g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "El alquimista",
      autor: "Paulo Coelho",
      genero: "ficción",
      idioma: "español",
      precio: 28000,
      formato: "ebook",
      isbn: "ISBN-013",
      descripcion: "Una parábola sobre seguir los sueños.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1988-01-01",
      editorial: "HarperTorch",
      paginas: 208,
      dimensiones: "20x13 cm",
      peso: "300g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "El retrato de Dorian Gray",
      autor: "Oscar Wilde",
      genero: "ficción",
      idioma: "español",
      precio: 32000,
      formato: "tapa blanda",
      isbn: "ISBN-014",
      descripcion: "Historia sobre la belleza, el arte y la moralidad.",
      estado: "bueno",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1890-07-01",
      editorial: "Lippincott's Monthly Magazine",
      paginas: 254,
      dimensiones: "21x14 cm",
      peso: "400g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "Dune",
      autor: "Frank Herbert",
      genero: "ciencia ficción",
      idioma: "español",
      precio: 50000,
      formato: "tapa dura",
      isbn: "ISBN-015",
      descripcion:
        "La epopeya de ciencia ficción más famosa de todos los tiempos.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1965-08-01",
      editorial: "Chilton Books",
      paginas: 688,
      dimensiones: "24x16 cm",
      peso: "900g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "Neuromante",
      autor: "William Gibson",
      genero: "ciencia ficción",
      idioma: "español",
      precio: 38000,
      formato: "ebook",
      isbn: "ISBN-016",
      descripcion: "Obra pionera del subgénero cyberpunk.",
      estado: "excelente",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1984-07-01",
      editorial: "Ace Books",
      paginas: 271,
      dimensiones: "20x13 cm",
      peso: "350g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "El perfume",
      autor: "Patrick Süskind",
      genero: "ficción",
      idioma: "español",
      precio: 36000,
      formato: "tapa blanda",
      isbn: "ISBN-017",
      descripcion: "Historia de un asesino con un olfato prodigioso.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1985-01-01",
      editorial: "Diogenes Verlag",
      paginas: 255,
      dimensiones: "20x13 cm",
      peso: "400g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "El club de la lucha",
      autor: "Chuck Palahniuk",
      genero: "ficción",
      idioma: "español",
      precio: 34000,
      formato: "tapa dura",
      isbn: "ISBN-018",
      descripcion: "Novela que inspiró la famosa película.",
      estado: "usado",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1996-08-17",
      editorial: "W. W. Norton",
      paginas: 218,
      dimensiones: "21x14 cm",
      peso: "380g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "American Gods",
      autor: "Neil Gaiman",
      genero: "fantasía",
      idioma: "español",
      precio: 46000,
      formato: "tapa dura",
      isbn: "ISBN-019",
      descripcion: "Mezcla de mitología y realidad contemporánea.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "2001-06-19",
      editorial: "William Morrow",
      paginas: 465,
      dimensiones: "24x16 cm",
      peso: "750g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    },
    {
      titulo: "El libro de arena",
      autor: "Jorge Luis Borges",
      genero: "ficción",
      idioma: "español",
      precio: 30000,
      formato: "ebook",
      isbn: "ISBN-020",
      descripcion: "Colección de cuentos fantásticos de Borges.",
      estado: "bueno",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1975-01-01",
      editorial: "Emecé Editores",
      paginas: 181,
      dimensiones: "19x12 cm",
      peso: "300g",
      fecha_agregado: "2025-08-05T00:00:00.000Z",
    }
  );
  iniciarMenu()
};
//:D esta vaina es la ejecucion de la funcion cargar 20 libros los cuales son pro defecto
cargar20Libros();

//opcion para que carguen 10 libros mas(siempre seran los mismos)
const cargar10libros = async() => {
  await barraCarga("Cargando 10 libros adicionales");
  pila.push(
    {
      titulo: "Dune",
      autor: "Frank Herbert",
      genero: "ciencia ficción",
      idioma: "español",
      precio: 50000,
      formato: "tapa dura",
      isbn: "ISBN-021",
      descripcion:
        "La epopeya de ciencia ficción más famosa de todos los tiempos.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1965-08-01",
      editorial: "Chilton Books",
      paginas: 688,
      dimensiones: "24x16 cm",
      peso: "900g",
      fecha_agregado: new Date().toISOString(),
    },
    {
      titulo: "Neuromante",
      autor: "William Gibson",
      genero: "ciencia ficción",
      idioma: "español",
      precio: 38000,
      formato: "ebook",
      isbn: "ISBN-022",
      descripcion: "Obra pionera del subgénero cyberpunk.",
      estado: "excelente",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1984-07-01",
      editorial: "Ace Books",
      paginas: 271,
      dimensiones: "20x13 cm",
      peso: "350g",
      fecha_agregado: new Date().toISOString(),
    },
    {
      titulo: "El perfume",
      autor: "Patrick Süskind",
      genero: "ficción",
      idioma: "español",
      precio: 36000,
      formato: "tapa blanda",
      isbn: "ISBN-023",
      descripcion: "Historia de un asesino con un olfato prodigioso.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1985-01-01",
      editorial: "Diogenes Verlag",
      paginas: 255,
      dimensiones: "20x13 cm",
      peso: "400g",
      fecha_agregado: new Date().toISOString(),
    },
    {
      titulo: "El club de la lucha",
      autor: "Chuck Palahniuk",
      genero: "ficción",
      idioma: "español",
      precio: 34000,
      formato: "tapa dura",
      isbn: "ISBN-024",
      descripcion: "Novela que inspiró la famosa película.",
      estado: "usado",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1996-08-17",
      editorial: "W. W. Norton",
      paginas: 218,
      dimensiones: "21x14 cm",
      peso: "380g",
      fecha_agregado: new Date().toISOString(),
    },
    {
      titulo: "American Gods",
      autor: "Neil Gaiman",
      genero: "fantasía",
      idioma: "español",
      precio: 46000,
      formato: "tapa dura",
      isbn: "ISBN-025",
      descripcion: "Mezcla de mitología y realidad contemporánea.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "2001-06-19",
      editorial: "William Morrow",
      paginas: 465,
      dimensiones: "24x16 cm",
      peso: "750g",
      fecha_agregado: new Date().toISOString(),
    },
    {
      titulo: "El libro de arena",
      autor: "Jorge Luis Borges",
      genero: "ficción",
      idioma: "español",
      precio: 30000,
      formato: "ebook",
      isbn: "ISBN-026",
      descripcion: "Colección de cuentos fantásticos de Borges.",
      estado: "bueno",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1975-01-01",
      editorial: "Emecé Editores",
      paginas: 181,
      dimensiones: "19x12 cm",
      peso: "300g",
      fecha_agregado: new Date().toISOString(),
    },
    {
      titulo: "Pedro Páramo",
      autor: "Juan Rulfo",
      genero: "ficción",
      idioma: "español",
      precio: 32000,
      formato: "tapa blanda",
      isbn: "ISBN-027",
      descripcion: "Obra maestra del realismo mágico mexicano.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1955-01-01",
      editorial: "Fondo de Cultura Económica",
      paginas: 124,
      dimensiones: "20x13 cm",
      peso: "250g",
      fecha_agregado: new Date().toISOString(),
    },
    {
      titulo: "Rayuela",
      autor: "Julio Cortázar",
      genero: "ficción",
      idioma: "español",
      precio: 40000,
      formato: "tapa dura",
      isbn: "ISBN-028",
      descripcion:
        "Novela experimental considerada una de las más influyentes del siglo XX.",
      estado: "excelente",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1963-06-28",
      editorial: "Sudamericana",
      paginas: 600,
      dimensiones: "23x15 cm",
      peso: "700g",
      fecha_agregado: new Date().toISOString(),
    },
    {
      titulo: "La casa de los espíritus",
      autor: "Isabel Allende",
      genero: "ficción",
      idioma: "español",
      precio: 42000,
      formato: "tapa dura",
      isbn: "ISBN-029",
      descripcion: "Saga familiar que combina historia y realismo mágico.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1982-01-01",
      editorial: "Plaza & Janés",
      paginas: 481,
      dimensiones: "22x14 cm",
      peso: "650g",
      fecha_agregado: new Date().toISOString(),
    },
    {
      titulo: "Los detectives salvajes",
      autor: "Roberto Bolaño",
      genero: "ficción",
      idioma: "español",
      precio: 45000,
      formato: "tapa blanda",
      isbn: "ISBN-030",
      descripcion:
        "Novela de culto de la literatura latinoamericana contemporánea.",
      estado: "nuevo",
      ubicacion: "Biblioteca Central",
      fecha_publicacion: "1998-01-01",
      editorial: "Editorial Anagrama",
      paginas: 609,
      dimensiones: "23x15 cm",
      peso: "700g",
      fecha_agregado: new Date().toISOString(),
    }
  );
  iniciarMenu()
};

//Funcion para mostrar los libros
const cargarLibreria = async() => {
  await barraCarga("Cargando 10 libros adicionales");
  pila.forEach((libro) => console.log(libro));
  iniciarMenu();
};

//funcion para borrar los utlimo 5 libros
const borrar5libros = async () => {
  await barraCarga("Borrando 5 libros");
  if (pila.length > 0)
    for (i = 0; i <= 5; i++) {
      datoBorrado = pila.pop();
      console.log("Borrando: ", datoBorrado);
    }
    iniciarMenu()
};


const estadistica = async() => {
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
    console.log("estadisticas por genero:", cadaGenero);
  }
  iniciarMenu()
};
reiniciarPila = async() => {
  await barraCarga("Reinicio");
  pila = [];
  cargar20Libros();
  console.log("Pila reiniciada a 20 libros por defecto");
  iniciarMenu();
};



