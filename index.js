const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');


(
    async() => {
        try {
            core.notice("skc testing action");
            const gname = core.getInput('greeting-name');
            console.log(`Hello + ${gname}`);
            const time = (new Date().toTimeString);
            core.setOutput("time", time);
            const payload = JSON.stringify(github.context.payload, undefined, 2);
            console.log(`The Event Payload is : ${payload}`);
        } catch (error) {
            core.setFailed(error.message);
        }
    }
)();