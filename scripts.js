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
        carta.setAttribute("data-imagem", `${cartasFront[indice]}`);
        carta.setAttribute("data-test", "card");

        imgback.src = `img/back.png`;
        imgback.setAttribute("data-test", "face-down-image");
        imgfront.src = `img/${cartasFront[indice]}.gif`;
        imgfront.setAttribute("data-test", "face-up-image");

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

let primeiraCarta = "";
let segundaCarta = "";

let pontos;
let backVirada;
let frontVirada;

let aaa;
let bbb;

function virarCarta(card) {

    backVirada = card.querySelector(".back");
    frontVirada = card.querySelector(".front");

    if (primeiraCarta === "") {
        backVirada.setAttribute("class", "clicado back face");
        frontVirada.setAttribute("class", "clicado front face");
        primeiraCarta = card;
    } else if (segundaCarta === "") {
        backVirada.setAttribute("class", "clicado back face");
        frontVirada.setAttribute("class", "clicado front face");
        segundaCarta = card;

        verificaIgualdade();
    }
    //se ja tiver uma carta igual virada = manter as duas viradas pra cima

    // se nao tiver, virar de volta a carta clicada e a carta clicada anteriormente
}

function verificaIgualdade() {
    const imagemPrimeira = primeiraCarta.getAttribute("data-imagem");
    const imagemSegunda = segundaCarta.getAttribute("data-imagem");

    const backPrimeiraCarta = primeiraCarta.querySelector(".back");
    const frontPrimeiraCarta = primeiraCarta.querySelector(".front");

    const backSegundaCarta = segundaCarta.querySelector(".back");
    const frontSegundaCarta = segundaCarta.querySelector(".front");

    if (imagemPrimeira === imagemSegunda) {
        pontos++;
        console.log(pontos);
    } else {
        //COLOCAR O SET TIMEOUT AQUI
        backPrimeiraCarta.classList.remove("clicado");
        backSegundaCarta.classList.remove("clicado");
        frontPrimeiraCarta.classList.remove("clicado");
        frontSegundaCarta.classList.remove("clicado");
    }
}