let numCarta = prompt("Com quantas cartas vc quer jogar?");

while (numCarta % 2 === 1 || numCarta < 3 || numCarta > 14) {
    if (numCarta % 2 === 1 || numCarta < 3 || numCarta > 14) {
        alert("INVALIDO");
        numCarta = prompt("Com quantas cartas vc quer jogar?");
    }
}

//buscar a cartas no DOM

const cartaUm = document.querySelector(".um");
const cartaDois = document.querySelector(".dois");
const cartaTres = document.querySelector(".tres");
const cartaQuatro = document.querySelector(".quatro");
const cartaCinco = document.querySelector(".cinco");
const cartaSeis = document.querySelector(".seis");
const cartaSete = document.querySelector(".sete");

const cartas = [];
let ultimaPosicao = cartas[cartas.length];

console.log(cartaDois);