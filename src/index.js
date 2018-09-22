var fileSystem = require('fs');
var lineReading = require('readline');
var controlConvertion = require('./control.js')

var read = lineReading.createInterface({input: fileSystem.createReadStream('./input.txt')});
read.on('line', (line) => { 
    //console.log(line.trim())
    controlConvertion(line);
});