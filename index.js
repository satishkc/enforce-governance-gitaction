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
            fs.readdir(objects, (err, files) => {
                if (err) {
                    return console.log('Unable to Scan Directory or Not Directory Fouund' + err);
                }
                files.forEach(function(file) {
                    console.log(file);
                })
            })
        } catch (error) {
            core.setFailed(error.message);
        }
    }
)();