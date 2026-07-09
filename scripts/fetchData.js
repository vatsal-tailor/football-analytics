// scripts/fetchData.js
import "dotenv/config";
import fs from "fs";

const API_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_API_KEY; // use env variable

async function fetchMatches() {
  try {
    console.log("API Key:", API_KEY);
    const res = await fetch(
      `${API_URL}/competitions/PL/matches?status=SCHEDULED`,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    const data = await res.json();

    // Save to public/matches.json
    fs.writeFileSync("public/matches.json", JSON.stringify(data, null, 2));
    console.log("✅ Matches saved to public/matches.json");
  } catch (err) {
    console.error("❌ Error fetching matches:", err);
  }
}

fetchMatches();
