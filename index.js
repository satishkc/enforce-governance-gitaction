const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

var ruleset;
const datamodel = [];
const dataquality = [];
const automation = [];
const performance = [];

//Function to check if a specific File Exists
async function checkConfigFile(filePath) {
    return fs.promises.access(filePath)
        .then(() => {
            core.info(`File ${filePath} exists, proceeding with next steps`);
            // Call other functions to read / Execute other Rules.
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) { core.setFailed(`Error Reading JSON file`) }
                ruleset = JSON.parse(data);
                core.info(JSON.stringify(ruleset));

                for (const [key, value] of Object.entries(ruleset)) {
                    //core.info(`Key is ${key}`);
                    //core.info('Value is ' + JSON.stringify(value));
                    const tkey = key;
                    switch (tkey) {
                        case 'Data Model':
                            datamodel.push(value);
                            //Call the Data Model Rules execution function here
                            datamodelrules();
                        case 'Data Quality':
                            dataquality.push(value);
                            //Call the Data Model Quality execution function here 
                            dataqualityrules();
                        case 'Performance':
                            performance.push(value);
                            //Call the Performance Rules execution function here 
                            performancerules();
                        case 'Automation':
                            automation.push(value);
                            //Call the Automation Rules execution function here 
                            automationrules();
                    }
                }
            })
            return true;
        })
        .catch(() => {
            core.setFailed(`No Config File found at ${filePath} which is Mandatory`);
            return false;
        })
}

async function datamodelrules() {
    if (datamodel.length == 0) {
        core.setFailed(`There are no Data Model rules enabled for this run`);
    }
    core.info(datamodel.length);
    for (var i = 0; i < datamodel.length; i++) {
        core.info(JSON.stringify(datamodel[i]));
        core.info(datamodel[i].rulename);
        core.info(datamodel[i].bypass);
        core.info(datamodel[i].value);
    }
    //call the methods from the exported rules in respective folders folders
    //Append the Results File with details.
}

async function dataqualityrules(rules) {
    //call the methods from the exported rules in respective folders folders
    //Append the Results File with details.
}

async function performancerules(rules) {
    //call the methods from the exported rules in respective folders folders
    //Append the Results File with details.
}

async function automationrules(rules) {
    //call the methods from the exported rules in respective folders folders
    //Append the Results File with details.
}

//Main Function
(
    async() => {
        try {
            checkConfigFile("config.json");

        } catch (error) {
            core.setFailed(error.message);
        }
    }
)



/*
// Function to read the metadata from the Repo / Branch
(
    async() => {
        try {
            core.notice("skc testing action");
            const gname = core.getInput('greeting-name');
            console.log(`Hello ${gname}`);
            const objects = "./force-app/main/default/objects";
            const flows = "./force-app/main/default/flows";

            fs.readdir(objects, (err, files) => {
                console.log(files.length);
                if (err) {
                    return console.log('Unable to Scan Directory or Not Directory Fouund' + err);
                }
                files.forEach(function(file) {
                    console.log("Custom Object List");
                    console.log(file);
                })
            })


            fs.readdir(flows, (err, lfs) => {
                console.log(lfs.length);
                if (err) {
                    return console.log('Unable to Scan Directory or Not Directory Fouund' + err);
                }
                lfs.forEach(function(lf) {
                    console.log("Extracting Flows");
                    console.log(lf);
                })
            })
        } catch (error) {
            core.setFailed(error.message);
        }
    }
)*/

//Calling the main function
();