import React, { useState, useEffect } from "react";
import he from "he";
import "./App.css";
import QuestionsCard from "./components/QuestionsCard";
import ResultsCard from "./components/ResultsCard";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("easy"); // default difficulty
  // ScoreBoard component to display user scores

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=31&difficulty=medium")
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map((question) => {
          const incorrectAnswers = question.incorrect_answers.map((answer) =>
            he.decode(answer)
          );
          const correctAnswer = he.decode(question.correct_answer);
          const formattedQuestion = he.decode(question.question);
          const shuffledAnswers = shuffleAnswers([
            ...incorrectAnswers,
            correctAnswer,
          ]);
          return {
            text: formattedQuestion,
            options: shuffledAnswers.map((answer, index) => ({
              id: index,
              text: answer,
              isCorrect: answer === correctAnswer,
            })),
          };
        });
        setQuestions(formattedQuestions);
      })
      .catch((error) => console.log(error));
  }, [difficulty]);

  const shuffleAnswers = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  // Allow for the user to choose their own difficulty
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="App">
      {/* Page title  */}
      <h1 className="title">Welcome to AniQuiz</h1>

      {/*  Real time score */}
      <h1 className="score">
        Score: <span>{score}</span>
      </h1>

      {/* Difficulty selector */}
      <div className="difficulty">
        <label htmlFor="difficulty">Select difficulty level:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      {showResults ? (
        /* Display results to user */
        <ResultsCard
          score={score}
          questions={questions}
          restartGame={restartGame}
        />
      ) : (
        /* Question Card  */
        <QuestionsCard
          currentQuestion={currentQuestion}
          questions={questions}
          optionClicked={optionClicked}
        />
      )}
    </div>
  );
}

export default App;
