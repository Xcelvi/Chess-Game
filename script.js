// setting randoms values to peices for easier code
turn = 100
whiteTurn = 100
blackTurn = 200
bpawn = 1
wpawn = 2
knight = 3
lightBishop = 4
darkBishop = 5
rook = 6
queen = 7
king = 8

allPieces = ['black rook1', 'black rook2', 'black knight1', 'black lightBishop', 'black queen', 'black king', 'black darkBishop', 'black knight2', 'black bp1', 'black bp2', 'black bp3', 'black bp4', 'black bp5', 'black bp6', 'black bp7', 'black bp8',
'white rook1', 'white rook2', 'white knight1', 'white lightBishop', 'white queen', 'white king', 'white darkBishop', 'white knight2', 'white wp1', 'white wp2', 'white wp3', 'white wp4', 'white wp5', 'white wp6', 'white wp7', 'white wp8']


let numberPieces = 32
let currentNumberOfPieces = []
let takenPieces = []
//Not sure yet if I will use this, but this is the starting position based on the values above, 0 being an empty square
var startingPosition = [6,9,4,7,8,5,3,6,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,6,3,5,7,8,4,9,6]

var moveLog = []

// I did not know how to handle edge cases, so I listed out the light squares to prevent glitches
const lightSquares = [1, 3, 5, 7, 10, 12, 14, 16, 17, 19, 21, 23, 26, 28, 30, 32, 33, 35, 37, 39, 42, 44, 46, 48, 49, 51, 53, 55, 58, 60, 62, 64]
// Establishing each row so the rook cannot wrap around the board
const row1 = [1,2,3,4,5,6,7,8]
const row2 = [9,10,11,12,13,14,15,16]
const row3 = [17,18,19,20,21,22,23,24]
const row4 = [25,26,27,28,29,30,31,32]
const row5 = [33,34,35,36,37,38,39,40]
const row6 = [41,42,43,44,45,46,47,48]
const row7 = [49,50,51,52,53,54,55,56]
const row8 = [57,58,59,60,61,62,63,64]
//Added the edge of the board, will use this to prevent the king from wrapping around the board when moving. Most likely will use this for pawns taking as well
boardEdge = [1, 9, 17, 25, 33, 41, 49, 57, 8, 16, 24, 32, 40, 48, 56, 64]
leftEdge = [1, 9, 17, 25, 33, 41, 49, 57]
rightEdge = [8, 16, 24, 32, 40, 48, 56, 64]

const squares = document.querySelectorAll('.chess_square'); 

//Mapping all of the images to their pieces
document.addEventListener("DOMContentLoaded", function () {
    // Define a mapping of piece names to image ids
    const pieceToImageMap = {
        'black rook1': 'floating_piece_black_rook1',
        'black rook2': 'floating_piece_black_rook2',
        'black knight1': 'floating_piece_black_knight2',
        'black lightBishop': 'floating_piece_black_bishop',
        'black queen': 'floating_piece_black_queen',
        'black king': 'floating_piece_black_king',
        'black darkBishop': 'floating_piece_black_bishop2',
        'black knight2': 'floating_piece_black_knight1',
        
        'white rook1': 'floating_piece_white_rook1',
        'white rook2': 'floating_piece_white_rook2',
        'white knight2': 'floating_piece_white_knight2',
        'white lightBishop': 'floating_piece_white_bishop',
        'white queen': 'floating_piece_white_queen',
        'white king': 'floating_piece_white_king',
        'white darkBishop': 'floating_piece_white_bishop2',
        'white knight1': 'floating_piece_white_knight1',

        'black bp1': 'floating_piece_black_pawn1',
        'white wp1': 'floating_piece_white_pawn1',

        'black bp2': 'floating_piece_black_pawn2',
        'white wp2': 'floating_piece_white_pawn2',
        'black bp3': 'floating_piece_black_pawn3',
        'white wp3': 'floating_piece_white_pawn3',
        'black bp4': 'floating_piece_black_pawn4',
        'white wp4': 'floating_piece_white_pawn4',
        'black bp5': 'floating_piece_black_pawn5',
        'white wp5': 'floating_piece_white_pawn5',
        'black bp6': 'floating_piece_black_pawn6',
        'white wp6': 'floating_piece_white_pawn6',
        'black bp7': 'floating_piece_black_pawn7',
        'white wp7': 'floating_piece_white_pawn7',
        'black bp8': 'floating_piece_black_pawn8',
        'white wp8': 'floating_piece_white_pawn8',
    };
    const divs = document.querySelectorAll('.chess_square');

    //Gets each square, then assigns the pieceName to each squares content
    divs.forEach(div => {
        const pieceName = div.textContent
        if (!pieceName) return;
        //Gets each imageId
        const imageId = pieceToImageMap[pieceName];

        if (imageId) {
            const img = document.getElementById(imageId); 

            //Img has each img src alt ect=
            if (img) {
                let rect = div.getBoundingClientRect(); 
                // Position the image to match the square
                img.style.position = "absolute";
                img.style.left = `${rect.left + window.scrollX}px`;
                img.style.top = `${rect.top + window.scrollY}px`;
                img.style.width = `${rect.width}px`; // Set image size to match the square
                img.style.height = `${rect.height}px`; // Set image size to match the square
                img.style.pointerEvents = "none"; // Allow clicks to pass through the image
            }
        }
    });
});

