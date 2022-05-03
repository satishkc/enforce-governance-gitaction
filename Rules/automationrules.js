function autorules(rules) {

    console.log('This is is from Automation Rules JS');
    console.log(JSON.stringify(rules));
    for (var i = 0; i < rules.length; i++) {
        console.log(rules[i]);
    }

}

module.exports = { autorules };