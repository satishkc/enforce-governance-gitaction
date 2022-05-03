const { deepStrictEqual } = require('assert');
const fs = require('fs');

function autorules(rules) {

    console.log('This is is from Automation Rules JS');
    //console.log(JSON.stringify(rules));
    if (rules.length == 0 || !rules) {
        console.error('NO Rules Found');
    } else {
        for (var i = 0; i < rules.length; i++) {
            //console.log(rules[i]);
            console.log('Iteration - ' + i);
            var tfunc = rules[i].rulename;
            var tbp = rules[i].bypass;
            var tval = rules[i].value;
            if (tbp == true) {
                console.log('rule bypassed');
            } else {
                switch (tfunc) {
                    case 'Avoid Workflows':
                        avoidworkflows(tval);
                    case 'Avoid Process Builders':
                        console.log('Function yet to come');
                    case 'Flow Hard Coded Ids':
                        console.log('Hardcoded Id Function to arrive soon');
                }
            }
        }
    }

}

function avoidworkflows(value) {
    var tpath = "./force-app/main/default/workflows";
    fs.readdir(tpath, (err, files) => {
        files.forEach(file => {
            console.log(file);
        })
    });

}

module.exports = { autorules };