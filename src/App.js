import React, { useState, useEffect } from "react";
import he from "he";
import "./App.css";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy")
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
  }, []);

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

      {showResults ? (
        /* Display results to user */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        /* Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2 className="current-question">
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion]?.text}</h3>

          {/* Available answers to choose  */}
          <ul>
            {questions[currentQuestion]?.options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
