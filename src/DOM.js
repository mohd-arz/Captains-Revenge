function GridCreation(gameBoard, container) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const div = document.createElement('div');
      div.dataset.row = i;
      div.dataset.col = j;
      if (container.className == 'pc-container') {
        if (gameBoard.board[i][j] == 'miss' || gameBoard.board[i][j] == 'hit') { div.textContent = gameBoard.board[i][j]; }
      } else if (gameBoard.board[i][j] != '') {
        div.className = 'ship';
      }
      container.append(div);
    }
  }
}

function calling(gameBoard, gameBoardPC, player, pc) {
  const divs = [...document.querySelectorAll('.pc-container > div')];
  divs.forEach((div) => {
    div.addEventListener('click', (e) => {
      const status = document.querySelector('.status');
      if (gameBoard.allSunkFn() === false && gameBoardPC.allSunkFn() === false && (gameBoardPC.board[e.target.dataset.row][e.target.dataset.col] != 'hit' && gameBoardPC.board[e.target.dataset.row][e.target.dataset.col] != 'miss')) {
        status.textContent = "Don't let up! Press the attack!";

        gameBoardPC.receiveAttack(e.target.dataset.row, e.target.dataset.col, pc);
        const res = gameBoardPC.board[e.target.dataset.row][e.target.dataset.col];

        if (res == 'hit') {
          e.target.classList.add('hit');
        }
        if (res == 'miss') {
          e.target.classList.add('miss');
        }

        if (gameBoardPC.allSunkFn()) {
          player.winStatus = true;
          status.textContent = `${player.name} won`;
          return;
        }

        setTimeout(() => {
          let m; let n; let pcres;
          do {
            console.log('No of while running');
            m = Math.floor(Math.random() * 10);
            n = Math.floor(Math.random() * 10);
            pcres = gameBoard.receiveAttack(m, n, player);
          } while (!pcres);

          const playerdiv = [...document.querySelectorAll('.player-container > div')];
          pcres = gameBoard.board[m][n];
          playerdiv.forEach((div) => {
            if (div.dataset.row == m && div.dataset.col == n) {
              if (pcres == 'hit' || pcres == 'Sunk') {
                div.classList.add('hit');
              }
              if (pcres === 'miss') {
                div.classList.add('miss');
              }
            }
          });
          if (gameBoard.allSunkFn()) {
            pc.winStatus = true;
            status.textContent = `${pc.name} won`;
          }
        }, 400);
      }
    });
  });
}

export { calling, GridCreation };
