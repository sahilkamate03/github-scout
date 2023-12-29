const fs = require('fs');
const path = require('path');
const filePath = './src/app/environment/environment.prod.ts';
const directoryPath = path.dirname(filePath);

if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
}

fs.writeFileSync(filePath, ``);

fs.appendFileSync(filePath, `
export const environment = {
        production: true,
        apiKey: '${process.env.GIHUB_API_KEY}',
};
`);