document.addEventListener("mouseup", function () {
    // Define a mapping of piece names to image ids
    const pieceToImageMap = {
        'black rook1': 'floating_piece_black_rook1',
        'black rook2': 'floating_piece_black_rook2',
        'black knight1': 'floating_piece_black_knight2',
        'black lightBishop': 'floating_piece_black_bishop',
        'black queen': 'floating_piece_black_queen',
        'black king': 'floating_piece_black_king',
        'black darkBishop': 'floating_piece_black_bishop2',
        'black knight2': 'floating_piece_black_knight1',
        
        'white rook1': 'floating_piece_white_rook1',
        'white rook2': 'floating_piece_white_rook2',
        'white knight2': 'floating_piece_white_knight2',
        'white lightBishop': 'floating_piece_white_bishop',
        'white queen': 'floating_piece_white_queen',
        'white king': 'floating_piece_white_king',
        'white darkBishop': 'floating_piece_white_bishop2',
        'white knight1': 'floating_piece_white_knight1',

        'black bp1': 'floating_piece_black_pawn1',
        'white wp1': 'floating_piece_white_pawn1',

        'black bp2': 'floating_piece_black_pawn2',
        'white wp2': 'floating_piece_white_pawn2',
        'black bp3': 'floating_piece_black_pawn3',
        'white wp3': 'floating_piece_white_pawn3',
        'black bp4': 'floating_piece_black_pawn4',
        'white wp4': 'floating_piece_white_pawn4',
        'black bp5': 'floating_piece_black_pawn5',
        'white wp5': 'floating_piece_white_pawn5',
        'black bp6': 'floating_piece_black_pawn6',
        'white wp6': 'floating_piece_white_pawn6',
        'black bp7': 'floating_piece_black_pawn7',
        'white wp7': 'floating_piece_white_pawn7',
        'black bp8': 'floating_piece_black_pawn8',
        'white wp8': 'floating_piece_white_pawn8',
    };

    const divs = document.querySelectorAll('.chess_square')
    divs.forEach(div => {
        let pieceName
        if (divs.textContent !== ""){
            pieceName = div.textContent
        }
        const imageId = pieceToImageMap[pieceName];
        currentNumberOfPieces.push(pieceName)
        })
    const pieceToRemove = ""

    currentNumberOfPieces = currentNumberOfPieces.filter(piece =>piece !== pieceToRemove)
    let takenPiece
    for (const piece in allPieces){
        let thisPiece = allPieces[piece]
        if (!currentNumberOfPieces.includes(thisPiece)){
            if (!takenPieces.includes(thisPiece)){
                takenPieces.push(thisPiece)
                takenPiece = thisPiece
            }
        }
    }

    const imageId = pieceToImageMap[takenPiece];

    if (imageId) {
        const img = document.getElementById(imageId);
        if (img){
            img.style.display = "none";
        }

    }

    console.log(imageId)
    currentNumberOfPieces = []
});

