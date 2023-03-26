import React, { useState, useEffect } from "react";
import he from "he";
import QuestionsCard from "./components/QuestionsCard";
import ResultsCard from "./components/ResultsCard";
import "./App.css";

function Quiz() {
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
    <div className="Quiz">
      <h1 className="Quiz-title">Welcome to AniQuiz</h1>
      <h1 className="Quiz-score">
        Score: <span>{score}</span>
      </h1>
      {showResults ? (
        <ResultsCard
          score={score}
          questions={questions}
          restartGame={restartGame}
        />
      ) : (
        <QuestionsCard
          currentQuestion={currentQuestion}
          questions={questions}
          optionClicked={optionClicked}
        />
      )}
    </div>
  );
}

export default Quiz;
