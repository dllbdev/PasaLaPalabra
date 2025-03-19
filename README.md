# PasaLaPalabra

¡Bienvenido a **PasaLaPalabra**! 

Este proyecto es un juego interactivo inspirado en un popular programa de televisión, donde los jugadores deben responder correctamente definiciones para completar un rosco.

El objetivo del juego es responder correctamente a las definiciones de palabras en español. Cada palabra está asociada a una letra del abecedario, y el jugador debe completar el rosco respondiendo todas las palabras correctamente.

**Disclaimer**: El juego aún se encuentra en fase *experimental*, ya que aún carece de funcionalidades clave que mejoren la experiencia de juego. Mientras tanto este es un buen modelo "juguete".

## Descripción

El proyecto utiliza un corpus de palabras y definiciones almacenado en un archivo CSV, junto con una interfaz web interactiva para jugar. El corpus fue creado mediante la curación de [datos crudos](https://kaikki.org/dictionary/rawdata.html) extraídos de [Wiktionary](https://www.wiktionary.org/), trabajo hecho por [kaikki.org](https://kaikki.org/index.html).

## Estructura

- `index.html`: Archivo principal que contiene la estructura de la interfaz del juego.
- `styles.css`: Archivo de estilos para personalizar la apariencia del juego.
- `script.js`: Archivo JavaScript que contiene la lógica del juego.
- `corpus.csv`: Archivo CSV que almacena las palabras y definiciones utilizadas en el juego.

## Requisitos

- Navegador web moderno (Google Chrome, Firefox, Edge, etc.).
- Conexión a internet para cargar dependencias externas.

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/dllbdev/PasaLaPalabra.git
   ```
2. Abre el archivo `index.html` en tu navegador.

## Uso

1. Abre el juego en tu navegador.
2. Lee la definición que aparece en pantalla.
3. Escribe la palabra correspondiente en el campo de texto si la conoces, sino puedes pasar.
4. Completa el rosco respondiendo todas las definiciones correctamente.

## Dependencias

Este proyecto utiliza las siguientes dependencias externas:

- [Bootstrap 5.3.0](https://getbootstrap.com/)
- [Google Fonts (Roboto)](https://fonts.google.com/)

## Contribución

¡Siéntete libre de contribuir al proyecto! 

Así puedes hacerlo:

1. Realiza un `fork` del repositorio.
2. Crea una rama para tu funcionalidad o corrección:
   ```bash
   git checkout -b nombre-de-la-rama
   ```
3. Guarda tus cambios y haz un `commit`:
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. Envía tus cambios:
   ```bash
   git push origin nombre-de-la-rama
   ```
5. Abre un `Pull Request` en el repositorio original.

## Licencia

Este proyecto está bajo la [Licencia Pública General de GNU](https://www.gnu.org/licenses/gpl-3.0.html). Consulta el archivo `LICENSE` para más detalles.

## Autor

¡Gracias por jugar **PasaLaPalabra**!

-- *Creado por [mí](https://dllbdev.github.io/homepage/).*
