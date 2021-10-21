// ELEMENTOS DEL DOM//
const botonEmpezarJuego = document.querySelector(".empezar")
const pilaInicial = document.querySelector("#pila-inicial")

// FUNCIONES AUXILIARES

const mazo = []
let barajado = []
let pilas = []
let primeraCartaCliqueada = null
const tipos = ["corazon", "diamante", "trebol", "espada"]
const colores = {
    corazon: "rojo",
    diamante: "rojo",
    trebol: "negro",
    espada: "negro"
}

const crearMazo = () => {
    for (let i = 1; i < 13; i++) {
        for (let j = 0; j < tipos.length; j++) {
            const carta = {
                numero: i,
                color: colores[tipos[j]],
                tipo: tipos[j],
                img: `img/${i}_de_${tipos[j]}.png`,
                estaDadaVuelta: true
            }
            mazo.push(carta)
        }
    }
}

const barajarMazo = () => {
    barajado = mazo.map(carta => ({ carta, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ carta }) => carta)
}

const servir = () => {
    for (let i = 0; i < 7; i++) {
        pilas.push([])
        for (let j = 0; j < i + 1; j++) {
            const primeraCartaDeBarajado = barajado[0]
            barajado.shift()
            pilas[i].push(primeraCartaDeBarajado)
        }
    }
    console.log(pilas)
    console.log(barajado)
}


// FUNCIONES 

const crearCartaEnHTML = (carta) => {
    const cartaHTML = document.createElement("div")
    const imagen = document.createElement("img")

    if (carta.estaDadaVuelta) {
        imagen.src = "img/dorso.png"
    }
    else {
        imagen.src = carta.img
    }
    cartaHTML.dataset.numero = carta.numero
    cartaHTML.dataset.color = carta.color
    cartaHTML.dataset.tipo = carta.tipo
    cartaHTML.classList.add("carta")
    cartaHTML.appendChild(imagen)
    cartaHTML.onclick = () => {
        comprobarClickEnCarta(cartaHTML)
    }
    return cartaHTML
}

const ponerCartasEnLaPilaInicial = () => {
    //crear cartas en HTML
    // agregarlas a pila inicial
    for (let i = 0; i < barajado.length; i++) {
        const carta = barajado[i]
        const cartaHTML = crearCartaEnHTML(carta)
        pilaInicial.appendChild(cartaHTML)

    }
}

const ponerCartasEnLasPilas = () => {
    //agarrar las cartas en las pilas
    // construir a partir de ellas un elemento de html
    //agregarlas la imagen correspondiente
    //y guarsarlas en el elemento de html correspondiente
    for (let i = 0; i < pilas.length; i++) {
        const pila = document.querySelector(`#pila-${i}`)
        for (let j = 0; j < pilas[i].length; j++) {
            const esLaUltimaCartaDeLaPila = j === pilas[i].length - 1
            const carta = pilas[i][j]
            if (esLaUltimaCartaDeLaPila) {
                carta.estaDadaVuelta = false
            }
            const cartaHTML = crearCartaEnHTML(carta)
            cartaHTML.dataset.pila = i
            cartaHTML.style.top = `${j * 30}px`
            pila.appendChild(cartaHTML)
        }
    }
}

const comprobarClickEnCarta = (carta) => {
    //si el usuario hizo click en una carta, quiero guardar esa carta (primeraCartaCliqueada)
    //si existe primeraCartaCLiqueada, se que este click es el segundo
    // si no existe se que es el primero.

    if (primeraCartaCliqueada) {
        //hay dos cartas cliqueadas
        // la que guardamos en primeraCartaCliqueada
        // y carta es la segunda.
        //tengo que fijate el numero de la primer y segunda carta cliqueada
        //y el color es diferente al color de la segunda
        //si eso pasa quiero mover la primera carta a la pila de la segunda carta
        const segundaCartaCliqueda = carta
        if (primeraCartaCliqueada.dataset.numero == segundaCartaCliqueada.dataset.numero - 1 && segundaCartaCliqueda.dataset.color !== primeraCartaCliqueada.dataset.color) {

            const pilaDeLaPrimeraCarta = pilas[Number(primeraCartaCliqueada.dataset.pila)]
            const pilaDeLaSegundaCarta = pilas[Number(segundaCartaCliqueda.dataset.pila)]

            const primeraCartaObjeto = pilaDeLaPrimeraCarta.pop()
            pilaDeLaSegundaCarta.push(primeraCartaObjeto)

        }
        else {//minuto 2:02
        }
    }
    else {
        primeraCartaCliqueada = carta
        carta.style.border = "2px solid violet"
    }
}


botonEmpezarJuego.onclick = () => {
    crearMazo()
    barajarMazo()
    servir()
    ponerCartasEnLasPilas()
    ponerCartasEnLaPilaInicial()
}

// cuando el usuario le hace click a una carta
//y despues e hace click a otra carta quiero saber si la primera se puede mover a la segunda.
//si se puede mover quiero moverla
