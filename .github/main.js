const fs = require('fs');

console.log(fs.existsSync('./skids.json'))

JSON.parse(fs.readFileSync('./skids.json', "utf8"))
