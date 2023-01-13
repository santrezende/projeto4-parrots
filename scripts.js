let numCarta;

function verificaCartas() {

    numCarta = prompt("Com quantas cartas vc quer jogar?");

    while (numCarta % 2 === 1 || numCarta < 3 || numCarta > 14) {
        if (numCarta % 2 === 1 || numCarta < 3 || numCarta > 14) {
            alert("INVALIDO");
            numCarta = prompt("Com quantas cartas vc quer jogar?");
        }
    }
}

const containerCartas = document.querySelector(".container-cartas");

function comparador() {
    return Math.random() - 0.5;
}

let cartasFront = [
    "bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot"
];

cartasFront.sort(comparador);

const srcStringBack = "img/back.png";
const srcStringFront = `img/${cartasFront}.gif`;

function criarElementos(tag, classe) {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    return (elemento);
}


function criarCartas() {
    containerCartas.innerHTML = "";
    for (let indice = 0; indice < (numCarta / 2); indice++) {
        const carta = criarElementos("li", "card");
        const back = criarElementos("div", "back face");
        const imgback = criarElementos("img", "img-back");
        const front = criarElementos("div", "front face");
        const imgfront = criarElementos("img", "img-front");

        carta.setAttribute("onclick", "virarCarta(this)");

        imgback.src = `img/back.png`;
        imgfront.src = `img/${cartasFront[indice]}.gif`;

        back.appendChild(imgback);
        front.appendChild(imgfront);

        carta.appendChild(back);
        carta.appendChild(front);

        containerCartas.appendChild(carta);
    }
}

function duplicarCartas() {
    containerCartas.innerHTML = containerCartas.innerHTML + containerCartas.innerHTML;
}

function colocaCartasEmbaralhadas() {

    const cartasEmJogo = document.querySelectorAll("li");
    let embaralhado = Array.from(cartasEmJogo);
    embaralhado.sort(comparador);

    containerCartas.innerHTML = "";
    for (let indice = 0; indice < numCarta; indice++) {
        containerCartas.appendChild(embaralhado[indice]);
    }
}

function iniciarJogo() {
    verificaCartas();
    criarCartas();
    duplicarCartas();
    colocaCartasEmbaralhadas();
}

iniciarJogo();

function virarCarta(card) {
    const backVirada = card.querySelector(".back");
    const frontVirada = card.querySelector(".front");

    backVirada.setAttribute("class", "clicado back face");
    frontVirada.setAttribute("class", "clicado front face");

    //se ja tiver uma carta igual virada = manter as duas viradas pra cima

    // se nao tiver, virar de volta a carta clicada e a carta clicada anteriormente
}

