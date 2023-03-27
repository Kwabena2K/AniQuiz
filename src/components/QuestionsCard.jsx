import React from "react";

function QuestionsCard({ score, currentQuestion, questions, optionClicked }) {
  return (
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
            <li key={option.id} onClick={() => optionClicked(option.isCorrect)}>
              {option.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuestionsCard;
