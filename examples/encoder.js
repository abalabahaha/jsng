"use strict";

const FS = require("fs");
const JSNG = require("../");

JSNG.toJSNG(__dirname + "/../samples/potato.png", function(err, data) {
    if(err) {
        console.log(err);
        return;
    }
    console.log("Saving...");
    FS.writeFile(__dirname + "/../samples/potato.jsng", JSON.stringify(data), function(err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Successfully saved file!");
    });
});
