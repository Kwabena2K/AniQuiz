import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScoreList from "./ScoreList";

function ScoreBoard({ score }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newScore = { name, score };

    const scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push(newScore);

    localStorage.setItem("scores", JSON.stringify(scores));

    setName("");
    setScores(scores);
    navigate("/scores");
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
      <ScoreList score={scores} />
    </form>
  );
}

export default ScoreBoard;
