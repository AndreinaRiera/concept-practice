const fs = require("fs");

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));

for (const dependency in packageJson.dependencies) {
	if (packageJson.dependencies[dependency].includes("^")) {
		packageJson.dependencies[dependency] = packageJson.dependencies[dependency].replace("^", "");
	}
}

fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
