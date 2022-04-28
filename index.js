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
            //const time = (new Date().toTimeString);
            //core.setOutput("time", time);
            //const payload = JSON.stringify(github.context.payload, undefined, 2);
            //console.log(`The Event Payload is : ${payload}`);
            const objects = "./force-app/main/default/objects";
            fs.readdir(objects, (err, files) => {
                console.log(files.length);
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