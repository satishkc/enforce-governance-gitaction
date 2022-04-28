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
            const stdpath = './force-app/main/default/';

            const objects = path.join(stdpath, 'Objects');
            const flows = path.join(stdpath, 'Flows');

            console.log("Listing the Custom Objects");
            fs.readdir(objects, (err, files) => {
                console.log(files.length);
                if (err) {
                    return console.log('Unable to Scan Directory or Not Directory Fouund' + err);
                }
                files.forEach(function(file) {
                    console.log(file);
                })
            })

            console.log("Listing the flows");
            fs.readdir(flows, (err, flows) => {
                console.log(flows.length);
                if (err) {
                    return console.log("No flows returned" + err);
                }
                flows.forEach(function(flow) {
                    console.log(flow);
                });
            });

        } catch (error) {
            core.setFailed(error.message);
        }
    }
)();