document.addEventListener("mouseup", function () {
    // Define a mapping of piece names to image ids
    const pieceToImageMap = {
        'black rook1': 'floating_piece_black_rook1',
        'black rook2': 'floating_piece_black_rook2',
        'black knight1': 'floating_piece_black_knight2',
        'black lightBishop': 'floating_piece_black_bishop',
        'black queen': 'floating_piece_black_queen',
        'black king': 'floating_piece_black_king',
        'black darkBishop': 'floating_piece_black_bishop2',
        'black knight2': 'floating_piece_black_knight1',
        
        'white rook1': 'floating_piece_white_rook1',
        'white rook2': 'floating_piece_white_rook2',
        'white knight2': 'floating_piece_white_knight2',
        'white lightBishop': 'floating_piece_white_bishop',
        'white queen': 'floating_piece_white_queen',
        'white king': 'floating_piece_white_king',
        'white darkBishop': 'floating_piece_white_bishop2',
        'white knight1': 'floating_piece_white_knight1',

        'black bp1': 'floating_piece_black_pawn1',
        'white wp1': 'floating_piece_white_pawn1',

        'black bp2': 'floating_piece_black_pawn2',
        'white wp2': 'floating_piece_white_pawn2',
        'black bp3': 'floating_piece_black_pawn3',
        'white wp3': 'floating_piece_white_pawn3',
        'black bp4': 'floating_piece_black_pawn4',
        'white wp4': 'floating_piece_white_pawn4',
        'black bp5': 'floating_piece_black_pawn5',
        'white wp5': 'floating_piece_white_pawn5',
        'black bp6': 'floating_piece_black_pawn6',
        'white wp6': 'floating_piece_white_pawn6',
        'black bp7': 'floating_piece_black_pawn7',
        'white wp7': 'floating_piece_white_pawn7',
        'black bp8': 'floating_piece_black_pawn8',
        'white wp8': 'floating_piece_white_pawn8',
    };
    const divs = document.querySelectorAll('.chess_square');  // Replace 'your-class-name' with the class you're targeting
    
    divs.forEach(div => {
        const pieceName = div.textContent
        const imageId = pieceToImageMap[pieceName];

        if (imageId) {
            const img = document.getElementById(imageId); // Get image by id
            
            if (img) {
                let rect = div.getBoundingClientRect(); // Get the position of the square
    
                // Position the image to match the square
                img.style.position = "absolute";
                img.style.left = `${rect.left + window.scrollX}px`;
                img.style.top = `${rect.top + window.scrollY}px`;
                img.style.width = `${rect.width}px`; // Set image size to match the square
                img.style.height = `${rect.height}px`; // Set image size to match the square
                img.style.pointerEvents = "none"; // Allow clicks to pass through the image
            }
        }
    });
});

squares.forEach(square => {
    square.addEventListener('mousedown', (e) => mouseDown(e, square));
});

let otherPiece = 0
let currentPiece = 0
let classSquare;
let currentSquare;
let pieceSquare;

function mouseDown(e, square) {



    //On a mouse click, it assigns the currentSquare to whatever square was clicked
    currentSquare = parseInt(square.classList[0].match(/\d+/)[0]);
    console.log('Current square:', currentSquare)
    // if the peice is a black pawn, it stores the piece and the square the black pawn is on.
    //checking if it is blacks turn
    if (turn === blackTurn && square.textContent.includes('black')){
        if (square.textContent.includes("bp")) {
            currentPiece = parseInt(bpawn);
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes("wp")) {
            currentPiece = parseInt(wpawn);
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes("lightBishop")) {
            currentPiece = parseInt(lightBishop);
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes("darkBishop")) {
            currentPiece = parseInt(darkBishop);
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes("knight")) {
            currentPiece = parseInt(knight);
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes('rook')) {
            currentPiece = parseInt(rook)
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes('king')) {
            currentPiece= parseInt(king)
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes('queen')) {
            currentPiece= parseInt(queen)
            pieceSquare = parseInt(currentSquare)
        } 
        //Checking if it is whites turn
    } else if (turn === whiteTurn && square.textContent.includes('white')){
        if (square.textContent.includes("bp")) {
            currentPiece = parseInt(bpawn);
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes("wp")) {
            currentPiece = parseInt(wpawn);
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes("lightBishop")) {
            currentPiece = parseInt(lightBishop);
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes("darkBishop")) {
            currentPiece = parseInt(darkBishop);
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes("knight")) {
            currentPiece = parseInt(knight);
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes('rook')) {
            currentPiece = parseInt(rook)
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes('king')) {
            currentPiece= parseInt(king)
            pieceSquare = parseInt(currentSquare)
        }
        if (square.textContent.includes('queen')) {
            currentPiece= parseInt(queen)
            pieceSquare = parseInt(currentSquare)
        } 
    }
}
document.addEventListener('mouseup', handleQueenMove)
document.addEventListener('mouseup', handleKingMove)
document.addEventListener('mouseup', handleRookMove)
document.addEventListener('mouseup', handleDarkKnightMove)
document.addEventListener('mouseup', handleLightBishopMove)
document.addEventListener('mouseup', handleDarkBishopMove)
document.addEventListener('mouseup', handleBPawnMove)
document.addEventListener('mouseup', handleWPawnMove)



