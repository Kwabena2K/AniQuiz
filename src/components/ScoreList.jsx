import React, { useState, useEffect } from "react";

function ScoreList() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];

    // Sort the scores list by score (highest first)
    scores.sort((a, b) => b.score - a.score);

    setScores(scores);
  }, []);

  return (
    <div className="scoreList">
      <h2>Top Scores:</h2>
      <ol>
        {scores.map((score, index) => (
          <li key={index}>
            {score.name}: {score.score}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ScoreList;
