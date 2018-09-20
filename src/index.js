var fileSystem = require('fs');
var lineReading = require('readline');

var read = lineReading.createInterface({input: fileSystem.createReadStream('./input.txt')});
read.on('line', (line) => { 
    console.log(line.trim())
});