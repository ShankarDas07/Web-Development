const board = document.querySelector('.board'); // getElementById শুধু id নেয় (without #), আর querySelector CSS selector নেয় class, id, tag, attribute — সব support করে


        // 2D matrix or board only winning combination
let turn = 'O';
const board_array = new Array(9).fill("E");
let totalTurn = 0 ;
let winner = [ // 2d array
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

        // 2D matrix or board winning combination cheek with index
function cheekWinner(){
            // 0    1   2 --> 0th index
            // 3    4   5 --> 1 index
            // 0    4   8 --> 7th index
    for(let [idx0,idx1,idx2] of winner){  // 3 value(int 1d array) can be fetch from winner 2d array 
        if(board_array[idx0]!="E" && board_array[idx0] === board_array[idx1] && board_array[idx1] === board_array[idx2]){
            return 1;
        }
    }
}
        // player can be move or big when tap boxes 
function updatePlayerUI(){
    const playerO = document.querySelector('.oo1');
    const playerX = document.querySelector('.xx1');

    playerO.classList.remove('active-player');
    playerX.classList.remove('active-player');

    if(turn === 'O'){
        playerO.classList.add('active-player');
    }else{
        playerX.classList.add('active-player');
    }
}



        // How to Board Work like 'O' & 'X'
const logic = (event)=>{
    console.log(event.target.id);
    const ele = event.target;
    
    
    if(board_array[ele.id]==="E"){
        totalTurn++;
        if(turn === 'O'){
            ele.innerHTML = 'O';
            board_array[ele.id] = "O"
            if(cheekWinner()){
                document.getElementById("WinMassage").innerHTML = "Winner is O";
                board.removeEventListener('click',logic);
                return;
            }
            turn = 'X';
            updatePlayerUI();
        }
        else{ 
            ele.innerHTML = 'X';
            board_array[ele.id] = "X"
            if(cheekWinner()){
                document.getElementById("WinMassage").innerHTML = "Winner is X";
                board.removeEventListener('click',logic);
                return;
            }
            turn = 'O';
            updatePlayerUI();
        }
    }

    if(totalTurn == 9) document.getElementById("WinMassage").innerHTML = "Match is Draw";
        
}

board.addEventListener('click',logic); // ata nicha likta hoba



            // Reset Button Working Logic
const restart = document.querySelector('.but');

restart.addEventListener('click', () => {
    const child = document.getElementsByClassName('child');

    Array.from(child).forEach((element) => {
        element.innerHTML = "";
    });

    totalTurn = 0;
    turn = "O";
    document.getElementById("WinMassage").innerHTML = "";
    updatePlayerUI();
    board_array.fill("E");
    board.addEventListener('click',logic);
});
