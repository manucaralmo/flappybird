# FlappyiBird

https://ironptsolutions.github.io/flappybird/index.html

## Iteración 1

- Background: se compone de 2 imágenes
  - El fondo de la ciudad: siempre estará quieto.
  - La tierra: es la imagen que tendremos que desplazar para conseguir el efecto del movimiento
  [Draw Image MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
- Game: unirá todas las piezas del juego, en esta iteración completaremos los métodos para conseguir pintar el fondo y moverlo:
  - start
  - stop
  - draw
  - move


## Iteración 2

Modelaremos todo el movimiento y animación del FlappyBird:

- FlappyBird:
  - Pintar el sprite: tiene 3 estados que necesitaréis conocer:
    - ancho/largo del segmento
    - número de segmentos verticales y horizontales (sí, solo tiene un vertical, pero repasemos toda la fórmula)
    - segmento en el que nos encontramos
  - Animarlo, que simplemente haga el efecto de mover las alas en el sitio.
  - Movimiento:
    - Hacer que responda a eventos de teclado
    - Impulsarlo con barra espaciadora:
    - impulso: 70
    - vy: 3

- Game:
  - Instanciar el Fappy
  - Configurar los eventos de teclado
  - Pintar
  - Mover

## Iteración 3

- Pipe:
  - tiene dos modos: top y bottom para seleccionar la img a utilizar
  - una pipe no puede superar más del 75% de la pantalla
- Game:
  - Añadir cada 100 ciclos de pintado 2 tuberías, tendrán que dejar entre ellas 2 veces el tamaño del flappy + el impulso del salto:
    - addPipes: cada 100 cliclos de pintado añade 2 tuberías al array de tuberías del game.
    - randPairOfPipes: devuelve un array con 2 tuberías en el mismo eje con un espacio de separación para que entre el pájaro.
  - Pintar las pipes.
  - Mover las pipes

## Iteración 4

- Colisiones: cada ciclo de juego hay que mirar si el pájaro ha chocado contra el suelo o contra alguna de las tuberías.


## Bonus

- Puntuación: por cada tubería superada por el pájaro añade 1 en el marcador.
