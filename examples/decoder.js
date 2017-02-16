"use strict";

const FS = require("fs");
const JSNG = require("../");

JSNG.fromJSNG(__dirname + "/../samples/potato.jsng", function(err, data, mime) {
    if(err) {
        console.log(err);
        return;
    }
    FS.writeFile(__dirname + "/../samples/potato2." + (mime == "image/png" ? "png" : "jpg"), data, function(err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Successfully saved file!");
    });
});
