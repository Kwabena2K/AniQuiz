import React from "react";
import ScoreBoard from "./ScoreBoard";

function ResultsCard({ score, questions, restartGame }) {
  return (
    <div className="final-results">
      <h1>Final Results</h1>
      <h3>
        {score} out of {questions.length} correct - (
        {(score / questions.length) * 100}%)
      </h3>
      <button onClick={() => restartGame()}>Restart game </button>

      <ScoreBoard score={score} />
    </div>
  );
}

export default ResultsCard;
