var GalaxyUnits = {};
var GalaxyCurrencies = {};
var lineSplit = [];

var romanCurrencies = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];
var romanCurrencyVal = {i: 1, v:5, x:10, l:50, c:100, d:500, m:1000}; // L=250 wrongly given as per wiki l=50

//Validate Roman

//Currency to Value (Gallaxy / Roman)

module.exports = function(line){
    //console.log('line:'+line);    
    if(line.indexOf('is') !== -1)
    {
        line = line.toLowerCase();        
        lineSplit = line.split(/\s+/);        
        if(romanCurrencies.indexOf(lineSplit[lineSplit.length-1]) !== -1){
            //Handle Galaxy Currency Assign    
            console.log('Assign');        
        }
        else if(lineSplit[lineSplit.length-1] === 'credits'){
             //Handle Galaxy Credit/Units Assign
            console.log('Unit');        
        }
        else if(lineSplit[lineSplit.length-1] === "?"){
            //Handle How much and How Many
            console.log('HowMany HowMuch');        
        }
    }
    else{
        //Error
        console.log('I have no idea what you are talking about');
    }   
}