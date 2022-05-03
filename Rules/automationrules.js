const { deepStrictEqual } = require('assert');
const fs = require('fs');
const colors = require('colors');

function autorules(rules) {

    console.log('This is is from Automation Rules JS');
    //console.log(JSON.stringify(rules));
    if (rules.length == 0 || !rules) {
        console.error('No Rules Found'.warn);
    } else {
        for (var i = 0; i < rules.length; i++) {
            //console.log(rules[i]);
            console.log('Iteration - ' + i);
            var tfunc = rules[i].rulename;
            var tbp = rules[i].bypass;
            var tval = rules[i].value;
            if (tbp == true) {
                console.log('rule bypassed'.ok);
            } else {
                switch (tfunc) {
                    case 'Avoid Workflows':
                        avoidworkflows(tval);
                        break;
                    case 'Avoid Process Builders':
                        //console.log('Function yet to come');
                        break;
                    case 'Flow Hard Coded Ids':
                        //console.log('Hardcoded Id Function to arrive soon');
                        break;
                }
            }
        }
    }

}

function avoidworkflows(value) {
    var tpath = "./force-app/main/default/workflows";
    fs.readdir(tpath, (err, files) => {
        if (err) {
            console.error('No Workflow Found'.notok);
        } else if (files.length == 0) {
            console.log('No Workflows Found'.ok);
        }
        files.forEach(file => {
            console.log('Workflow found Listing them below'.warn);
            console.log(file);
        })
    });

}

colors.setTheme({
    notok: 'red',
    warn: 'yellow',
    ok: 'green'
});


module.exports = { autorules };