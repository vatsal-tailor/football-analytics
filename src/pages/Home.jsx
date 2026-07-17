import React, { useEffect, useState } from "react";

function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function loadMatches() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}matches.json`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Loaded JSON:", data);

        if (Array.isArray(data.matches)) {
          setMatches(data.matches.slice(0, 10)); // show first 12
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
          <h2 className="text-2xl font-semibold mb-4 text-center">Upcoming Premier League Matches</h2>
          {
                (matches.length === 0 ? (<p className="text-center">No matches found (check JSON file).</p>) :
                (   <div className="block mx-auto w-fit min-w-[60%] max-w-full clean-table-container">
                    <table className = "table-fixed w-full border-collapse">
                        <thead className="text-white">
                            <tr>
                                <th className="p-3 w-1/12 text-center"></th>
                                <th className="p-3 w-1/4 text-center">Home Team</th>
                                <th className="p-3 w-1/2 text-center">Date & Time</th>
                                <th className="p-3 w-1/4 text-center">Away Team</th>
                                <th className="p-3 w-1/12 text-center"></th>
                                </tr>
                        </thead>
                        <tbody>
{matches.map((m) => (
                    <tr key={m.id} className="border-b hover:bg-gray-50/10">
                      <td className="p-3 text-center">
                       <div className="flex justify-center items-center">
                          <img
                            src={m.homeTeam?.crest}
                            alt={m.homeTeam?.name}
                            className="object-contain inline-block align-middle"
                            style={{ height: "1.5em", width: "1.5em" }}
                          />
                        </div>
                      </td>
                      <td className="p-3 font-medium text-center text-white">{m.homeTeam?.name}</td>

                      <td className="p-3 text-sm text-gray-600 text-center">
                        {new Date(m.utcDate).toLocaleString()}
                      </td>

                      <td className="p-3 font-medium text-center text-white">{m.awayTeam?.name}</td>

                      <td className="p-3 text-center">
                        <div className="flex justify-center items-center w-10 h-10 mx-auto">
                          <img
                            src={m.awayTeam?.crest}
                            alt={m.awayTeam?.name}
                            className="object-contain inline-block align-middle"
                            style={{ height: "1.5em", width: "1.5em" }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                        </tbody>
                    </table>
                    </div>
                    ))
          }
      </div>

    );
  }

export default Home;
