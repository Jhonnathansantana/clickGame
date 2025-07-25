# Fiebre de Bloques

¡Un adictivo juego de reflejos con estética de Minecraft! "Fiebre de Bloques" pone a prueba tu velocidad y precisión al hacer clic. El objetivo es simple: destruye los bloques que aparecen en la pantalla con el clic correcto antes de que se agote el tiempo. ¡Consigue la puntuación más alta posible!

![Imagen del Juego](https://raw.githubusercontent.com/Jhonnathansantana/clickGame/refs/heads/main/Screenshot%202025-07-25%20111354.png)

---

## Características Principales

* **Jugabilidad Dinámica:** Los bloques aparecen aleatoriamente y debes destruirlos rápidamente.
* **Doble Mecánica de Clic:** Utiliza el **clic izquierdo** para los bloques de piedra y el **clic derecho** para los de madera.
* **Sistema de Vidas:** Comienzas con 3 vidas. Pierdes una si te equivocas de clic o si un bloque se queda sin tiempo.
* **Dificultad Progresiva:** A medida que aumenta tu puntuación, los bloques aparecen más rápido y su tiempo de vida se reduce.
* **Puntuación y Personalización:** El juego guarda tu puntuación y te permite introducir tu nombre para una experiencia personalizada.
* **Código Limpio y Eficiente:** El proyecto está refactorizado usando un patrón de Módulo en JavaScript para una mejor organización y mantenibilidad.

---

## Cómo Jugar

1.  **Abre el archivo `index.html`** en cualquier navegador web moderno.
2.  **Introduce tu nombre** en el campo de texto y haz clic en **"Empezar Juego"**.
3.  **Observa los bloques** que aparecen en la pantalla:
    * Para los bloques de **piedra (grises)**, usa el **CLIC IZQUIERDO**.
    * Para los bloques de **madera (marrones)**, usa el **CLIC DERECHO**.
4.  **Actúa rápido:** Destruye cada bloque antes de que su barra de tiempo amarilla se agote.
5.  **¡Sobrevive y consigue la máxima puntuación!** El juego termina cuando pierdes tus tres vidas.

---

## Tecnologías Utilizadas

* **HTML5:** Para la estructura básica del juego y la interfaz.
* **CSS3:** Para todos los estilos visuales, la estética "pixel art" y las animaciones.
* **JavaScript (ES6+):** Para toda la lógica del juego, la manipulación del DOM, la gestión de eventos y el estado del juego.

---

## Estructura del Código

El código JavaScript está encapsulado en un único objeto global `Game`, siguiendo el **Patrón Módulo**. Esta estructura ayuda a:

* Evitar la contaminación del `scope` global.
* Organizar el código en secciones lógicas:
    * `Game.config`: Almacena la configuración inicial e inmutable del juego.
    * `Game.state`: Mantiene el estado actual de la partida (puntuación, vidas, etc.).
    * `Game.elements`: Guarda las referencias a los elementos del DOM.
    * `Game.init()`: Inicia el juego, cachea elementos y asigna los eventos.
    * `Game.start()`, `Game.gameOver()`, `Game.gameLoop()`: Controlan el flujo principal de la partida.
* Facilitar la lectura, el mantenimiento y la escalabilidad del proyecto.

---

## Autor

Este juego fue creado por:

* **Jhonnathan De Jesus Araujo Santana**
* **Email:** [jhonnathansantana@outlook.com](mailto:jhonnathansantana@outlook.com)
* **LinkedIn:** [https://www.linkedin.com/in/jhonnathansantana/](https://www.linkedin.com/in/jhonnathansantana/)# clickGame
