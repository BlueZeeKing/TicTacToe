function alertShow(msg) {
    alertBox.innerHTML = msg;
}

function scoreShow(xshow,oshow) {
    scoreBox.innerHTML = "X: " + xshow.toString() + "<br />O: " + oshow.toString();
}

function O(x, y) { // draws o
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
    board.arc(x2 + (cWidth / 6), y2 + (cHeight / 6), ((cWidth / 3) / 2) - 10, 0, 2 * Math.PI);
    board.stroke()
}

function X(x, y) { // draws x
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
    board.strokeStyle = "blue";

    board.moveTo(x2 + 10, y2 + 10);
    board.lineTo(x2 + cWidth / 3 - 10, y2 + cHeight / 3 - 10);
    board.stroke();

    board.moveTo(x2 + cWidth / 3 - 10, y2 + 10);
    board.lineTo(x2 + 10, y2 + cHeight / 3 - 10);
    board.stroke();
}

function clear() { // clear
    board.clearRect(0, 0, cWidth, cHeight);
    drawLines();
}

function drawLines() { // redraws board
    board.strokeStyle = "black";

    board.beginPath();
    board.moveTo(cWidth / 3, 0);
    board.lineTo(cWidth / 3, cHeight);

    board.moveTo(cWidth / 3 + cWidth / 3, 0);
    board.lineTo(cWidth / 3 + cWidth / 3, cHeight);
    board.stroke();

    board.moveTo(0, cHeight / 3);
    board.lineTo(cWidth, cHeight / 3);
    board.stroke();

    board.moveTo(0, cHeight / 3 + cHeight / 3);
    board.lineTo(cWidth, cHeight / 3 + cHeight / 3);
    board.stroke();
}

function lineD(dir, color) { // diagonal line for win
    if (dir == "l") {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(5, 5);
        board.lineTo(cWidth - 5, cHeight - 5);
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

function lineH(y, color) { // creates horizantal line to represent a win
    if (y == 0) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(5, cHeight / 6);
        board.lineTo(cWidth - 5, cHeight / 6);
        board.stroke();
    } else if (y == 1) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(5, (cHeight / 6) * 3);
        board.lineTo(cWidth - 5, (cHeight / 6) * 3);
        board.stroke();
    } else if (y == 2) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(5, (cHeight / 6) * 5);
        board.lineTo(cWidth - 5, (cHeight / 6) * 5);
        board.stroke();
    }
}

function lineV(x, color) { // creates verctical line for win
    if (x == 0) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo(cHeight / 6, 5);
        board.lineTo(cHeight / 6, cWidth - 5);
        board.stroke();
    } else if (x == 1) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo((cHeight / 6) * 3, 5);
        board.lineTo((cHeight / 6) * 3, cWidth - 5);
        board.stroke();
    } else if (x == 2) {
        board.beginPath();
        board.strokeStyle = color;
        board.moveTo((cHeight / 6) * 5, 5);
        board.lineTo((cHeight / 6) * 5, cWidth - 5);
        board.stroke();
    }
}