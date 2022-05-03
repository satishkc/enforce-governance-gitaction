const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
var auto = require('./Rules/automationrules.js');
var datamod = require('./Rules/datamodelrules.js');

var ruleset;
var datamodel;
var dataquality;
var automation;
var performance;

//Function to check if a specific File Exists
async function checkConfigFile(filePath) {
    return fs.promises.access(filePath)
        .then(() => {
            core.info(`File ${filePath} exists, proceeding with next steps`);
            // Call other functions to read / Execute other Rules.
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) { core.setFailed(`Error Reading JSON file`) }
                ruleset = JSON.parse(data);
                //core.info('Rule Set is ' + JSON.stringify(ruleset));
                //core.info(JSON.stringify(ruleset.DataModel));
                //core.info(JSON.stringify(ruleset.Automation));
                //core.info(JSON.stringify(ruleset.Performance));
                datamodel = ruleset.DataModel;
                automation = ruleset.Automation;
                performance = ruleset.Performance;

                executerules();
            })
            return true;
        })
        .catch(() => {
            core.setFailed(`No Config File found at ${filePath} which is Mandatory`);
            return false;
        })
}

function executerules() {

    //Automation Rules
    if (automation.length == 0) {
        core.setFailed(`There is no rules set for execution under Automation Category`);
    } else {
        core.info('Automation Rules to Execute');
        core.info(JSON.stringify(automation));
        const autoresults = auto.autorules(automation);
    }


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