# Online Tic Tac Toe

This is a project to play tic tac toe with people from any mobile device. it has an online mode that can be used with any two mobile devices (if the screen just shows a square try again with a diffrent code). then there is an offline mode that can just be used on one device.

---

### Running the code

First use a terminal or command prompt and navigate to the directory of the project. Then use `npm install` to install the packages. Then go into the server.js file and at line 5 and 6 change the port and adress to whatever you want. This is the default:
```javascript
var serverURL = "0.0.0.0"
var port = 3000
```
Then in static/ticTacToe.js change the line:
```javascript
var url = "192.168.1.155:3000";
``` 
at line eight to your network ip address. (will usually start with 192.168.1.some three digit number)
then run `node server.js` and go to your ip address. 
##### This can also be run using 127.0.0.1 for any computer but will not be available to other computers on the network like the code above!

# The Tic Tac Toe game info is broadcasted to every client! Beware!
