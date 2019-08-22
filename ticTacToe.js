var canvasObj = document.getElementById("board");
var board = canvasObj.getContext("2d");

var alertBox = document.getElementById("alertBox");
var scoreBox = document.getElementById("scoreBox");

var place = [
    ["n", "n", "n"],
    ["n", "n", "n"],
    ["n", "n", "n"]
]

var xWins = 0;
var oWins = 0;

var full = true;

var w = false;

var next = "x"

var first = next

var cWidth = canvasObj.width
var cHeight = canvasObj.height

board.lineWidth = 5;

function lineH(y, color) {
    if (y == 0){
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(5,cHeight/6);
        board.lineTo(cWidth - 5,cHeight/6);
        board.stroke();
    } else if (y == 1) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(5, (cHeight / 6) * 3);
        board.lineTo(cWidth - 5, (cHeight / 6)*3);
        board.stroke();
    } else if (y == 2) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(5, (cHeight / 6) * 5);
        board.lineTo(cWidth - 5, (cHeight / 6)*5);
        board.stroke();
    }
}

function lineV(x, color) {
    if (x == 0) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(cHeight / 6,5);
        board.lineTo(cHeight / 6, cWidth - 5);
        board.stroke();
    } else if (x == 1) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo((cHeight / 6) * 3,5);
        board.lineTo((cHeight / 6) * 3, cWidth - 5);
        board.stroke();
    } else if (x == 2) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo((cHeight / 6) * 5,5);
        board.lineTo((cHeight / 6) * 5, cWidth - 5);
        board.stroke();
    }
}

function lineD(dir, color) {
    if (dir == "l") {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(5,5);
        board.lineTo(cWidth-5,cHeight-5);
        board.stroke();
    }
    if (dir == "r") {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(cWidth - 5, 5);
        board.lineTo(5, cHeight - 5);
        board.stroke();
    }
}

function drawLines() {
    board.strokeStyle = "black";

    board.beginPath();
    board.moveTo(cWidth/3, 0);
    board.lineTo(cWidth/3, cHeight);

    board.moveTo(cWidth / 3 + cWidth / 3, 0);
    board.lineTo(cWidth / 3 + cWidth / 3, cHeight);
    board.stroke();

    board.moveTo(0,cHeight / 3);
    board.lineTo(cWidth,cHeight / 3);
    board.stroke();

    board.moveTo(0,cHeight / 3 + cHeight/3);
    board.lineTo(cWidth,cHeight / 3 + cHeight / 3);
    board.stroke();
}

drawLines();

function clear() {
    board.clearRect(0,0,cWidth,cHeight);
    drawLines();
}

function reset() {
    clear();
    w = false;
    place = [
        ["n", "n", "n"],
        ["n", "n", "n"],
        ["n", "n", "n"]
    ]
    if (first == "x") {
        next = "o";
        alertShow("O's Turn")
    } else {
        next = "x";
        alertShow("X's Turn")
    }
    first = next;
    full = true;
}

function X(x,y) {
    if(x==1) {
        var x2 = 0;
    } else if(x==2) {
        var x2 = cWidth/3;
    } else if (x == 3) {
        var x2 = cWidth / 3 + cWidth / 3;
    }

    if (y == 1) {
        var y2 = 0;
    } else if (y == 2) {
        var y2 = cHeight / 3;
    } else if (y == 3) {
        var y2 = cHeight / 3 + cHeight / 3;
    }

    board.beginPath();
    board.strokeStyle = "blue";

    board.moveTo(x2+10,y2+10);
    board.lineTo(x2 + cWidth / 3 - 10, y2 + cHeight / 3 - 10);
    board.stroke();

    board.moveTo(x2 + cWidth / 3 - 10, y2 + 10);
    board.lineTo(x2 + 10, y2 + cHeight / 3 - 10);
    board.stroke();
}

function O(x, y) {
    if (x == 1) {
        var x2 = 0;
    } else if (x == 2) {
        var x2 = cWidth / 3;
    } else if (x == 3) {
        var x2 = cWidth / 3 + cWidth / 3;
    }

    if (y == 1) {
        var y2 = 0;
    } else if (y == 2) {
        var y2 = cHeight / 3;
    } else if (y == 3) {
        var y2 = cHeight / 3 + cHeight / 3;
    }
    board.beginPath();
    board.strokeStyle = "green";
    board.arc(x2+(cWidth/6), y2+(cHeight/6), ((cWidth/3)/2)-10, 0, 2 * Math.PI);
    board.stroke()
}

