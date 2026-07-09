const API_URL = "https://api.football-data.org/v4";
const API_KEY = "addb266487f24b01aec93fc7e48013c9"; // replace with your key

export async function fetchUpcomingMatches(competition = "WC") {
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
