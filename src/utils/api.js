const API_URL = "https://api.football-data.org/v4";

export async function fetchUpcomingMatches(competition = "PL") {
  try {
    const res = await fetch(
      `${API_URL}/competitions/${competition}/matches?status=SCHEDULED`,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );
    console.log("Response status:", res.status); // log HTTP status
    const data = await res.json();
    console.log("Raw API data:", data); // log full response

    return data.matches || [];
  } catch (err) {
    console.error("Error fetching matches:", err);
    return [];
  }
}
