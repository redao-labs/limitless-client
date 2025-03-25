import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import fetch from 'node-fetch';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

// Read API key from json file
const apiKey = JSON.parse(fs.readFileSync('openai-api-key.json', 'utf8')).key;
const openai = new OpenAI({ apiKey });

// Helper function to download images
async function downloadImage(url: string, filepath: string) {
	const res = await fetch(url);
	const buffer = await res.buffer();
	fs.writeFileSync(filepath, buffer);
}

// Define a schema for structured output
const MarketCoin = z.object({
	coinName: z.string(),
	coinSymbol: z.string(), // Removed .max(5)
	coinDescription: z.string(),
	logoPrompt: z.string(),
	coverPrompt: z.string(),
	marketDeployed: z.boolean().optional()
});

async function generateMarket() {
	// Scan the markets folder for existing symbols
	let existingSymbols: string[] = [];
	const marketsFolder = path.join("markets");
	if (fs.existsSync(marketsFolder)) {
		existingSymbols = fs.readdirSync(marketsFolder)
			.filter(name => fs.statSync(path.join(marketsFolder, name)).isDirectory());
	}

	// Updated prompt with strict structured JSON response and forbidden coin symbols
	let prompt = "Generate a strictly formatted JSON object for a meme coin with hilarious and great marketing potential. The JSON must include exactly these keys: 'coinName' (string), 'coinSymbol' (string, max 5 letters), 'coinDescription' (string), 'logoPrompt' (string, creative prompt for a logo), and 'coverPrompt' (string, creative prompt for a cover photo).";
	if (existingSymbols.length > 0) {
		prompt += ` Avoid generating a coinSymbol that is any of the following: ${existingSymbols.join(", ")}.`;
	}
	prompt += " Do not include any additional text.";
	
	// Use structured outputs via the SDK helper to parse the response into MarketCoin type
	const completion = await openai.beta.chat.completions.parse({
		model: "gpt-4o-2024-08-06",
		messages: [{ role: "user", content: prompt }],
		response_format: zodResponseFormat(MarketCoin, "market_coin")
	});
	const coinData = completion.choices[0].message.parsed;
	// Add marketDeployed field
	coinData.marketDeployed = false;

	// Create a folder for the coin using coinSymbol
	const symbol = coinData.coinSymbol;
	const marketFolder = path.join("markets", symbol);
	if (fs.existsSync(marketFolder)) {
		console.log(`Folder for ${symbol} exists. Skipping.`);
		return;
	}
	fs.mkdirSync(marketFolder, { recursive: true });

	// Request images from DALL·E 3 using the new images.generate API
	const logoResponse = await openai.images.generate({
		model: "dall-e-3",
		prompt: coinData.logoPrompt,
		n: 1,
		size: "1024x1024"
	});
	const coverResponse = await openai.images.generate({
		model: "dall-e-3",
		prompt: coinData.coverPrompt,
		n: 1,
		size: "1792x1024"
	});
	const logoUrl = logoResponse.data[0].url;
	const coverUrl = coverResponse.data[0].url;

	// Download and save images to the coin folder
	await downloadImage(logoUrl, path.join(marketFolder, "logo.png"));
	await downloadImage(coverUrl, path.join(marketFolder, "cover.png"));

	// Save the coin details JSON
	fs.writeFileSync(path.join(marketFolder, "data.json"), JSON.stringify(coinData, null, 2));
	console.log(`Market ${symbol} generated.`);
}

async function generateMarkets() {
	// Loop for 1000 generations
	for (let i = 0; i < 100; i++) {
		try {
			await generateMarket();
		} catch (err) {
			console.error("Error in generation:", err);
		}
	}
}

// Start the generation loop
generateMarkets();
