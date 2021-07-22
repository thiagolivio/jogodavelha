const celulas = document.querySelectorAll(".celula")
let checarTurno = true;

const player_x = "X";
const player_o = "O";

const comb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

document.addEventListener("click", (event) => {
    if(event.target.matches(".celula")){
        jogar(event.target.id);
          
    }
});


function jogar(id){
    const celula = document.getElementById(id);
    turno = checarTurno ? player_x : player_o;
    celula.textContent = turno;
    celula.classList.add(turno);
    checkWinner(turno);
}

function checkWinner(){
    const vencedor = comb.some((cb) => {
        return cb.every((index) => {
            return celulas[index].classList.contains(turno);
        })
    });
    
    if(vencedor){
        finishGame(turno);
    } else if(checkDraw()) {
        finishGame();
    } else{        
        checarTurno = !checarTurno;
    }    
}

function checkDraw(){
    let x = 0;
    let o = 0;

    for(index in celulas){
        if(!isNaN(index)){

            if(celulas[index].classList.contains(player_x)){
                x++
            }
            if(celulas[index].classList.contains(player_o)){
                o++
            }
        }
        
    }
    return x + o === 9 ? true : false;
} 

function finishGame(vencedor = null) {
    const screen = document.getElementById('screen');
    const h2 = document.createElement("h2")
    const h3 = document.createElement("h3")
    let mensagem = null;
    
    screen.style.display = "block";
    screen.appendChild(h2);
    screen.appendChild(h3);
    
    if (vencedor) {
        h2.innerHTML = `O Player <span>${vencedor}</span> venceu`;
    } else {
        h2.innerHTML = 'Empatou';
    }

    let contador = 3;
    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${contador--}`;
    }, 1000)
    setTimeout(() => location.reload(), 4000);
}
