import React, { useState } from "react";

function ScoreBoard({ score, onScoreSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newScore = { name, score };
    onScoreSubmit(newScore);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Congratulations on completing the quiz! &#128077;</h2>
      <p>Please enter your name to submit your score &#128516;</p>
      <input
        type="text"
        placeholder="Enter a name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="userName"
      />
      <button type="submit" className="submit">
        Submit Score
      </button>
    </form>
  );
}

export default ScoreBoard;
