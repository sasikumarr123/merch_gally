var GalaxyUnits = {};
var GalaxyCurrencies = {};
var lineSplit = [];

var romanCurrencies = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];
var romanCurrencyVal = {i: 1, v:5, x:10, l:50, c:100, d:500, m:1000}; // L=250 wrongly given as per wiki l=50

//Validate Roman /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$|^\d+$/
//https://stackoverflow.com/questions/39200657/how-do-you-match-valid-integers-and-roman-numerals-with-a-regular-expression

var isValidRoman = new RegExp(/^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$|^\d+$/)

//Currency to Value (Gallaxy / Roman)
function convertCurrencytoValue(gCurrency){
    var cRoman = "";
    var cRomanArr = [];
    var finalValue = 0;
    for (var i = 0; i < gCurrency.length; i++){
        if(GalaxyCurrencies[gCurrency[i]]){
            cRoman += GalaxyCurrencies[gCurrency[i]];
            cRomanArr.push(GalaxyCurrencies[gCurrency[i]]);
        }else{
            console.log("Invalid Currency");
            return -1;
        }
    }
    //console.log(gCurrency+ " : "+ cRoman);
    if(isValidRoman.test(cRoman)){
        //console.log(cRomanArr);
        var romanValueArr = [];
        cRomanArr.forEach(function (item, index) {
            romanValueArr.push(romanCurrencyVal[item]);
            if (romanCurrencyVal[item] < romanCurrencyVal[cRomanArr[index + 1]]) {
                romanValueArr[index] *= -1;
            }
            //console.log(RomanDigits);
        });

        
        finalValue = romanValueArr.reduce(function(total, num){
            return total + num;
        })
        
        //console.log(finalValue);
        return finalValue;
    }else{
        console.log("Currency formed out of rule");
        return -1;
    }

}

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
    var tValue = convertCurrencytoValue(sliceArray);
    if(tValue !== -1){
        tValue = creditValue / tValue;
        GalaxyUnits[creditUnit] = tValue;
    }
    else{
        console.log('Not a valid currency');
    }
    //console.log(GalaxyUnits);
}

function convertion(data){
    var findIs = data.indexOf('is');
    //How Much  
    if (data.indexOf('much') !== -1){
        var len = data.length - findIs -2; //(total lenght -1 + startPos -1) 
        var sliceArray = data.splice(findIs+1, len);
        //console.log(sliceArray, len)
        var tValue = convertCurrencytoValue(sliceArray);
        if(tValue !== -1){
            console.log(sliceArray.join(' ')+' is ' +tValue);
        } else {
            console.log('Not a valid currency');
        }
    }

    //How Many
    if(data.indexOf('many') !== -1){
        var len = data.length - findIs - 2;
        var sliceArray = data.splice(findIs+1, len);
        var creditUnit = sliceArray.pop();
        var tValue = convertCurrencytoValue(sliceArray);

        if(tValue !== -1){
            tValue *= GalaxyUnits[creditUnit];
            console.log(sliceArray.join(' ') + ' '+ creditUnit + ' is ' + tValue + ' credits')
        } else {
            console.log('Not a valid currency');
        } 
    }
    
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