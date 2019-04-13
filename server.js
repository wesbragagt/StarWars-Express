var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var port = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// objects based on characters
var characters = [
    {
        routeName: "yoda",
        name: "yoda",
        role: "jedi master",
        age: 900,
        force_points: 2000
    },
    {
        routeName: "darthmaul",
        name: " darth maul",
        role: "sith lord",
        age: 200,
        force_points: 1200
    }
];

// var New_character = function(routeName, name, role, age, force_points) {
//     this.routeName = routeName;
//     this.name = name;
//     this.role = role;
//     this.age = age;
//     this.force_points = force_points;
// };

// routes or end points
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/api/:characters?", function(req, res) {
    var chosen = req.params.characters;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < characters.length; i++) {
            if (chosen === characters[i].routeName) {
                res.json(characters[i]);
                return;
            }
        }
        res.send("No character found");
    } else {
        res.json(characters);
    }
});

app.post("/api/new", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newcharacter = req.body;
    newcharacter.routeName = newcharacter.name
        .replace(/\s+/g, "")
        .toLowerCase();

    console.log(newcharacter);

    // We then add the json the user sent to the character array
    characters.push(newcharacter);

    // We then display the JSON to the users
    res.json(newcharacter);
});

// run server
app.listen(port, function() {
    console.log("APP is listening to port " + port);
});
