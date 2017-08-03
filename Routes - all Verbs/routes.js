var express = require("express");

// Body parser - for any non GET verb which we're going to send via body and not via query string.
// (need to "npm install body-parser" it). API Docs: https://www.npmjs.com/package/body-parser-json
var bodyParser = require('body-parser');

var app = express();

// Mandatory by the body-parser:
app.use(bodyParser.urlencoded({ extended: true }));

// Limit the body-parser to parse only JSON data:
app.use(bodyParser.json());

// Return the root index.html:
app.use(express.static(__dirname));

// GET all products:
app.get("/products", function (request, response) {
    var json2SendBack = {
        msg: "Get all products..."
    };
    console.log(JSON.stringify(json2SendBack));
    response.send(json2SendBack);
});

// GET several products (can be before or after previous route - "/products").
// Note: GET requests doen't have a body, thus the body-parser won't work on them.
// The data sent to a GET request needs to pass by route (or by query string which is less preffered):
app.get("/products/:minPrice/:maxPrice", function (request, response) {
    var json2SendBack = {
        msg: "Get several products...",
        minPrice: request.params.minPrice,
        maxPrice: request.params.maxPrice
    };
    console.log(JSON.stringify(json2SendBack));
    response.send(json2SendBack);
});

// GET one product:
app.get("/product/:id", function (request, response) {
    var json2SendBack = {
        msg: "Get one product...",
        id: request.params.id
    };
    console.log(JSON.stringify(json2SendBack));
    response.send(json2SendBack);
});

// Post one product:
app.post("/product", function (request, response) {
    var json2SendBack = {
        msg: "Add one product...",
        name: request.body.name,
        price: request.body.price
    };
    console.log(JSON.stringify(json2SendBack));
    response.send(json2SendBack);
});

// Pup one product:
app.put("/product", function (request, response) {
    var json2SendBack = {
        msg: "Update one full product...",
        id: request.body.id,
        name: request.body.name,
        price: request.body.price
    };
    console.log(JSON.stringify(json2SendBack));
    response.send(json2SendBack);
});

// Patch one product:
app.patch("/product", function (request, response) {
    var json2SendBack = {
        msg: "Update part of one product...",
        id: request.body.id,
        price: request.body.price
    };
    console.log(JSON.stringify(json2SendBack));
    response.send(json2SendBack);
});

// Delete one product:
app.delete("/product", function (request, response) {
    var json2SendBack = {
        msg: "Delete one product...",
        id: request.body.id
    };
    console.log(JSON.stringify(json2SendBack));
    response.send(json2SendBack);
});

// Run the server:
app.listen(3000, function () {
    console.log("Listening on: http://localhost:3000");
});