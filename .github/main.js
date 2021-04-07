try {
  JSON.parse('./../skids.json')
} catch {
  console.error("Bad Json");
  process.exit(1);
}
