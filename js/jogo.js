// declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

const somClique = new Audio('https://cdn.freesound.org/previews/256/256113_3263906-lq.mp3');
const somPerdeu = new Audio('./audios/Sad Trombone.mp3');
const somGanhou = new Audio('./audios/1gift-confetti.mp3');

// captura os botões pelos ids
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// função que zera os valores das variáveis controladoras e esconde botões
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;

  jogarNovamente(); // reseta visualmente as divs
  atualizaPlacar(0, 0);

  btnJogarNovamente.style.display = 'none';
  btnReiniciar.style.display = 'none';

  document.body.classList.remove('perdeu');
}

// função jogar novamente
function jogarNovamente() {
  jogar = true; // variável jogar volta a ser verdadeira

  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4 || divis[i].id == 5) {
      divis[i].className = "inicial";
    }
  }

  let imagem = document.getElementById("imagem");
  if (imagem != null) {
    imagem.remove();
  }

  let imagem_errada = document.getElementById("imagem_erro");
  if (imagem_errada != null) {
    imagem_errada.remove();
  }
}

// função que atualiza o placar
function atualizaPlacar(acertosParam, tentativasParam) {
  desempenho = tentativasParam > 0 ? (acertosParam / tentativasParam) * 100 : 0;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertosParam} Tentativas: ${tentativasParam} Desempenho: ${Math.round(desempenho)}%`;
}

// função que cria uma imagem
function criarImagem(src, id, largura = 100) {
  const img = new Image(largura);
  img.src = src;
  img.id = id;
  return img;
}

// função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";

  const img = criarImagem(
    "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg",
    "imagem"
  );
  obj.appendChild(img);
}

// função que sorteia um número aleatório entre 1 e 5 e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    let sorteado = Math.floor(Math.random() * 5) + 1;

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
      });

      somGanhou.play();
      somGanhou.currentTime = 0;
    } else {
      obj.className = "errou";

      const img_erro = criarImagem(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Fluent_Emoji_flat_1f625.svg/640px-Fluent_Emoji_flat_1f625.svg.png",
        "imagem_erro"
      );
      obj.appendChild(img_erro);

      somClique.play();
      somClique.currentTime = 0;

      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);

    if (tentativas === 5) {
      // Última tentativa: esconde jogarNovamente, mostra reiniciar
      btnJogarNovamente.style.display = 'none';
      btnReiniciar.style.display = 'inline-block';

      if (desempenho === 0) {
        document.body.classList.add('perdeu');
        somPerdeu.play();
        somPerdeu.currentTime = 0.2;
        somClique.pause();
      }
    } else {
      // Ainda tem jogadas: mostra o botão Jogar Novamente, esconde reiniciar
      btnJogarNovamente.style.display = 'inline-block';
      btnReiniciar.style.display = 'none';
    }
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
