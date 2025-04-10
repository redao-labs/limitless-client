import * as fs from 'fs';
import * as path from 'path';

function resetMarketDeployed(): void {
    // Adjust the path to the "markets" folder if necessary
    const marketsDir = path.join(__dirname, 'markets');

    if (!fs.existsSync(marketsDir) || !fs.statSync(marketsDir).isDirectory()) {
        console.error(`Markets folder not found at: ${marketsDir}`);
        return;
    }

    const folders = fs.readdirSync(marketsDir);

    folders.forEach((folder) => {
        const folderPath = path.join(marketsDir, folder);
        if (fs.statSync(folderPath).isDirectory()) {
            const dataFilePath = path.join(folderPath, 'data.json');
            if (fs.existsSync(dataFilePath)) {
                try {
                    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
                    const jsonData = JSON.parse(fileContent);

                    // Update the field "marketDeployed" to false
                    jsonData.marketDeployed = false;

                    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));
                    console.log(`Updated: ${dataFilePath}`);
                } catch (error) {
                    console.error(`Error processing ${dataFilePath}:`, error);
                }
            }
        }
    });
}

resetMarketDeployed();