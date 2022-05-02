const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');



//Function to check if a specific File Exists
async function checkConfigFile(filePath) {
    return fs.promises.access(filePath)
        .then(() => {
            core.info(`File ${filePath} exists, proceeding with next steps`);
            const tfile = "./" + filePath;
            const tfile1 = `./${filePath}`;
            core.info(tfile);
            core.info(tfile1);
            //read the config file.
            fs.readFileSync(tfile1, (err, data) => {
                    if (err) {
                        core.info(`can't read the file ${err}`);
                    }
                    core.info(data);
                })
                // Call other functions to read / Execute other Rules.
            return true;
        })
        .catch(() => {
            core.setFailed(`No Config File found at ${filePath} which is Mandatory`);
            return false;
        })
}


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

();