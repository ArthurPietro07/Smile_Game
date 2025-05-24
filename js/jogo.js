//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;
const somClique = new Audio('https://cdn.freesound.org/previews/256/256113_3263906-lq.mp3');
const somPerdeu = new Audio('./audios/Sad Trombone.mp3')
const somGanhou = new Audio('./audios/1gift-confetti.mp3')


//captura os botoes pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

//funçao que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'invisivel';
  btnReiniciar.className = 'invisivel';

  // Remove o modo dark e a mensagem de derrota
  document.body.classList.remove('perdeu');

}

//funçao jogar novamente
function jogarNovamente() {
  jogar = true;//variável jogar volta a ser verdadeira
  //armazenamos todas as div na variável divis (getElementsByTagName)
  let divis = document.getElementsByTagName("div");
  //percorremos todas as divs armazenadas
  for (i = 0; i < divis.length; i++) {
    //verificamos se sao as divs com ids 0 ou 1 ou 2
    if (divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4 || divis[i].id == 5) {
      //alteramos a classe css das divs 0, 1 e 2 (className)
      divis[i].className = "inicial";
    }
  }

  //armazenamos a imagem do Smile na variável imagem (getElementById)
  let imagem = document.getElementById("imagem");
  //se a imagem nao for vazia (se ela existir)
  if (imagem != "") {
    //removemos a imagem do Smile
    imagem.remove();
  }
  //armazenamos a imagem do Sad emoji na variável imagem (getElementById)
  let imagem_errada = document.getElementById("imagem_erro");
  //se a imagem nao for vazia (se ela existir)
  if (imagem_errada != "") {
    //removemos a imagem do Sad
    imagem_errada.remove();
  }
}

//funçao que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  //calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  //escreve o placar com os valores atualizados (innerHTML)
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

}

//funçao executada quando o jogador acertou
function acertou(obj) {
  //altera a classe CSS da <div> escolhida pelo jogador (className)
  obj.className = "acertou";
  //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
  const img = new Image(100);
  img.id = "imagem";
  //altera o atributo src (source) da imagem criada
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
  obj.appendChild(img);


}

//Função que sorteia um número aleatório entre 1 e 5 e verifica se o jogador acertou
function verifica(obj) {
  //se jogar é verdadeiro
  if (jogar) {

    //jogar passa a ser false
    jogar = false;
    //incrementa as tentativas
    tentativas++;
    //Torna o botão Jogar Novamente visivel <div id="4" class="inicial" onclick="verifica(this)">2</div>
    btnJogarNovamente.className = 'visivel';


    //verifica se jogou 5 vezes
    //verifica se jogou 5 vezes
    if (tentativas == 5) {
      //oculta o botao joganovamente alterando a classe css (getElementById e className)
      btnJogarNovamente.className = 'invisivel';
      //mostra o botao reiniciar alterando a classe css (getElementById e className)
      btnReiniciar.className = 'visivel';

      // Verifica se o desempenho é 0%
      if (desempenho === 0) {
        document.body.classList.add('perdeu');
        somPerdeu.play();
        somPerdeu.currentTime = 0.2;
        somClique.pause()
      }
    }
    //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random) e acima de 0 (+1)
    let sorteado = Math.floor(Math.random() * 5) + 1;
    //se o id da <div> escolhida pelo jogador for igual ao número sorteado
    if (obj.id == sorteado) {
      //chama a funçao acertou passando a div escolhida pelo jogador
      acertou(obj);
      //incrementa o contador de acertos
      acertos++;
      // Efeito de confetes
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
      });
      somGanhou.play();
      somGanhou.currentTime = 0;
    } else {//se errou a tentativa
      //altera a classe da <div> escolhida pelo jogador para a classe errou
      obj.className = "errou";
      // cria uma const que armazena uma nova imagem
      const img_erro = new Image(100);
       img_erro.id = "imagem_erro";
      //toca o audio de erro
      somClique.play();
      //reinicia o som para o inicio
      somClique.currentTime = 0;
      //altera o atributo src (source) da imagem criada
      img_erro.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Fluent_Emoji_flat_1f625.svg/640px-Fluent_Emoji_flat_1f625.svg.png";
      //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
      obj.appendChild(img_erro);
      //armazena a div aonde Smile está escondido (getElementById)
      const objSorteado = document.getElementById(sorteado);
      //chama a funçao acertou para mostrar a div aonde está o Smile
      acertou(objSorteado);
    }
    //chama a funçao que atualiza o placar
    atualizaPlacar(acertos, tentativas);
  } else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
    alert('Clique em "Jogar novamente"');
  }
}

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);