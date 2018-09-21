var GalaxyUnits = {};
var GalaxyCurrencies = {};
var lineSplit = [];

var romanCurrencies = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];
var romanCurrencyVal = {i: 1, v:5, x:10, l:50, c:100, d:500, m:1000}; // L=250 wrongly given as per wiki l=50

//Validate Roman

//Currency to Value (Gallaxy / Roman)

//Handle Galaxy Currency Assign 
function galaxyCurrency(data){
    var findIndex = romanCurrencies.indexOf(lineSplit[lineSplit.length-1]);
    if(findIndex !== -1){        
        GalaxyCurrencies[data[0]] = data[2];
    }else{
        console.log('Currency alreay assigned to roman letter or does not exits');
    }
    //console.log(GalaxyCurrencies);
}

function galaxyUnits(data){
    var findIs = data.indexOf('is');    
    var creditValue = data[findIs+1];
    var sliceArray = data.splice(0, findIs);
    var creditUnit = sliceArray.pop();    

    if(GalaxyCurrencies[creditUnit]){
        console.log(creditUnit + ' is not a unit')
    }
    console.log(creditUnit);
}

function convertion(data){

}

module.exports = function(line){
    //console.log('line:'+line);    
    if(line.indexOf('is') !== -1)
    {
        line = line.toLowerCase();        
        lineSplit = line.split(/\s+/);        
        if(romanCurrencies.indexOf(lineSplit[lineSplit.length-1]) !== -1){
            //Handle Galaxy Currency Assign    
            //console.log('Assign');   
            galaxyCurrency(lineSplit);
        }
        else if(lineSplit[lineSplit.length-1] === 'credits'){
             //Handle Galaxy Credit/Units Assign
            //console.log('Unit');   
            galaxyUnits(lineSplit);
        }
        else if(lineSplit[lineSplit.length-1] === "?"){
            //Handle How much and How Many
            //console.log('HowMany HowMuch'); 
            convertion(lineSplit);
        }
    }
    else{
        //Error
        console.log('I have no idea what you are talking about');
    }   
}