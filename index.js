"use strict";

const FS = require("fs");
const Jimp = require("jimp");

module.exports.toJSNG = function toJSNG(file, cb) {
    Jimp.read(file, function(err, image) {
        if(err) {
            return cb(err);
        }

        var jsng = {
            version: "1.0",
            comment: "Created with jsng, a JSON-G JavaScript library",
            transparency: image._originalMime == Jimp.MIME_PNG,
            size: {
                width: image.bitmap.width,
                height: image.bitmap.height
            },
            layers: [
                {
                    default_colour: {
                        red: 0,
                        green: 0,
                        blue: 0
                    },
                    pixels: [
                    ]
                }
            ]
        };

        if(jsng.transparency) {
            jsng.layers[0].default_colour.alpha = 255;
        }

        var colours = {
            0: 0
        };
        var bestColour = 0;

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            var colour = (image.bitmap.data[idx] * 16777216) + (image.bitmap.data[idx + 1] * 65536) + (image.bitmap.data[idx + 2] * 256) + (image.bitmap.data[idx + 3] || 0);
            colours[colour] = (colours[colour] || 0) + 1;
            if(colours[colour] > colours[bestColour]) {
                bestColour = colour;
            }
        });

        jsng.layers[0].default_colour.red = ~~(bestColour / 16777216);
        jsng.layers[0].default_colour.green = ~~(bestColour / 65536) & 0xFF;
        jsng.layers[0].default_colour.blue = ~~(bestColour / 256) & 0xFF;
        if(jsng.transparency) {
            jsng.layers[0].default_colour.alpha = bestColour & 0xFF;
        }
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            var obj = {
                position: {
                    x: x,
                    y: y
                },
                colour: {
                    red: image.bitmap.data[idx],
                    green: image.bitmap.data[idx + 1],
                    blue: image.bitmap.data[idx + 2]
                }
            };
            if(jsng.transparency) {
                obj.colour.alpha = image.bitmap.data[idx + 3];
            }
            var colour = (obj.colour.red * 16777216) + (obj.colour.green * 65536) + (obj.colour.blue * 256) + (obj.colour.alpha || 0);
            if(colour != bestColour) {
                jsng.layers[0].pixels.push(obj);
            }
        });

        cb(null, jsng);
    });
};

module.exports.fromJSNG = function fromJSNG(file, cb) {
    FS.readFile(file, function(err, jsng) {
        if(err) {
            return cb(err);
        }

        try {
            jsng = JSON.parse(jsng);
        } catch(err) {
            return cb(err);
        }

        var defaultColour = jsng.layers[0].default_color || jsng.layers[0].default_colour;
        defaultColour = (defaultColour.red * 16777216) + (defaultColour.green * 65536) + (defaultColour.blue * 256) + (jsng.transparency && defaultColour.alpha != undefined ? defaultColour.alpha : 255);

        var img = new Jimp(jsng.size.width, jsng.size.height, defaultColour);
        for(var i = 0; i < jsng.layers.length; i++) {
            jsng.layers[i].pixels.forEach(function(pixel) {
                var colour = (pixel.color || pixel.colour);
                colour = (colour.red * 16777216) + (colour.green * 65536) + (colour.blue * 256) + (jsng.transparency && colour.alpha != undefined ? colour.alpha : 255);
                img.setPixelColor(colour, pixel.position.x, pixel.position.y);
            });
        }

        var mime = jsng.transparency ? Jimp.MIME_PNG : Jimp.MIME_JPEG;
        img.getBuffer(mime, function(err, buffer) {
            cb(err, buffer, mime);
        });
    });
};
