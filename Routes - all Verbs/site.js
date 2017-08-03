$(function () {

    // Get all products:
    $("#btnGetAll").click(function () {
        $.ajax({
            method: "GET",
            url: "/products",
            error: function (err) {
                alert("Error: " + err.status + ", " + err.statusText);
            },
            success: function (response) {
                alert(JSON.stringify(response));
            }
        });
    });
    
    // Get several products.
    // Note: GET requests doesn't have a body, thus the body-parser won't work on them.
    // The data sent to a GET request needs to pass by route (or by query string which is less preferred):
    $("#btnGetSeveral").click(function () {
        $.ajax({
            method: "GET",
            url: "/products/111/222",
            error: function (err) {
                alert("Error: " + err.status + ", " + err.statusText);
            },
            success: function (response) {
                alert(JSON.stringify(response));
            }
        });
    });

    // Get one product:
    $("#btnGetOne").click(function () {
        $.ajax({
            method: "GET",
            url: "/product/7",
            error: function (err) {
                alert("Error: " + err.status + ", " + err.statusText);
            },
            success: function (response) {
                alert(JSON.stringify(response));
            }
        });
    });

    // Add product:
    $("#btnPost").click(function () {
        $.ajax({
            method: "POST",
            url: "/product",
            data: {
                name: "Apple",
                price: 3.5
            },
            error: function (err) {
                alert("Error: " + err.status + ", " + err.statusText);
            },
            success: function (response) {
                alert(JSON.stringify(response));
            }
        });
    });

    // Put product:
    $("#btnPut").click(function () {
        $.ajax({
            method: "PUT",
            url: "/product",
            data: {
                id: 7,
                name: "Green Apple",
                price: 4.7
            },
            error: function (err) {
                alert("Error: " + err.status + ", " + err.statusText);
            },
            success: function (response) {
                alert(JSON.stringify(response));
            }
        });
    });

    // Patch product:
    $("#btnPatch").click(function () {
        $.ajax({
            method: "PATCH",
            url: "/product",
            data: {
                id: 7,
                price: 5.3
            },
            error: function (err) {
                alert("Error: " + err.status + ", " + err.statusText);
            },
            success: function (response) {
                alert(JSON.stringify(response));
            }
        });
    });

    // Delete product:
    $("#btnDelete").click(function () {
        $.ajax({
            method: "DELETE",
            url: "/product",
            data: {
                id: 7
            },
            error: function (err) {
                alert("Error: " + err.status + ", " + err.statusText);
            },
            success: function (response) {
                alert(JSON.stringify(response));
            }
        });
    });
});