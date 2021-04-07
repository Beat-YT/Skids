const fs = require('fs');

console.log(fs.existsSync('./../skids.json'))
try {
  JSON.parse('./../skids.json')
} catch {
  console.error("Bad Json");
  process.exit(1);
}
