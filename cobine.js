const fs = require("fs");
const path = require("path");

const rootDir = "./src/app/[locale]"; // change this to your folder path
const outputFile = "all-tsx-content.txt";

function getAllTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllTsxFiles(filePath, fileList);
    } else if (filePath.endsWith(".tsx")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function combineTsxFilesToTxt(root, output) {
  const tsxFiles = getAllTsxFiles(root);

  console.log(`Found ${tsxFiles.length} .tsx files. Combining...`);

  const combined = tsxFiles
    .map((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      return `\n\n==============================\n${filePath}\n==============================\n\n${content}`;
    })
    .join("\n");

  fs.writeFileSync(output, combined, "utf8");
  console.log(`✅ All .tsx content written to "${output}"`);
}

// Run it
combineTsxFilesToTxt(rootDir, outputFile);
