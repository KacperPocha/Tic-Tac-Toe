//ZDARZENIE DLA PÓL
const fields = [...document.querySelectorAll('.field')];

fields.forEach(field => {
    field.addEventListener('click', click);
})
//POPUP
let popUp = document.getElementById("popUp")
let field = document.getElementById("window")
let player1Text = document.getElementById("player1Text")
let player2Text = document.getElementById("player2Text")
let player1Field = document.getElementById("player1Name")
let player2Field = document.getElementById("player2Name")
let buttonOP1 = document.getElementById("selectButtonOP1")
let buttonXP1 = document.getElementById("selectButtonXP1")
let buttonOP2 = document.getElementById("selectButtonOP2")
let buttonXP2 = document.getElementById("selectButtonXP2")
let tab = ['',''];
let symbolP1 = '';
let symbolP2 = '';


//PUNKTY
let pointsP1O = 0;
let pointsP1X = 0;
let pointsP2O = 0;
let pointsP2X = 0;

//GRA
const circle = '<img src="o.svg" alt="CIRCLE" class="symbols">';
const cross = '<img src="x.svg" alt="CROSS" class="symbols">';
let gameActive = true;
let result = document.getElementById("result");
let round = 0;

const cells = [
    "", "", "",
    "", "", "",
    "", "", ""
]

const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


//WYBÓR SYMBOLU
function OP1(){
    buttonOP2.style.backgroundColor = "white"
    buttonXP1.style.backgroundColor = "white"
    tab[1] = "X";
    tab[0] = "O"
    buttonXP2.style.backgroundColor = "rgba(159, 136, 136, 0.854)"
    buttonOP1.style.backgroundColor = "rgba(159, 136, 136, 0.854)"
}

function XP1(){
    buttonXP2.style.backgroundColor = "white"
    buttonOP1.style.backgroundColor = "white"
    tab[1] = "O";
    tab[0] = "X"
    buttonOP2.style.backgroundColor = "rgba(159, 136, 136, 0.854)"
    buttonXP1.style.backgroundColor = "rgba(159, 136, 136, 0.854)"
}

function OP2(){
    buttonXP2.style.backgroundColor = "white"
    buttonOP1.style.backgroundColor = "white"
    tab[1] = "O";
    tab[0] = "X"
    buttonOP2.style.backgroundColor = "rgba(159, 136, 136, 0.854)"
    buttonXP1.style.backgroundColor = "rgba(159, 136, 136, 0.854)"
}


function XP2(){
    buttonOP2.style.backgroundColor = "white"
    buttonXP1.style.backgroundColor = "white"
    tab[1] = "X";
    tab[0] = "O"
    buttonXP2.style.backgroundColor = "rgba(159, 136, 136, 0.854)"
    buttonOP1.style.backgroundColor = "rgba(159, 136, 136, 0.854)"
}

//POPUP
function submit(){
    let player1Nick = player1Field.value;
    let player2Nick = player2Field.value;
    if(tab[0] === "O"){
        symbolP1 = '<img src="o.svg" alt="CIRCLE" class="nickSymbol">';
        symbolP2 = '<img src="x.svg" alt="CROSS" class="nickSymbol">';
    }
    else if(tab[0] === "X"){
        symbolP1 = '<img src="x.svg" alt="CROSS" class="nickSymbol">';
        symbolP2 = '<img src="o.svg" alt="CIRCLE" class="nickSymbol">';
    }

    if(tab[0] !== '' && tab[1] !== '' && player1Nick !== '' && player2Nick !== '' ){
        popUp.style.display = "none";
        field.style = 'filter: blur(0px);'
        
        player1Text.innerHTML = symbolP1 + " " + player1Nick + " : " + "0";
        player2Text.innerHTML = symbolP2 + " " + player2Nick + " : " + "0";
    }
    else{
        alert("Nie podano nazwy gracza lub nie wybrano symbolu!!!");
    }
    
}

//DODAWANIE SYMBOLI DLA PÓL ORAZ LICZNIK RUND
function click(event){
    if(gameActive === true){
        
        let clickedField = event.target;
        
        const clickedIndex = parseInt(clickedField.getAttribute('data-index'))

        const turn = round % 2 === 0 ? cross : circle;

        if(cells[clickedIndex] === ""){
        cells[clickedIndex] = turn
        clickedField.innerHTML = turn;
        round++;
        }
        check(round);
    }

}

//SPRAWDZENIE KTO WYGRAŁ
function check() {
    let roundWon = false;
    let player1Nick = player1Field.value;
    let player2Nick = player2Field.value;
    for(let i in combinations){
        let winCondition = combinations[i];
        let a = cells[winCondition[0]]
        let b = cells[winCondition[1]]
        let c = cells[winCondition[2]]
        if(a === '' || b === '' || c === ''){
            continue;
        }
        if(a===b && b===c){
            fields[winCondition[0]].style.backgroundColor= "rgba(93, 65, 65, 0.854)";
            fields[winCondition[1]].style.backgroundColor= "rgba(93, 65, 65, 0.854)";
            fields[winCondition[2]].style.backgroundColor= "rgba(93, 65, 65, 0.854)";
            roundWon = true;
        }
        
    }
    let player = round % 2 === 0 ? "O" : "X";
    let winner = '';
    
if (roundWon) {
        gameActive = false;

        if(tab[0] === "X" && player === "X"){
            winner = player1Field.value;
            pointsP1X++;
        }
       
        if(tab[0] === "O" && player === "O"){
            winner = player1Field.value;
            pointsP1O++;
        }

        if(tab[1] === "O" && player === "O"){
            winner = player2Field.value;
            pointsP2O++;
        }

        if(tab[1] === "X" && player === "X"){
            winner = player2Field.value;
            pointsP2X++;
        }
    
        if(tab[0] === "O" && tab[1] === "X"){
        player1Text.innerHTML = symbolP1 + " " + player1Nick + " : " + pointsP1O;
        player2Text.innerHTML = symbolP2 + " " + player2Nick + " : " + pointsP2X;
        }

        else{
        player1Text.innerHTML = symbolP1 + " " + player1Nick + " : " + pointsP1X;
        player2Text.innerHTML = symbolP2 + " " + player2Nick + " : " + pointsP2O;
        }
        


        result.textContent = "Wygrał: " + winner + " " + player +"!";
        setTimeout(()=>{
            for(let i in cells){
            fields[i].innerHTML = "";
            cells[i] = "";
            fields[i].style.backgroundColor = "rgb(148, 148, 148)";
            gameActive = true;
            result.textContent = "";
            }
        }, 3000);
        return;
    }
    if(!cells.includes("")){
        gameActive = false;
        result.textContent = "Remis!";
        setTimeout(()=>{
            for(let i in cells){
            fields[i].innerHTML = "";
            cells[i] = "";
            fields[i].style.backgroundColor = "rgb(148, 148, 148)";
            gameActive = true;
            result.textContent = "";
            }
        }, 3000);
        return;
    }

   
    
}