function click(event) {

    if (w == false) {

        var x = event.clientX - canvasObj.offsetLeft;
        var y = event.clientY - canvasObj.offsetTop;

        var outX;
        var outY;

        if (x > 0 && x < cWidth / 3) {
            outX = 1;
        } else if (x > cWidth / 3 && x < cWidth / 3 + cWidth / 3) {
            outX = 2;
        }  else if (x > cWidth / 3 + cWidth / 3 && x < cWidth / 3 + cWidth / 3 + cWidth / 3) {
            outX = 3;
        }
    
        if (y > 0 && y < cHeight / 3) {
            outY = 1;
        } else if (y > cHeight / 3 && y < cHeight / 3 + cHeight / 3) {
            outY = 2;
        }  else if (y > cHeight / 3 + cHeight / 3 && y < cHeight / 3 + cHeight / 3 + cHeight / 3) {
            outY = 3;
        }

        if (place[outY - 1][outX - 1] != "n") {
            alertShow("Already something there!");
        } else {
            place[outY - 1][outX - 1] = next;
            if (next == "x") {
                next = "o";
                X(outX, outY);
                alertShow("O's Turn");

                if (place[0][0] == "x" && place[0][1] == "x" && place[0][2] == "x") {
                    alertShow("X Wins!");
                    w = true;
                    lineH(0,"blue");
                    xWins++;
                } else if (place[1][0] == "x" && place[1][1] == "x" && place[1][2] == "x") {
                    alertShow("X Wins!");
                    w = true;
                    lineH(1, "blue");
                    xWins++;
                } else if (place[2][0] == "x" && place[2][1] == "x" && place[2][2] == "x") {
                    alertShow("X Wins!");
                    w = true;
                    lineH(2, "blue");
                    xWins++;
                } else if (place[0][0] == "x" && place[1][0] == "x" && place[2][0] == "x") {
                    alertShow("X Wins!");
                    w = true;
                    lineV(0, "blue");
                    xWins++;
                } else if (place[0][1] == "x" && place[1][1] == "x" && place[2][1] == "x") {
                    alertShow("X Wins!");
                    w = true;
                    lineV(1, "blue");
                    xWins++;
                } else if (place[0][2] == "x" && place[1][2] == "x" && place[2][2] == "x") {
                    alertShow("X Wins!");
                    w = true;
                    lineV(2, "blue");
                    xWins++;
                } else if (place[0][0] == "x" && place[1][1] == "x" && place[2][2] == "x") {
                    alertShow("X Wins!");
                    w = true;
                    lineD("l", "blue")
                    xWins++;
                } else if (place[2][0] == "x" && place[1][1] == "x" && place[0][2] == "x") {
                    alertShow("X Wins!");
                    w = true;
                    lineD("r", "blue")
                    xWins++;
                }
            } else if (next == "o") {
                next = "x";
                O(outX, outY);
                alertShow("X's Turn");

                if (place[0][0] == "o" && place[0][1] == "o" && place[0][2] == "o") {
                    alertShow("O Wins!");
                    w = true;
                    lineH(0, "green");
                    oWins++;
                } else if (place[1][0] == "o" && place[1][1] == "o" && place[1][2] == "o") {
                    alertShow("O Wins!");
                    w = true;
                    lineH(1, "green");
                    oWins++;
                } else if (place[2][0] == "o" && place[2][1] == "o" && place[2][2] == "o") {
                    alertShow("O Wins!");
                    w = true;
                    lineH(2, "green");
                    oWins++;
                } else if (place[0][0] == "o" && place[1][0] == "o" && place[2][0] == "o") {
                    alertShow("O Wins!");
                    w = true;
                    lineV(0, "green");
                    oWins++;
                } else if (place[0][1] == "o" && place[1][1] == "o" && place[2][1] == "o") {
                    alertShow("O Wins!");
                    w = true;
                    lineV(1, "green");
                    oWins++;
                } else if (place[0][2] == "o" && place[1][2] == "o" && place[2][2] == "o") {
                    alertShow("O Wins!");
                    w = true;
                    lineV(2, "green");
                    oWins++;
                } else if (place[0][0] == "o" && place[1][1] == "o" && place[2][2] == "o") {
                    alertShow("O Wins!");
                    w = true;
                    lineD("l", "green");
                    oWins++;
                } else if (place[2][0] == "o" && place[1][1] == "o" && place[0][2] == "o") {
                    alertShow("O Wins!");
                    w = true;
                    lineD("r", "green");
                    oWins++;
                }
            }
            scoreShow();

            if (w != true) {
                full = true;
                
                if (place[0][0] == "n") {
                    full = false;
                }
                if (place[0][1] == "n") {
                    full = false;
                }
                if (place[0][2] == "n") {
                    full = false;
                }
                if (place[1][0] == "n") {
                    full = false;
                }
                if (place[1][1] == "n") {
                    full = false;
                }
                if (place[1][2] == "n") {
                    full = false;
                }
                if (place[2][0] == "n") {
                    full = false;
                }
                if (place[2][1] == "n") {
                    full = false;
                }
                if (place[2][2] == "n") {
                    full = false;
                }

                if (full == true) {
                    alertShow("It's a Tie!");
                    w = true;
                }
            }
        }
    } else if (w == true) {
        reset();
    }
}

function alertShow(msg) {
    alertBox.innerHTML = msg;
}

function scoreShow() {
    scoreBox.innerHTML = "X: "+ xWins.toString() + "<br />O: " + oWins.toString();
}

alertShow("X's Turn");

scoreShow();

canvasObj.addEventListener("mouseup", click);
