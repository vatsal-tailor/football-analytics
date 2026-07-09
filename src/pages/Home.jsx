import React, { useEffect, useState } from "react";

function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function loadMatches() {
      try {
        const res = await fetch("/matches.json"); // load from public folder
        const data = await res.json();

        if (data.matches) {
          setMatches(data.matches.slice(0, 5)); // show first 5
        } else {
          console.error("No matches in JSON:", data);
        }
      } catch (err) {
        console.error("Error loading matches.json:", err);
      }
    }
    loadMatches();
  }, []);

  return (
    <div>
      <h2>Upcoming Matches</h2>
      {matches.length === 0 ? (
        <p>No matches found (check JSON file).</p>
      ) : (
        <ul>
          {matches.map((m) => (
            <li key={m.id}>
              {m.homeTeam.name} vs {m.awayTeam.name} —{" "}
              {new Date(m.utcDate).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
