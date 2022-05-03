const { deepStrictEqual } = require('assert');
const fs = require('fs');
const colors = require('colors');
const { DOMParser } = require('xmldom');


function autorules(rules) {

    console.log('This is is from Automation Rules JS');
    //console.log(JSON.stringify(rules));
    if (rules.length == 0 || !rules) {
        console.error('No Rules Found'.warn);
    } else {
        for (var i = 0; i < rules.length; i++) {
            //console.log(rules[i]);
            //console.log('Iteration - ' + i);
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
                        //Omit the break here so that both the rules execute the same function.
                    case 'Flow Hard Coded Ids':
                        //console.log('Hardcoded Id Function to arrive soon');
                        getflowmeta(tval);
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
            console.log('No Workflow Found'.ok + err);
        } else if (files.length == 0) {
            console.log('No Workflows Found'.ok);
        }
        files.forEach(file => {
            console.warn('Workflow Rules found, Please consider migrating it to Lightning Flows'.warn);
            console.log(file);
        })
    });
}

function getflowmeta(value) {
    var tpath = "./force-app/main/default/flows";
    fs.readdir(tpath, (err, files) => {
        if (err) {
            console.log('No Flows Found'.ok + err);
        } else if (files.length == 0) {
            console.log('No Flows Found'.ok);
        }
        files.forEach(file => {
            console.log(file);
            var tstr = file;
            const pb = new DOMParser().parseFromString(tstr);
            const ispb = pb.getElementsByTagName("start")[0].childElementCount;
            console.log(ispb);
            /*if (ispb.length > 0) {
                console.log('This is a lightning flow');
            } else {
                console.log('This is a process Builder');
            }*/

        })
    });
}

colors.setTheme({
    notok: 'red',
    warn: 'yellow',
    ok: 'green'
});


module.exports = { autorules };