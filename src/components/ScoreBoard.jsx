import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

function ScoreBoard({ score }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newScore = { name, score };

    const firebaseConfig = {
      apiKey: "AIzaSyAoFispvWITU79xJ0gjLxSl_qClAvIZQgI",
      authDomain: "triviaapp-5cc5b.firebaseapp.com",
      projectId: "triviaapp-5cc5b",
      storageBucket: "triviaapp-5cc5b.appspot.com",
      messagingSenderId: "432827838259",
      appId: "1:432827838259:web:94e2bea4c9d88dff981846",
      measurementId: "G-PM6MDD6790",
    };

    // initializing firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    // Create a reference to the "scores" location in the database
    const scoresRef = ref(database, "scores");

    // Add the newScore object to the "scores" location in the database
    // and return a Promise containing a snapshot of the new data
    push(scoresRef, newScore)
      .then((snapshot) => {
        // If the data is saved to the database, log a success message to the console
        console.log("Score saved successfully!");
        // Clear the "name" input field
        setName("");
        // Navigate to the "/scores" page using the router's "navigate" method
        navigate("/scores"); // Navigate to scores page
      })
      .catch((error) => {
        // If an error occurred while saving the data, log the error message to the console
        console.error("Error saving score: ", error);
      });
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
