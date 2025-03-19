const letrasElement = document.getElementById("letras");
const preguntaElement = document.getElementById("pregunta");
const respuestaInput = document.getElementById("respuesta");
const pasarButton = document.getElementById("pasar");
const siguienteButton = document.getElementById("siguiente");
const correctasElement = document.getElementById("correctas");
const incorrectasElement = document.getElementById("incorrectas");
const tiempoElement = document.getElementById("tiempo");

const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let letraActual = 0;
let correctas = 0;
let incorrectas = 0;
let tiempo = 0;
let intervalo;
let preguntas = {};


/**
 * Posiciona las letras del alfabeto en un arreglo circular dentro del elemento
 * contenedor "letras". Cada letra se coloca en un ángulo distribuido de manera
 * uniforme alrededor del círculo, calculado en función de su índice en el
 * alfabeto. La función crea dinámicamente y coloca elementos del DOM para cada
 * letra, configurando sus estilos para asegurarse de que estén centrados dentro
 * del círculo.
 */

function posicionarLetras() {
  const radio = 200; // Radio del círculo
  const angulo = (2 * Math.PI) / letras.length; // Ángulo entre cada letra

  letras.forEach((letra, index) => {
    const x = radio * Math.cos(angulo * index);
    const y = radio * Math.sin(angulo * index);

    const letraElement = document.createElement("div");
    letraElement.className = "letra";
    letraElement.textContent = letra;
    letraElement.style.position = "absolute";
    letraElement.style.left = `calc(50% + ${x}px)`;
    letraElement.style.top = `calc(50% + ${y}px)`;
    letraElement.style.transform = "translate(-50%, -50%)";
    letrasElement.appendChild(letraElement);
  });
}

/**
 * Carga el corpus de palabras desde un archivo CSV
 * y lo devuelve como un arreglo de objetos con
 * propiedades `word` y `definition`.
 *
 * @return {Promise<Array<{word: string, definition: string}>>}
 */
async function cargarCorpus() {
  try {
    const response = await fetch("corpus.csv");
    const text = await response.text();
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const [header, ...rows] = lines;

    const corpus = rows.map((row) => {
      const [word, lang_code, lang, pos, pos_title, definition] =
        row.split("^");
      return {
        word: word, // Extraer la palabra directamente
        definition: definition, // Extraer la definición directamente
      };
    });
    return corpus;
  } catch (error) {
    console.error("Error al cargar el corpus:", error);
    return [];
  }
}


/**
 * Genera preguntas para cada letra del abecedario, utilizando el corpus
 * cargado desde el archivo CSV. La función organiza las palabras del corpus
 * por su letra inicial, y luego selecciona una palabra al azar para cada
 * letra y la utiliza para generar una pregunta. Si no se encuentra una palabra
 * para una letra, se utiliza una pregunta por defecto.
 *
 * @return {Promise<void>}
 */
async function generarPreguntas() {
  const corpus = await cargarCorpus();
  const corpusPorLetra = {};

  // Organizar palabras del corpus por su letra inicial
  corpus.forEach(({ word, definition }) => {
    const letra = word[0].toLowerCase();
    if (!corpusPorLetra[letra]) {
      corpusPorLetra[letra] = [];
    }
    if (definition) {
      corpusPorLetra[letra].push({ palabra: word, definicion: definition });
    }
  });

  // Generar preguntas para cada letra
  for (const letra of letras) {
    const letraLower = letra.toLowerCase();
    if (corpusPorLetra[letraLower] && corpusPorLetra[letraLower].length > 0) {
      const entradaAleatoria =
        corpusPorLetra[letraLower][
          Math.floor(Math.random() * corpusPorLetra[letraLower].length)
        ];

      preguntas[letraLower] = {
        pregunta: `Definición: ${entradaAleatoria.definicion}`,
        respuesta: entradaAleatoria.palabra,
      };
    } else {
      preguntas[letraLower] = {
        pregunta: `No se encontró una palabra para la letra ${letra}`,
        respuesta: "desconocido",
      };
    }
  }

  iniciarJuego();
}

function iniciarJuego() {
  posicionarLetras();
  mostrarPregunta();
  intervalo = setInterval(actualizarTiempo, 1000);
}

/**
 * Muestra la pregunta correspondiente a la letra actual en el elemento
 * `<div id="pregunta">`.
 *
 * Si no hay pregunta para la letra actual, muestra un mensaje indicando
 * que no hay pregunta para esa letra.
 */
function mostrarPregunta() {
  const letra = letras[letraActual].toLowerCase();
  if (preguntas[letra]) {
    preguntaElement.textContent = preguntas[letra].pregunta;
  } else {
    preguntaElement.textContent = `No hay pregunta para la letra ${letra.toUpperCase()}`;
  }
}

/**
 * Actualiza el tiempo transcurrido en el juego en segundos
 * y lo muestra en el formato `mm:ss` dentro del elemento
 * `<span id="tiempo">`.
 * 
 * Incrementa la variable global `tiempo` en 1 cada vez que se llama
 * y convierte el tiempo total en minutos y segundos. Asegura que los
 * minutos y segundos se muestren siempre con dos dígitos.
 */

function actualizarTiempo() {
  tiempo++;
  const minutos = Math.floor(tiempo / 60);
  const segundos = tiempo % 60;
  tiempoElement.textContent = `${minutos.toString().padStart(2, "0")}:${segundos
    .toString()
    .padStart(2, "0")}`;
}


/**
 * Verifica la respuesta del usuario y actualiza el estado del juego.
 *
 * Compara la respuesta del usuario con la respuesta correcta para la letra
 * actual y actualiza la clase CSS de la letra correspondiente en el rosco.
 * Si la respuesta es correcta, agrega la clase "correcta", en caso contrario,
 * agrega la clase "incorrecta". Incrementa el contador de respuestas correctas
 * o incorrectas según sea necesario. Limpia el campo de texto para la próxima
 * respuesta y muestra la siguiente pregunta.
 */
function verificarRespuesta() {
  const letra = letras[letraActual].toLowerCase();
  if (preguntas[letra]) {
    const respuestaCorrecta = preguntas[letra].respuesta.toLowerCase();
    const respuestaUsuario = respuestaInput.value.toLowerCase();

    if (respuestaUsuario === respuestaCorrecta) {
      letrasElement.children[letraActual].classList.add("correcta");
      correctas++;
    } else {
      letrasElement.children[letraActual].classList.add("incorrecta");
      incorrectas++;
    }

    correctasElement.textContent = correctas;
    incorrectasElement.textContent = incorrectas;
    respuestaInput.value = "";
  }
  siguientePregunta();
}

/**
 * Avanza al siguiente letra en el rosco y muestra la pregunta asociada.
 *
 * Incrementa el índice de la letra actual en el arreglo de letras y
 * utiliza el operador de módulo para rotar al principio del arreglo
 * cuando se llega al final. Luego llama a la función `mostrarPregunta`
 * para mostrar la pregunta correspondiente a la letra actual.
 */
function siguientePregunta() {
  letraActual = (letraActual + 1) % letras.length;
  mostrarPregunta();
}

pasarButton.addEventListener("click", siguientePregunta);
siguienteButton.addEventListener("click", verificarRespuesta);

// Iniciar el juego después de generar las preguntas
generarPreguntas();
