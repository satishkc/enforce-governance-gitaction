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
                ruleset = JSON.parse(data).records;
                //core.info(JSON.stringify(ruleset));

                var rs = [];
                //Seperate the rules by Category
                for (const [key, value] of Object.entries(ruleset)) {
                    rs.push(value);
                }
                core.info(`This is the new message ${rs.length}`);
                core.info(JSON.stringify(rs));
                for (var i = 0; i < rs.length; i++) {
                    var tval = rs[i];
                    core.info(JSON.stringify(tval.rules));

                }
            })
            return true;
        })
        .catch(() => {
            core.setFailed(`No Config File found at ${filePath} which is Mandatory`);
            return false;
        })
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