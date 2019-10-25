function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

var canvasObj = document.getElementById("board");
var board = canvasObj.getContext("2d");

var alertBox = document.getElementById("alertBox");
var scoreBox = document.getElementById("scoreBox");

var cWidth = canvasObj.width
var cHeight = canvasObj.height

board.lineWidth = 5;

var me;

var code = httpGet("https://hard-cow-70.localtunnel.me/code");
code = code.toString();
code = code.split("");
code.pop();
code.pop();
code = code.join("");
console.log(code);

var game = false;

var socket = io.connect('https://hard-cow-70.localtunnel.me');

socket.emit("here", code);

socket.on(code, (data) => {
    console.log("recieve");
    game = data;
    start();
})

function click(event) { // runs click detection

    if (false == false) {

        var x = event.clientX - canvasObj.offsetLeft;
        var y = event.clientY - canvasObj.offsetTop;

        var outX;
        var outY;

        if (x > 0 && x < cWidth / 3) {
            outX = 1;
        } else if (x > cWidth / 3 && x < cWidth / 3 + cWidth / 3) {
            outX = 2;
        } else if (x > cWidth / 3 + cWidth / 3 && x < cWidth / 3 + cWidth / 3 + cWidth / 3) {
            outX = 3;
        }

        if (y > 0 && y < cHeight / 3) {
            outY = 1;
        } else if (y > cHeight / 3 && y < cHeight / 3 + cHeight / 3) {
            outY = 2;
        } else if (y > cHeight / 3 + cHeight / 3 && y < cHeight / 3 + cHeight / 3 + cHeight / 3) {
            outY = 3;
        }

        socket.emit("clicked", [code, me, outX, outY]);

        /*

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

        */

    }
}

function start() {

    console.log(game);

    if (game["nextChar"] == "x") {
        me = "x";
    } else {
        me = "o";
    }
    console.log(me);
    drawLines();

    if (me == "x") {
        alertShow(game["alertX"]);
    } else {
        alertShow(game["alertO"]);
    }
    scoreShow(game["winX"], game["winO"])

    for (let i = 0; i < 3; i++) {
        for (let v = 0; i < 3; i++) {
            if (game["board"][i][v] == "x") {
                X(v+1, i+1)
            } else if (game["board"][i][v] == "o") {
                O(v + 1, i + 1)
            }
        }
    }
    canvasObj.addEventListener("mouseup", click);
}

function update() {
    for (let i = 0; i < 3; i++) {
        for (let v = 0; i < 3; i++) {
            if (game["board"][i][v] == "x") {
                X(v + 1, i + 1)
            } else if (game["board"][i][v] == "o") {
                O(v + 1, i + 1)
            }
        }
    }
}

socket.on("clear", (data) => {
    if (data == code) {
        clear();
        drawLines();
    }
})

socket.on("update", (data) => {
    console.log("update");
    game = data;
    if (me == "x") {
        alertShow(game["alertX"]); 
    } else {
        alertShow(game["alertO"]); 
    }
    scoreShow(game["winX"], game["winO"])
    for (let i = 0; i < 3; i++) {
        console.log("layer one")
        for (let v = 0; v < 3; v++) {
            if (game["board"][i][v] == "x") {
                X(v + 1, i + 1)
            } else if (game["board"][i][v] == "o") {
                O(v + 1, i + 1)
            }
            console.log("layer two")
        }
        console.log(i);
    }
    if (game["winLine"] != false) {
        if (game["winLine"][0] == "h") {
            lineH(game["winLine"][2], game["winLine"][1]);
        } else if (game["winLine"][0] == "v") {
            lineV(game["winLine"][2], game["winLine"][1]);
        } else if (game["winLine"][0] == "d") {
            lineD(game["winLine"][2], game["winLine"][1]);
        }
    }
})
