// src/components/Question.js
import React from 'react';

const Question = ({ question, onAnswer, timeOver }) => {
  const handleAnswer = (isCorrect) => {
    onAnswer(isCorrect);
  };

  return (
    <div>
      <h3>{question.text}</h3>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswer(option.isCorrect)}
              disabled={timeOver}
            >
              {option.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