function handleQueenMove() {
    //Queen moves
    document.addEventListener('mousedown', () => {
        if (currentPiece === queen){ 
            if (((Math.abs(pieceSquare - currentSquare) % 7) === 0 || 
            (Math.abs(pieceSquare - currentSquare) % 9) === 0) && 
            (pieceSquare - currentSquare) != 0 && 
            (lightSquares.includes(currentSquare))){
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let columnMove 
                let rowMove
                let movement
                let checkingSquare = pieceSquare

                //See if it is moving up or down the board
                if ((pieceSquare - currentSquare) > 0) {
                    columnMove = -1
                } else if ((pieceSquare - currentSquare) < 0) {
                    columnMove = 1
                }
                //see if it is moving left or right on the board
                if (Math.abs(pieceSquare - currentSquare) % 7) {
                    rowMove = 9
                } else if (Math.abs(pieceSquare - currentSquare) % 9){
                    rowMove = 7
                }
                //Multiply them to get if the movement is positive or negative, and which direction. 
                //Left up is -9
                //left down is +7
                //Right down is +9
                //Right up is -7
                movement = columnMove * rowMove
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += movement
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('queen to ', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('queen to ', currentSquare)
                    }
                }
            } else if ((Math.abs(pieceSquare - currentSquare) % 8) === 0 && 
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -8 : 8;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('queen to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('queen to ', currentSquare)
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white queen from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('queen to ', currentSquare)
                    }
                }
            } else if ((row2.includes(pieceSquare) && row2.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white queen from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('queen to ', currentSquare)
                    }
                }
            }else if ((row3.includes(pieceSquare) && row3.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white queen from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('queen to ', currentSquare)
                    }
                }
            }else if ((row4.includes(pieceSquare) && row4.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white queen from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('queen to ', currentSquare)
                    }
                }
            }else if ((row5.includes(pieceSquare) && row5.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white queen from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('queen to ', currentSquare)
                    }
                }
            }else if ((row6.includes(pieceSquare) && row6.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white queen from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('queen to ', currentSquare)
                    }
                }
            }else if ((row7.includes(pieceSquare) && row7.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white queen from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('queen to ', currentSquare)
                    }
                }
            }else if ((row8.includes(pieceSquare) && row8.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white queen from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('black queen from', oldSquare, 'to', currentSquare)
                    }
                }
            } else if (((Math.abs(pieceSquare - currentSquare) % 7) === 0 || 
            (Math.abs(pieceSquare - currentSquare) % 9) === 0) && 
            (pieceSquare - currentSquare) != 0 && 
            (!lightSquares.includes(currentSquare))){
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let columnMove 
                let rowMove
                let movement
                let checkingSquare = pieceSquare

                //See if it is moving up or down the board
                if ((pieceSquare - currentSquare) > 0) {
                    columnMove = -1
                } else if ((pieceSquare - currentSquare) < 0) {
                    columnMove = 1
                }
                //see if it is moving left or right on the board
                if (Math.abs(pieceSquare - currentSquare) % 7) {
                    rowMove = 9
                } else if (Math.abs(pieceSquare - currentSquare) % 9){
                    rowMove = 7
                }
                //Multiply them to get if the movement is positive or negative, and which direction. 
                //Left up is -9
                //left down is +7
                //Right down is +9
                //Right up is -7
                movement = columnMove * rowMove
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += movement
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white queen"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('queen to ', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black queen"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('queen to ', currentSquare)
                    }
                }
            }
        }
    })
}
function handleKingMove () {
    //King moves
    document.addEventListener('mousedown', () => {
        //checks if piece is king
        if(currentPiece === king) {
            if (((Math.abs(pieceSquare - currentSquare) === 8) ||
            (Math.abs(pieceSquare - currentSquare) === 7) ||
            (Math.abs(pieceSquare - currentSquare) === 1) ||
            (Math.abs(pieceSquare - currentSquare) === 9)) &&
            (!boardEdge.includes(pieceSquare))){
                let oldSquare = document.querySelector('.c' + pieceSquare)
                // Get rid of the pawn for the old square
                if (oldSquare.textContent.includes('white')){
                    oldSquare.textContent = ""
                    let newSquare = document.querySelector('.c' + currentSquare)
                    // adds the pieces to the currently clicked square
                    newSquare.textContent = "white king"
                    currentPiece = 0
                    turn = turn + 100
                    moveLog.push('king to ', currentSquare)
                } else if (oldSquare.textContent.includes('black')){
                    oldSquare.textContent = ""
                    let newSquare = document.querySelector('.c' + currentSquare)
                    // adds the pieces to the currently clicked square
                    newSquare.textContent = "black king"
                    currentPiece = 0
                    turn = turn - 100
                    moveLog.push('king to ', currentSquare)
                }
            } else if (leftEdge.includes(pieceSquare)) {
                if ((pieceSquare - currentSquare) === 7 ||
                (pieceSquare - currentSquare) === -1 ||
                (pieceSquare - currentSquare) === -9 || 
                Math.abs(pieceSquare - currentSquare) === 8) {
                    let oldSquare = document.querySelector('.c' + pieceSquare)
                // Get rid of the pawn for the old square
                if (oldSquare.textContent.includes('white')){
                    oldSquare.textContent = ""
                    let newSquare = document.querySelector('.c' + currentSquare)
                    // adds the pieces to the currently clicked square
                    newSquare.textContent = "white king"
                    currentPiece = 0
                    turn = turn + 100
                    moveLog.push('king to ', currentSquare)
                } else if (oldSquare.textContent.includes('black')){
                    oldSquare.textContent = ""
                    let newSquare = document.querySelector('.c' + currentSquare)
                    // adds the pieces to the currently clicked square
                    newSquare.textContent = "black king"
                    currentPiece = 0
                    turn = turn - 100
                    moveLog.push('king to ', currentSquare)
                }
            } 
            } else if (rightEdge.includes(pieceSquare)) {
                if ((pieceSquare - currentSquare) === -7 ||
                (pieceSquare - currentSquare) === 1 ||
                (pieceSquare - currentSquare) === 9 || 
                Math.abs(pieceSquare - currentSquare) === 8) {
                    let oldSquare = document.querySelector('.c' + pieceSquare)
                // Get rid of the pawn for the old square
                if (oldSquare.textContent.includes('white')){
                    oldSquare.textContent = ""
                    let newSquare = document.querySelector('.c' + currentSquare)
                    // adds the pieces to the currently clicked square
                    newSquare.textContent = "white king"
                    currentPiece = 0
                    turn = turn + 100
                    moveLog.push('king to ', currentSquare)
                } else if (oldSquare.textContent.includes('black')){
                    oldSquare.textContent = ""
                    let newSquare = document.querySelector('.c' + currentSquare)
                    // adds the pieces to the currently clicked square
                    newSquare.textContent = "black king"
                    currentPiece = 0
                    turn = turn - 100
                    moveLog.push('king to ', currentSquare)
                }
                currentPiece = 0
                } else if ((Math.abs(pieceSquare - currentSquare) % 8) === 0 && 
                (pieceSquare - currentSquare) != 0) {
                    let oldSquare = document.querySelector('.c' + pieceSquare)
                    // Get rid of the pawn for the old square
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white king"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('king to ', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black king"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('king to ', currentSquare)
                    }
                } 
            }

        }


    })
}
function handleRookMove () {
    // Rook moves
    document.addEventListener('mousedown', () => {
    //checks if peice is a rook
        if (currentPiece === rook) {
            if ((Math.abs(pieceSquare - currentSquare) % 8) === 0 && 
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -8 : 8;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white rook from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('black rook from', oldSquare, 'to', currentSquare)
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white rook from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('black rook from', oldSquare, 'to', currentSquare)
                    }
                }
            } else if ((row2.includes(pieceSquare) && row2.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white rook from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('black rook from', oldSquare, 'to', currentSquare)
                    }
                }
            }else if ((row3.includes(pieceSquare) && row3.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white rook from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('black rook from', oldSquare, 'to', currentSquare)
                    }
                }
            }else if ((row4.includes(pieceSquare) && row4.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white rook from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('black rook from', oldSquare, 'to', currentSquare)
                    }
                }
            }else if ((row5.includes(pieceSquare) && row5.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white rook from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('black rook from', oldSquare, 'to', currentSquare)
                    }
                }
            }else if ((row6.includes(pieceSquare) && row6.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white rook from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('black rook from', oldSquare, 'to', currentSquare)
                    }
                }
            }else if ((row7.includes(pieceSquare) && row7.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white rook from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('black rook from', oldSquare, 'to', currentSquare)
                    }
                }
            }else if ((row8.includes(pieceSquare) && row8.includes(currentSquare)) &&
            (pieceSquare - currentSquare) != 0) {
                // Get rid of the pawn for the old square
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let rowMove = pieceSquare > currentSquare ? -1 : 1;
                let checkingSquare = pieceSquare
                
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += rowMove
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                    oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('white rook from', oldSquare, 'to', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('black rook from', oldSquare, 'to', currentSquare)
                    }
                }
            }
        }
    })
}
function handleDarkKnightMove () {
    //Dark knight piece move
    document.addEventListener ('mousedown', () => {
        //checks if piece is a dark knight

        let element = document.querySelector('.c' + currentSquare)
        let backgroundColorCurrentSquare = window.getComputedStyle(element).backgroundColor;
        let element2 = document.querySelector('.c' + pieceSquare)
        let backgroundColorPieceSquare = window.getComputedStyle(element2).backgroundColor;
        let newSquare = document.querySelector('.c' + currentSquare)

        if (currentPiece === knight) {
            if (backgroundColorPieceSquare === 'rgb(88, 68, 41)'){
                if ((Math.abs(pieceSquare - currentSquare) === 17 || 
                Math.abs(pieceSquare - currentSquare) === 15 || 
                Math.abs(pieceSquare - currentSquare) === 6 || 
                Math.abs(pieceSquare - currentSquare) === 10) && 
                (backgroundColorCurrentSquare === 'rgb(154, 126, 88)')) {
                    let oldSquare = document.querySelector('.c' + pieceSquare)
                    // Get rid of the pawn for the old square
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('knight to ', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('knight to ', currentSquare)
                    }
            }        
            } else if ((Math.abs(pieceSquare - currentSquare) === 17 || 
            Math.abs(pieceSquare - currentSquare) === 15 || 
            Math.abs(pieceSquare - currentSquare) === 6 || 
            Math.abs(pieceSquare - currentSquare) === 10) && 
            (backgroundColorCurrentSquare === 'rgb(88, 68, 41)')) {
                let oldSquare = document.querySelector('.c' + pieceSquare)
                // Get rid of the pawn for the old square
                if (oldSquare.textContent.includes('white')){
                    // adds the pieces to the currently clicked square
                    newSquare.textContent = oldSquare.textContent
                    oldSquare.textContent = ""
                    currentPiece = 0
                    turn = turn + 100
                    moveLog.push('knight to ', currentSquare)
                } else if (oldSquare.textContent.includes('black')){
                    // adds the pieces to the currently clicked square
                    newSquare.textContent = oldSquare.textContent
                    oldSquare.textContent = ""
                    currentPiece = 0
                    turn = turn - 100
                    moveLog.push('knight to ', currentSquare)
                }
            }
        }
    });
}
function handleLightBishopMove () {
// bishop light piece move
    document.addEventListener ('mousedown', () => {
        //checks if piece is a bishop and if it stays on the light squares
        if (currentPiece === lightBishop) {
            if (((Math.abs(pieceSquare - currentSquare) % 7) === 0 || 
            (Math.abs(pieceSquare - currentSquare) % 9) === 0) && 
            (pieceSquare - currentSquare) != 0 && 
            (lightSquares.includes(currentSquare))){
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let columnMove 
                let rowMove
                let movement
                let checkingSquare = pieceSquare

                //See if it is moving up or down the board
                if ((pieceSquare - currentSquare) > 0) {
                    columnMove = -1
                } else if ((pieceSquare - currentSquare) < 0) {
                    columnMove = 1
                }
                //see if it is moving left or right on the board
                if (Math.abs(pieceSquare - currentSquare) % 7) {
                    rowMove = 9
                } else if (Math.abs(pieceSquare - currentSquare) % 9){
                    rowMove = 7
                }
                //Multiply them to get if the movement is positive or negative, and which direction. 
                //Left up is -9
                //left down is +7
                //Right down is +9
                //Right up is -7
                movement = columnMove * rowMove
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += movement
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white lightBishop"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('bishop to ', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black lightBishop"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('bishop to ', currentSquare)
                    }
                }
            }
        }
    });
}
function handleDarkBishopMove () {
    // dark bishop piece move
    document.addEventListener ('mousedown', () => {
        //checks if piece is a bishop and if it stays on the dark squares
        if (currentPiece === darkBishop) {
            if (((Math.abs(pieceSquare - currentSquare) % 7) === 0 || 
            (Math.abs(pieceSquare - currentSquare) % 9) === 0) && 
            (pieceSquare - currentSquare) != 0 && 
            (!lightSquares.includes(currentSquare))){
                let oldSquare = document.querySelector('.c' + pieceSquare)
                let pathClear = true
                let columnMove 
                let rowMove
                let movement
                let checkingSquare = pieceSquare

                //See if it is moving up or down the board
                if ((pieceSquare - currentSquare) > 0) {
                    columnMove = -1
                } else if ((pieceSquare - currentSquare) < 0) {
                    columnMove = 1
                }
                //see if it is moving left or right on the board
                if (Math.abs(pieceSquare - currentSquare) % 7) {
                    rowMove = 9
                } else if (Math.abs(pieceSquare - currentSquare) % 9){
                    rowMove = 7
                }
                //Multiply them to get if the movement is positive or negative, and which direction. 
                //Left up is -9
                //left down is +7
                //Right down is +9
                //Right up is -7
                movement = columnMove * rowMove
                // Loops through the pathway being attempted, and sees if any of the squares are not clear
                let nextSquare = document.querySelector('.c' + currentSquare)
                while (checkingSquare !== currentSquare){
                    checkingSquare += movement
                    let square = document.querySelector('.c' + checkingSquare)
                    if (square.textContent !== ""){
                        pathClear = false;
                        break;
                    }
                }
                //If the square that the code determined is the same as the square clicked on, it checks if the square is takeable
                if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('black'))&& 
                oldSquare.textContent.includes('white')) {
                    pathClear = true;
                } else if ((checkingSquare === currentSquare)&&
                (nextSquare.textContent.includes('white'))&& 
                oldSquare.textContent.includes('black')) {
                    pathClear = true;
                }      
                if (pathClear === true){
                    if (oldSquare.textContent.includes('white')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "white darkBishop"
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('bishop to ', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        oldSquare.textContent = ""
                        let newSquare = document.querySelector('.c' + currentSquare)
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = "black darkBishop"
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('bishop to ', currentSquare)
                    }
                }
            }
        }
    });
}
function handleBPawnMove () {
    // bpawn piece move
    document.addEventListener ('mousedown',  () => { 
        //checks if the pawn is on the home row
        if (currentPiece === bpawn){
            if (9 <= pieceSquare && pieceSquare <= 16) {
                let newSquare = document.querySelector('.c' + currentSquare)
                //Checks if given square is one or two places in front of the pawn
                if (newSquare.textContent === ""){
                    if (currentSquare === (pieceSquare + 8) || currentSquare === (pieceSquare + 16)) {
                        let oldSquare = document.querySelector('.c' + pieceSquare)
                        // Get rid of the pawn for the old square
                        if (oldSquare.textContent.includes('white')){
                            // adds the pieces to the currently clicked square
                            newSquare.textContent = oldSquare.textContent
                            oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn + 100
                            moveLog.push('pawn to ', currentSquare)
                        } else if (oldSquare.textContent.includes('black')){
                            // adds the pieces to the currently clicked square
                            newSquare.textContent = oldSquare.textContent
                            oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn - 100
                            moveLog.push('pawn to ', currentSquare)
                        }
                    }
                } else if (((currentSquare === (pieceSquare + 7) ||
                currentSquare === (pieceSquare + 9)))){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    let oldSquare = document.querySelector('.c' + pieceSquare)
                    // Get rid of the pawn for the old square
                    if (newSquare.textContent.includes('white')) {
                        if (oldSquare.textContent.includes('white')){
                           // adds the pieces to the currently clicked square
                           newSquare.textContent = oldSquare.textContent
                           oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn + 100
                            moveLog.push('pawn to ', currentSquare)
                        } else if (oldSquare.textContent.includes('black')){
                            // adds the pieces to the currently clicked square
                            newSquare.textContent = oldSquare.textContent
                            oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn - 100
                            moveLog.push('pawn to ', currentSquare)
                        }
                    }
                }
            // checks if the piece selected is a pawn
            } else if (currentSquare === (pieceSquare + 8)) {
                let newSquare = document.querySelector('.c' + currentSquare)
                if (newSquare.textContent === ""){
                    let oldSquare = document.querySelector('.c' + pieceSquare)
                    // Get rid of the pawn for the old square
                    if (oldSquare.textContent.includes('white')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn + 100
                        moveLog.push('pawn to ', currentSquare)
                    } else if (oldSquare.textContent.includes('black')){
                        // adds the pieces to the currently clicked square
                        newSquare.textContent = oldSquare.textContent
                        oldSquare.textContent = ""
                        currentPiece = 0
                        turn = turn - 100
                        moveLog.push('pawn to ', currentSquare)
                    }
                }
                } else if (((currentSquare === (pieceSquare + 7) ||
                currentSquare === (pieceSquare + 9)))){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    let oldSquare = document.querySelector('.c' + pieceSquare)
                    // Get rid of the pawn for the old square
                    if (newSquare.textContent.includes('white')) {
                        if (oldSquare.textContent.includes('white')){
                            // adds the pieces to the currently clicked square
                            newSquare.textContent = oldSquare.textContent
                            oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn + 100
                            moveLog.push('pawn to ', currentSquare)
                        } else if (oldSquare.textContent.includes('black')){
                            // adds the pieces to the currently clicked square
                            newSquare.textContent = oldSquare.textContent
                            oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn - 100
                            moveLog.push('pawn to ', currentSquare)
                        }
                    }
                }
            
        }
    });
}
function handleWPawnMove () {
// wpawn piece move
    document.addEventListener ('mousedown',  () => { 
        //checks if the pawn is on the home row
        if (currentPiece === wpawn){
            if (49 <= pieceSquare && pieceSquare <= 56) {
                let newSquare = document.querySelector('.c' + currentSquare)
                //Checks if given square is one or two places in front of the pawn
                if (newSquare.textContent === ""){
                    if (currentSquare === (pieceSquare - 8) || currentSquare === (pieceSquare - 16)) {
                            let oldSquare = document.querySelector('.c' + pieceSquare)
                            // Get rid of the pawn for the old square
                            if (oldSquare.textContent.includes('white')){
                                // adds the pieces to the currently clicked square
                                newSquare.textContent = oldSquare.textContent
                                oldSquare.textContent = ""
                                currentPiece = 0
                                turn = turn + 100
                                moveLog.push('pawn to ', currentSquare)
                            } else if (oldSquare.textContent.includes('black')){
                                // adds the pieces to the currently clicked square
                                newSquare.textContent = oldSquare.textContent
                                oldSquare.textContent = ""
                                currentPiece = 0
                                turn = turn - 100
                                moveLog.push('pawn to ', currentSquare)
                            }
                    }
                } else if (((currentSquare === (pieceSquare - 7) ||
                currentSquare === (pieceSquare - 9)))){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    let oldSquare = document.querySelector('.c' + pieceSquare)
                    // Get rid of the pawn for the old square
                    if (newSquare.textContent.includes('black')) {
                        if (oldSquare.textContent.includes('white')){
                            // adds the pieces to the currently clicked square
                            newSquare.textContent = oldSquare.textContent
                            oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn + 100
                            moveLog.push('pawn to ', currentSquare)
                        } else if (oldSquare.textContent.includes('black')){
                            // adds the pieces to the currently clicked square
                            newSquare.textContent = oldSquare.textContent
                            oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn - 100
                            moveLog.push('pawn to ', currentSquare)
                        }
                    }
                }
            // checks if the piece selected is a pawn
            
            }else if (currentSquare === (pieceSquare - 8)) {
                let newSquare = document.querySelector('.c' + currentSquare)
                if (newSquare.textContent === ""){
                        let oldSquare = document.querySelector('.c' + pieceSquare)
                        // Get rid of the pawn for the old square
                        if (oldSquare.textContent.includes('white')){
                            // adds the pieces to the currently clicked square
                            newSquare.textContent = oldSquare.textContent
                            oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn + 100
                            moveLog.push('pawn to ', currentSquare)
                        } else if (oldSquare.textContent.includes('black')){
                            // adds the pieces to the currently clicked square
                            newSquare.textContent = oldSquare.textContent
                            oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn - 100
                            moveLog.push('pawn to ', currentSquare)
                        }
                    }
                } else if (((currentSquare === (pieceSquare - 7) ||
                currentSquare === (pieceSquare - 9)))){
                    let newSquare = document.querySelector('.c' + currentSquare)
                    let oldSquare = document.querySelector('.c' + pieceSquare)
                    // Get rid of the pawn for the old square
                    if (newSquare.textContent.includes('black')) {
                        if (oldSquare.textContent.includes('white')){
                            // adds the pieces to the currently clicked square
                            newSquare.textContent = oldSquare.textContent
                            oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn + 100
                            moveLog.push('pawn to ', currentSquare)
                        } else if (oldSquare.textContent.includes('black')){
                           // adds the pieces to the currently clicked square
                           newSquare.textContent = oldSquare.textContent
                           oldSquare.textContent = ""
                            currentPiece = 0
                            turn = turn - 100
                            moveLog.push('pawn to ', currentSquare)
                        }
                    }
                }
        }
    });
}