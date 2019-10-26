const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var session = require('client-sessions');

var gameCodes = [];
var games = {};

app.set('view engine', 'ejs')
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({
    cookieName: 'session',
    secret: 'yeeeeeeeeeeeeetimus-maaaaaaaaaaximus',
    duration: 30 * 60 * 1000,
    activeDuration: 8 * 60 * 1000,
}));

app.get('/', function (req, res) {
    res.render('index')
})

app.post("/join", function (req, res) {
    req.session.key = req.body.main + Math.floor(Math.random() * 100)
    console.log('yeet' == req.body.main)
    if (req.body.main in games) {
        
    } else {
        var code = req.body.main
        games[code] = {
                "code": req.body.main, "board": [
                    ["n", "n", "n"],
                    ["n", "n", "n"],
                    ["n", "n", "n"]
            ], "winX": 0, "winO": 0, "next": "o", "full": false, "nextChar": "x", "turn": "x", "alertX": "X's turn", "alertO": "X's turn", "w": false, "winLine": false
            }
        console.log("new")
    }
    //console.log(req.body.main)
    res.redirect('/online')
})

app.get("/online", function (req, res) {
    if (req.session && req.session.key) {
        res.render("online")
    } else {
        res.redirect("/")
    }
})

app.get("/code", function (req, res) {
    if (req.session && req.session.key) {
        res.send(req.session.key)
    }
})

server = app.listen(3000, function () {
    //console.log('Example app listening on port 3000!')
})

const io = require("socket.io")(server)

