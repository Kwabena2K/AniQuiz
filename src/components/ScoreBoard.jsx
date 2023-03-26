import React, { useState } from "react";

function ScoreBoard({ onScoreSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onScoreSubmit({ name, score: localStorage.getItem("score") });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Congratulations on completing the quiz!</h3>
      <p>Please enter your name to submit your score:</p>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Submit Score</button>
    </form>
  );
}

export default ScoreBoard;
