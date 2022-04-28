const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');


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
)();