io.on('connection', (socket) => {
    //console.log('New connection')
    
    socket.on('here', (data) => {
        console.log(games)
        console.log(data)
        socket.emit(data, games[data])
        if (games[data]["nextChar"] == "x") {
            games[data]["nextChar"] = "o";
        }
    })
    socket.on('clicked', (data) => {
        if (games[data[0]]["w"] == false) {
            if (games[data[0]]["turn"] == data[1]) {
                console.log(data)
                if (games[data[0]]["board"][data[3] - 1][data[2] - 1] == "n") {
                    if (data[1] == "x") {
                        games[data[0]]["turn"] = "o"
                        games[data[0]]["board"][data[3] - 1][data[2] - 1] = "x"
                        games[data[0]]["alertX"] = "O's Turn"
                        games[data[0]]["alertO"] = "O's Turn"
                    } else if (data[1] == "o") {
                        games[data[0]]["turn"] = "x"
                        games[data[0]]["board"][data[3] - 1][data[2] - 1] = "o"
                        games[data[0]]["alertX"] = "X's Turn"
                        games[data[0]]["alertO"] = "X's Turn"
                    }
                } else {
                    if (data[1] == "x") {
                        games[data[0]]["alertX"] = "Something There!"
                    } else {
                        games[data[0]]["alertO"] = "Something There!"
                    }
                }
            } else {
                if (data[1] == "x") {
                    games[data[0]]["alertX"] = "Not Your Turn!"
                } else {
                    games[data[0]]["alertO"] = "Not Your Turn!"
                }
            }

            if (games[data[0]]["board"][0][0] == "x" && games[data[0]]["board"][0][1] == "x" && games[data[0]]["board"][0][2] == "x") {
                games[data[0]]["winX"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "X Wins!"
                games[data[0]]["alertO"] = "X Wins!"
                games[data[0]]["winLine"] = ["h","blue",0]
            } else if (games[data[0]]["board"][1][0] == "x" && games[data[0]]["board"][1][1] == "x" && games[data[0]]["board"][1][2] == "x") {
                games[data[0]]["winX"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "X Wins!"
                games[data[0]]["alertO"] = "X Wins!"
                games[data[0]]["winLine"] = ["h", "blue", 1]
            } else if (games[data[0]]["board"][2][0] == "x" && games[data[0]]["board"][2][1] == "x" && games[data[0]]["board"][2][2] == "x") {
                games[data[0]]["winX"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "X Wins!"
                games[data[0]]["alertO"] = "X Wins!"
                games[data[0]]["winLine"] = ["h", "blue", 2]
            } else if (games[data[0]]["board"][0][0] == "x" && games[data[0]]["board"][1][0] == "x" && games[data[0]]["board"][2][0] == "x") {
                games[data[0]]["winX"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "X Wins!"
                games[data[0]]["alertO"] = "X Wins!"
                games[data[0]]["winLine"] = ["v", "blue", 0]
            } else if (games[data[0]]["board"][0][1] == "x" && games[data[0]]["board"][1][1] == "x" && games[data[0]]["board"][2][1] == "x") {
                games[data[0]]["winX"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "X Wins!"
                games[data[0]]["alertO"] = "X Wins!"
                games[data[0]]["winLine"] = ["v", "blue", 1]
            } else if (games[data[0]]["board"][0][2] == "x" && games[data[0]]["board"][1][2] == "x" && games[data[0]]["board"][2][2] == "x") {
                games[data[0]]["winX"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "X Wins!"
                games[data[0]]["alertO"] = "X Wins!"
                games[data[0]]["winLine"] = ["v", "blue", 2]
            } else if (games[data[0]]["board"][0][0] == "x" && games[data[0]]["board"][1][1] == "x" && games[data[0]]["board"][2][2] == "x") {
                games[data[0]]["winX"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "X Wins!"
                games[data[0]]["alertO"] = "X Wins!"
                games[data[0]]["winLine"] = ["d", "blue", "l"]
            } else if (games[data[0]]["board"][2][0] == "x" && games[data[0]]["board"][1][1] == "x" && games[data[0]]["board"][0][2] == "x") {
                games[data[0]]["winX"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "X Wins!"
                games[data[0]]["alertO"] = "X Wins!"
                games[data[0]]["winLine"] = ["d", "blue", "r"]
            } else if (games[data[0]]["board"][0][0] == "o" && games[data[0]]["board"][0][1] == "o" && games[data[0]]["board"][0][2] == "o") {
                games[data[0]]["winO"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "O Wins!"
                games[data[0]]["alertO"] = "O Wins!"
                games[data[0]]["winLine"] = ["h", "green", 0]
            } else if (games[data[0]]["board"][1][0] == "o" && games[data[0]]["board"][1][1] == "o" && games[data[0]]["board"][1][2] == "o") {
                games[data[0]]["winO"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "O Wins!"
                games[data[0]]["alertO"] = "O Wins!"
                games[data[0]]["winLine"] = ["h", "green", 1]
            } else if (games[data[0]]["board"][2][0] == "o" && games[data[0]]["board"][2][1] == "o" && games[data[0]]["board"][2][2] == "o") {
                games[data[0]]["winO"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "O Wins!"
                games[data[0]]["alertO"] = "O Wins!"
                games[data[0]]["winLine"] = ["h", "green", 2]
            } else if (games[data[0]]["board"][0][0] == "o" && games[data[0]]["board"][1][0] == "o" && games[data[0]]["board"][2][0] == "o") {
                games[data[0]]["winO"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "O Wins!"
                games[data[0]]["alertO"] = "O Wins!"
                games[data[0]]["winLine"] = ["v", "green", 0]
            } else if (games[data[0]]["board"][0][1] == "o" && games[data[0]]["board"][1][1] == "o" && games[data[0]]["board"][2][1] == "o") {
                games[data[0]]["winO"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "O Wins!"
                games[data[0]]["alertO"] = "O Wins!"
                games[data[0]]["winLine"] = ["v", "green", 1]
            } else if (games[data[0]]["board"][0][2] == "o" && games[data[0]]["board"][1][2] == "o" && games[data[0]]["board"][2][2] == "o") {
                games[data[0]]["winO"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "O Wins!"
                games[data[0]]["alertO"] = "O Wins!"
                games[data[0]]["winLine"] = ["v", "green", 2]
            } else if (games[data[0]]["board"][0][0] == "o" && games[data[0]]["board"][1][1] == "o" && games[data[0]]["board"][2][2] == "o") {
                games[data[0]]["winO"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "O Wins!"
                games[data[0]]["alertO"] = "O Wins!"
                games[data[0]]["winLine"] = ["d", "green", "l"]
            } else if (games[data[0]]["board"][2][0] == "o" && games[data[0]]["board"][1][1] == "o" && games[data[0]]["board"][0][2] == "o") {
                games[data[0]]["winO"]++
                games[data[0]]["w"] = true
                games[data[0]]["alertX"] = "O Wins!"
                games[data[0]]["alertO"] = "O Wins!"
                games[data[0]]["winLine"] = ["d", "green", "r"]
            }

            if (games[data[0]]["w"] == false) {
                games[data[0]]["full"] = true;

                if (games[data[0]]["board"][0][0] == "n") {
                    games[data[0]]["full"] = false;
                }
                if (games[data[0]]["board"][0][1] == "n") {
                    games[data[0]]["full"] = false;
                }
                if (games[data[0]]["board"][0][2] == "n") {
                    games[data[0]]["full"] = false;
                }
                if (games[data[0]]["board"][1][0] == "n") {
                    games[data[0]]["full"] = false;
                }
                if (games[data[0]]["board"][1][1] == "n") {
                    games[data[0]]["full"] = false;
                }
                if (games[data[0]]["board"][1][2] == "n") {
                    games[data[0]]["full"] = false;
                }
                if (games[data[0]]["board"][2][0] == "n") {
                    games[data[0]]["full"] = false;
                }
                if (games[data[0]]["board"][2][1] == "n") {
                    games[data[0]]["full"] = false;
                }
                if (games[data[0]]["board"][2][2] == "n") {
                    games[data[0]]["full"] = false;
                }

                if (games[data[0]]["full"] == true) {
                    games[data[0]]["w"] = true;
                    games[data[0]]["alertX"] = "It's a Tie!";
                    games[data[0]]["alertO"] = "It's a Tie!";
                }
            }

        } else {
            io.sockets.emit("clear", data[0])
            games[data[0]] = {
                "code": data[0], "board": [
                    ["n", "n", "n"],
                    ["n", "n", "n"],
                    ["n", "n", "n"]
                ], "winX": games[data[0]]["winX"], "winO": games[data[0]]["winO"], "next": "o", "full": false, "nextChar": "x", "turn": "x", "alertX": "X's turn", "alertO": "X's turn", "w": false, "winLine": false
            }
        }

        io.sockets.emit('update', games[data[0]])
    })
})