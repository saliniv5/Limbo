var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();


// Return the root index.html
app.use(express.static(__dirname));

// Mandatory by the body-parser:
app.use(bodyParser.urlencoded({ extended: true }));

// Limit the body-parser to parse only JSON data:
app.use(bodyParser.json());


app.post("/register", function (request, response) {
    var userAsJSON = {
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password,
        repassword: request.body.repassword
    };
    var allCurrentUsersAsString = fs.readFileSync("./Data/users.json", "utf-8");
    var allCurrentUsersAsJSON = JSON.parse(allCurrentUsersAsString);
    allCurrentUsersAsJSON.push(userAsJSON);
    var allDataAsString = JSON.stringify(allCurrentUsersAsJSON);
    fs.writeFile("./Data/users.json", allDataAsString, function (err) {
        if (err) {
            console.log("ERROR: " + err);
        }
    })
    response.send("User Added Successfully!");
});

app.get("/login", function(request, response){
    fs.readFile("./Data/users.json", "utf-8", function(err, text){
        if(err) {
            response.send("Error:" + err);
        }
        else {
            response.send(JSON.parse(text));
        }
    });
});
   
app.get("/dashboard/:username", function (request, response) {
    var username = request.params.username;
    fs.readFile("./Data/movies.json", "utf-8", function (err, text) {
        if (err) {
            response.send("Error:" + err);
        }
        else {
            var data = JSON.parse(text);
            response.send(data);           
        }
    });
});

app.post("/dashboard/:username", function (request, response) {
    console.log("requst DATA"+ request.data);
    var isMovieExist = false;
    var movieAsJSON = { // Create an object from the parameters the user has entered in the form.    
        link: request.body.link,
        category: request.body.category,
        description: request.body.description
    };
    var username = request.body.username;
    var allCurrentDataAsString = fs.readFileSync("./Data/movies.json", "utf-8");
    var allCurrentDataAsJSON=JSON.parse(allCurrentDataAsString);
    for (var i = 0; i < allCurrentDataAsJSON.length; i++) {
        if (allCurrentDataAsJSON[i].username == username) {
            allCurrentDataAsJSON[i].movies.unshift(movieAsJSON);
            isMovieExist = true;
        };
    }
    if (!isMovieExist) { // Checks if user has assigned any movie yet.
        console.log(username);
        var newUser = {"username": username, "movies":[]};
        newUser.movies.push(movieAsJSON);
        allCurrentDataAsJSON.push(newUser);
    }
    allCurrentDataAsString = JSON.stringify(allCurrentDataAsJSON);
    fs.writeFile("./Data/movies.json", allCurrentDataAsString, function (err) {
        if (err) {
            console.log("Could not add current movie. " + err);
        }
        console.log(allCurrentDataAsString);
        response.send("Movie Added Successfully!");
    });
});

app.delete("/dashboard/:username/:url", function (request, response) {
    var username = request.params.username;
    var url = request.params.url;
    console.log(username, url);
    fs.readFile("./Data/movies.json", "utf-8", function (err, text) {
        if (err) {
            response.send("Error:" + err);
        }
        else {
            var data = JSON.parse(text);
            console.log("DATA: " + data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].username == username) {
                    for (var j = 0; j < data[i].movies.length; j++) {
                        console.log(data[i].movies[j].link);
                        var checkedURL = data[i].movies[j].link.split('d/');
                        console.log("Checked URL: " + checkedURL[1]);
                        if (url == checkedURL[1] ) {
                            data[i].movies.splice(j, 1);
                        }
                    }
                }
            }
            var dataAsString = JSON.stringify(data);
            fs.writeFile("./Data/movies.json", dataAsString, function (err) {
                if (err) {
                    console.log("Could not add current movie. " + err);
                }
                console.log(dataAsString);
                response.send("Movie Removed Successfully!");
            });
        }
    });
});
app.listen(3000, function () {
    console.log("Listening on: http://localhost:3000");
});