let numCarta = prompt("Com quantas cartas você quer jogar?");

function verificaCartas() {

    while (numCarta % 2 === 1 || numCarta < 3 || numCarta > 14) {
        if (numCarta % 2 === 1 || numCarta < 3 || numCarta > 14) {
            alert("Digite um número par entre 4 e 14");
            numCarta = prompt("Com quantas cartas você quer jogar?");
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

let primeiraCarta = "";
let segundaCarta = "";

let jogadas = 0;
let backVirada;
let frontVirada;

function virarCarta(card) {

    backVirada = card.querySelector(".back");
    frontVirada = card.querySelector(".front");

    if (primeiraCarta === "") {
        backVirada.setAttribute("class", "clicado back face");
        frontVirada.setAttribute("class", "clicado front face");
        primeiraCarta = card;
        primeiraCarta.removeAttribute("onclick");
    } else if (segundaCarta === "") {
        backVirada.setAttribute("class", "clicado back face");
        frontVirada.setAttribute("class", "clicado front face");
        segundaCarta = card;

        verificaIgualdade();
    }
}

function verificaIgualdade() {
    const imagemPrimeira = primeiraCarta.getAttribute("data-imagem");
    const imagemSegunda = segundaCarta.getAttribute("data-imagem");

    const backPrimeiraCarta = primeiraCarta.querySelector(".back");
    const frontPrimeiraCarta = primeiraCarta.querySelector(".front");

    const backSegundaCarta = segundaCarta.querySelector(".back");
    const frontSegundaCarta = segundaCarta.querySelector(".front");

    if (imagemPrimeira === imagemSegunda) {
        jogadas++;

        segundaCarta.removeAttribute("onclick");

        primeiraCarta.setAttribute("data-escolhida", "sim");
        segundaCarta.setAttribute("data-escolhida", "sim");

        primeiraCarta = "";
        segundaCarta = "";

    } else {
        setTimeout(() => {
            jogadas++;
            primeiraCarta.setAttribute("onclick", "virarCarta(this)");
            backPrimeiraCarta.classList.remove("clicado");
            backSegundaCarta.classList.remove("clicado");
            frontPrimeiraCarta.classList.remove("clicado");
            frontSegundaCarta.classList.remove("clicado");

            primeiraCarta = "";
            segundaCarta = "";
        }, 500);
    }
    verificaFim();
}

let reiniciar = "";
function verificaFim() {
    const verificador = document.querySelectorAll("li");
    const arrayVerificadora = Array.from(verificador);
    let status = 0;
    for (let indice = 0; indice < arrayVerificadora.length; indice++) {
        let elementoArray = arrayVerificadora[indice];
        if (elementoArray.getAttribute("data-escolhida") === "sim") {
            status++;
        }
    }
    if (status == numCarta) {
        setTimeout(() => {
            alert(`Você ganhou com ${segundos} segundos, em ${jogadas * 2} jogadas!`);
            reiniciar = prompt(`Você gostaria de reiniciar a partida?`);
            status = 0;
            jogadas = 0;
            segundos = 0;
            if (reiniciar === "sim") {
                numCarta = prompt("Com quantas cartas você quer jogar?");
                while (numCarta % 2 === 1 || numCarta < 3 || numCarta > 14) {
                    if (numCarta % 2 === 1 || numCarta < 3 || numCarta > 14) {
                        alert("Digite um número par entre 4 e 14");
                        numCarta = prompt("Com quantas cartas você quer jogar?");
                    }
                }
                iniciarJogo();
            } else {
                relogio.classList.add("escondido");
                alert("O jogo acabou!");
            }
        }, 500);
    }
}

const relogio = document.querySelector(".relogio");

let segundos = 0;
let tempo = 1000;

function printaRelogio() {
    setInterval(() => { timer(); }, tempo);
}

function timer() {
    segundos++;
    relogio.innerHTML = segundos;
}

function iniciarJogo() {
    verificaCartas();
    criarCartas();
    duplicarCartas();
    colocaCartasEmbaralhadas();
}

iniciarJogo();
printaRelogio();