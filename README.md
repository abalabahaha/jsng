# jsng

jsng is a JS encoder/decoder for the ever-popular and inefficient JSON-G format.

JSON-G (JSON-Graphics) is an extremely inefficient way to store raster image data, with transparency and layered support!

### Why jsng?

Using jsng allows you to combine the inefficiency and extensive features of JSON-G with the flexibility and ease-of-use of JavaScript, allowing you to seamlessly create and use JSON-G files wherever you are!

jsng is also the most efficient JSON-G library on the internet (as of 2017 February 15), outperforming any other encoder/decoder both in terms of speed and filesize.

### Features

- Support for an infinite number of layers
- Support for optional transparency
- Comment support for each individual pixel
- Incredibly large filesizes (approximately 400x bigger than equivalent PNGs)
- Human-readable formatting

### Installation
```
npm install abalabahaha/jsng
```

### API

The API is relatively simple, and has just two functions.

#### jsng.toJSNG(file, callback)
- `file` - a string pointing to a JPG or PNG file
- `callback(err, jsng)` - a callback function with the following parameters
    - `err` - an Error object, null if no error was encountered
    - `jsng` - an Object containing the JSON-G data for the image

#### jsng.fromJSNG(file, callback)
- `file` - a string pointing to a JSNG file
- `callback(err, jsng)` - a callback function with the following parameters
    - `err` - an Error object, null if no error was encountered
    - `buffer` - a Buffer containing the JPG or PNG data for the image
    - `mimeType` - a String containing the MIME type of the image

### Example

See the `examples` folder for example decoder and encoder scripts.

### Similar Projects
- [Roadcrosser/JSON-G](https://github.com/Roadcrosser/JSON-G) (Python script)
- [Gorialis/JSON-G](https://github.com/Gorialis/JSON-G) (Python module)
- [node-json-g](https://github.com/AtlasTheBot/node-json-g) (NodeJS module)
- [PHP JSON-G](https://git.gocode.it/RaidAndFade/PHP_json-g) (PHP)
- [json-g.rs](https://github.com/zeyla/json-g.rs) (Rust crate)
- See [the official JSON-G library index](https://github.com/Roadcrosser/JSON-G/blob/master/resources.md) for more

### Reference
- [JSON-G Specification](https://github.com/Roadcrosser/JSON-G/blob/master/spec.md)
